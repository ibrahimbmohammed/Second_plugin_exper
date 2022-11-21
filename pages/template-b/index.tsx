import { useState, useEffect } from "react";

function TemplateOne() {
  const [recievedMessage, setRecievedMessage] = useState("");

  const sendMessage = () => {
    window.parent.postMessage("hi from child", "http://localhost:3001");
  };
  useEffect(() => {
    console.log("hi in b");
    window.addEventListener("message", function (e) {
      setRecievedMessage("got from parent" + e.data);
    });
  }, []);

  return (
    <div className="flex flex-col space-y-10">
      <p className="text-lg h-full w-full bg-green-600">
        TemplateB:{recievedMessage}
      </p>{" "}
      <button onClick={() => sendMessage()}>send message to parent</button>
    </div>
  );
}

export default TemplateOne;
