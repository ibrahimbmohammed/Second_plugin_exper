import Link from "next/link";
import { useRef, useState, useEffect } from "react";

function Home() {
  const IframeRef = useRef(null);

  const sendMessage = () => {
    if (!IframeRef.current) return;

    // @ts-ignore
    IframeRef.current.contentWindow.postMessage(
      "hello son",
      "http://localhost:3001"
    );
  };

  const [recievedMessage, setRecievedMessage] = useState("");

  useEffect(() => {
    window.addEventListener("message", function (e) {
      setRecievedMessage("got from parent" + e.data);
    });
  }, [recievedMessage]);

  return (
    <div className="w-full  h-[100vh]">
      <div className="flex items-center justify-between h-5 w-full bg-slate-500">
        <button onClick={() => sendMessage()}>send message to child</button>
        <div className="">from child peddlesoft: {recievedMessage}</div>
        <Link href="/login">Log in</Link>
      </div>

      <iframe
        ref={IframeRef}
        className="w-full h-[100%]"
        id="inlineFrameExample"
        title="Inline Frame Example"
        width="w-full"
        // height="h-screen"
        src="/template-a"
      ></iframe>
    </div>
  );
}

export default Home;
