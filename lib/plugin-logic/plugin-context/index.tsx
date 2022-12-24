import React, { useState, useRef, useEffect, useMemo } from "react";
import { NAVIGATION_ROUTES } from "../plugin-nav-items";
// import { useHistory } from "react-router-dom";
import { useRouter } from "next/router";
import useDidMountEffect from "@lib/hooks/use-did-mount-effect";

export const IFrameActions = {
  NAVIGATION: "NAVIGATION",
  REFRESH: "REFRESH",
};

const initial = {};

export const IFrameRouterContext = React.createContext(initial);

export const IFRAME_APP_URL = "https://preeminent-zuccutto-747fd5.netlify.app";

const getIFrameRoute = () => {
  return NAVIGATION_ROUTES.find(
    (route) => route.displayedURL === window.location.pathname
  );
};
const isInIFrameRoute = () => {
  return !!getIFrameRoute();
};

const getIframeSource = () => {
  const iframeRoute = getIFrameRoute();
  if (iframeRoute) {
    return IFRAME_APP_URL + iframeRoute.path;
  }

  return IFRAME_APP_URL;
};

export const IFrameRouterContextProvider = ({ children }: any) => {
  const iframeRef = useRef(null);
  //   const [iframeSrc, setIframeSrc] = useState('')
  //   // Important that it should only be called once.
  //   useDidMountEffect(() => {
  //     setIframeSrc(getIframeSource)
  // }, []);
  const iframeSrc = useMemo(getIframeSource, []);
  console.log("the source from within", iframeSrc);
  const [iframeVisibility, setIframeVisibility] = useState(isInIFrameRoute());
  // const history = useHistory();
  const router = useRouter();

  // --------------------------------------------------------------------------
  // Navigates our application, handling both parent routes, and IFrame routes.
  // Use this for all app routing.
  // It makes sure to handle IFrame visibility as well.
  // --------------------------------------------------------------------------
  // @ts-ignore
  const navigate = ({ path, isIFrame, displayedURL }) => {
    // Stop navigation to the same path.
    const currentPath = window.location.pathname;
    console.log("ins nav func", currentPath, isIFrame);
    if (
      (isIFrame && displayedURL === currentPath) ||
      (!isIFrame && path === currentPath)
    ) {
      return;
    }

    if (isIFrame) {
      setIframeVisibility(true);
      if (iframeRef.current) {
        // @ts-ignore
        iframeRef.current.contentWindow.postMessage(
          {
            action: IFrameActions.NAVIGATION,
            path,
          },
          IFRAME_APP_URL
        );
        //history.push(displayedURL);
        router.push(displayedURL);
      }
    } else {
      setIframeVisibility(false);
      //history.push(path);
      router.push(path);
    }
  };
  const handleBrowserBackForwardEvents = () => {
    // Based on currently updated URL
    if (isInIFrameRoute()) {
      if (iframeRef.current) {
        // Manually handle IFrame navigation
        setIframeVisibility(true); // You might delay this to avoid flickering of previous route in hidden iframe
        const route = getIFrameRoute();
        // @ts-ignore
        iframeRef.current.contentWindow.postMessage(
          {
            action: IFrameActions.NAVIGATION,
            // @ts-ignore
            path: route.path,
          },
          IFRAME_APP_URL
        );
      }
    } else {
      // BrowserRouter handles the navigation
      setIframeVisibility(false);
    }
  };

  const navigateToMainPage = () => {
    // @ts-ignore
    navigate(NAVIGATION_ROUTES.find(({ path }) => path === "/"));
  };

  useEffect(() => {
    console.log("Initial IFrame Visiblity", isInIFrameRoute());

    // Go the child application main route
    if (window.location.pathname === "/") {
      navigateToMainPage();
    }

    if (iframeRef.current) {
      console.log("the ref", iframeRef);
      // add a safety net
      // @ts-ignore
      iframeRef.current.onload = () => {
        console.log("IFrame loaded");
        window.addEventListener("popstate", handleBrowserBackForwardEvents);
      };
    }
    return () => {
      window.removeEventListener("popstate", handleBrowserBackForwardEvents);
    };
  }, []);

  const contextProperties = {
    iframeRef,
    iframeVisibility,
    setIframeVisibility,
    getIFrameRoute,
    isInIFrameRoute,
    navigate,
    iframeSrc,
  };
  return (
    <IFrameRouterContext.Provider value={contextProperties}>
      {children}
    </IFrameRouterContext.Provider>
  );
};
