import { useState, useEffect, useLayoutEffect } from "react";
import { WebsiteFaqTypeQuery } from "@gentypes/index";
import useFetchQuery from "../../lib/hooks/fetch-query";
import { getCookie, setCookie } from "@lib/utils/cookies";
import Cookies from "js-cookie";

function TemplateTwo() {
  const [recievedMessage, setRecievedMessage] = useState("");
  const [faqData, , loading] = useFetchQuery<WebsiteFaqTypeQuery>("/api/faq");

  console.log("hi in a fetch hq", faqData);
  useEffect(() => {
    const theCookie = getCookie("organizationId");
    if (!getCookie("organizationId")) {
      console.log("hi there ====>");

      Cookies.set("organizationId", "3", { sameSite: "None", secure: true });
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
