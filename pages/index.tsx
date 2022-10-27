import { useRef, useState, useEffect } from "react";

function Home() {
  const IframeRef = useRef(null);

  const sendMessage = () => {
    if (!IframeRef.current) return;

    IframeRef.current.contentWindow.postMessage(
      "hello son",
      "http://localhost:3001"
    );
  };

  const [recievedMessage, setRecievedMessage] = useState("");

  useEffect(() => {
    window.addEventListener("message", function (e) {
      if (e.origin !== "http://localhost:3001") return;
      setRecievedMessage("got from parent" + e.data);
    });
  }, [recievedMessage]);

  return (
    <div className="w-full  h-[50%]">
      <iframe
        ref={IframeRef}
        className="w-full h-full"
        id="inlineFrameExample"
        title="Inline Frame Example"
        width="w-full"
        // height="h-screen"
        src="/template-b/"
      ></iframe>
      <button onClick={() => sendMessage()}>send message to child</button>
      <div className="">from child: {recievedMessage}</div>
    </div>
  );
}

export default Home;
