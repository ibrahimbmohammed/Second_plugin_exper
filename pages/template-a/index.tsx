import { useState, useEffect } from "react";

function TemplateTwo() {
  const [recievedMessage, setRecievedMessage] = useState("");

  const sendMessage = () => {
    window.parent.postMessage("hi from child", "http://localhost:3001");
  };
  useEffect(() => {
    window.addEventListener("message", function (e) {
      if (e.origin !== "http://localhost:3001") return;
      setRecievedMessage("got from parent" + e.data);
    });
  }, []);

  return (
    <div className="flex flex-col space-y-10">
      <p className="text-lg">TemplateTwo:{recievedMessage}</p>{" "}
      <button onClick={() => sendMessage()}>send message to parent</button>
    </div>
  );
}

export default TemplateTwo;
