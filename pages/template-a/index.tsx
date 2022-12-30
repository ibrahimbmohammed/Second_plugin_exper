import { useState, useEffect, useLayoutEffect } from "react";
import { WebsiteFaqTypeQuery } from "@gentypes/index";
import useFetchQuery from "../../lib/hooks/fetch-query";
import { getCookie, setCookie } from "@lib/utils/cookies";
import Cookies from "js-cookie";

function TemplateTwo() {
  const [recievedMessage, setRecievedMessage] = useState("");
  const [faqData, , loading] = useFetchQuery<WebsiteFaqTypeQuery>("/api/faq");
  // const sendMessage = () => {
  //   window.parent.postMessage("hi from child", "http://localhost:3001");
  // };
  console.log("hi in a fetch hq", faqData);
  useEffect(() => {
    // console.log("hi in a");
    // window.addEventListener("message", function (e) {
    //   // if (e.origin !== "http://localhost:3001") return; security mesures
    //   setRecievedMessage("got from parent" + e.data);
    // });

    // function getCookie(name: string) {
    //   let cookie = {};
    //   document.cookie.split(";").forEach(function (el) {
    //     let [k, v] = el.split("=");
    //     // @ts-ignore
    //     cookie[k.trim()] = v;
    //   });
    //   // @ts-ignore
    //   return cookie[name];
    // }
    const theCookie = getCookie("organizationId");
    if (!getCookie("organizationId")) {
      console.log("hi there ====>");
      // document.cookie = `${name}=${value};${options}`;
      const name = "organizationId";
      const value = "3";
      const options = { sameSite: "None", secure: true };
      document.cookie = `${name}=${value};${options}`;
      // Cookies.set("organizationId", "3", { sameSite: "None", secure: true });
    }

    console.log("the cook ###########", theCookie);
  }, []);

  return (
    <div className="flex flex-col space-y-10">
      <p className="text-lg  h-full w-full bg-indigo-600">
        TemplateA:{recievedMessage}
      </p>{" "}
    </div>
  );
}

export default TemplateTwo;
