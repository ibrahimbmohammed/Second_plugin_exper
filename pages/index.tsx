import Link from "next/link";
import { useRef, useState, useEffect } from "react";

function Home() {
  const IframeRef = useRef(null);

  const sendMessage = () => {
    if (!IframeRef.current) return;

    // @ts-ignore
    IframeRef.current.contentWindow.postMessage(
      "hello son",
      "https://preeminent-zuccutto-747fd5.netlify.app/"
    );
  };

  const [recievedMessage, setRecievedMessage] = useState("");

  useEffect(() => {
    window.addEventListener("message", function (e) {
      setRecievedMessage("got from parent " + " " + e.data);
    });
  }, [recievedMessage]);

  useEffect(() => {
    sendMessage();
  }, []);

  return (
    <div className="w-full  h-[100vh] bg-gray-500 flex items-center justify-center">
      {/* <div className="flex items-center justify-between h-5 w-full bg-slate-500">
      </div> */}
      {/* <button onClick={() => sendMessage()}>send message to child</button> */}
      {/* <Link href="/login">Log in</Link> */}

      <div className="">from child peddlesoft: {recievedMessage}</div>
      {/* <iframe
        ref={IframeRef}
        className="w-full h-[100%]"
        id="inlineFrameExample"
        title="Inline Frame Example"
        width="w-full"
        // height="h-screen"
        src="https://preeminent-zuccutto-747fd5.netlify.app/"
      ></iframe> */}
    </div>
  );
}

export default Home;
