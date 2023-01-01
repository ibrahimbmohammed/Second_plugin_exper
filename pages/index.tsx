import Link from "next/link";
import { useRef, useState, useEffect } from "react";

function Home() {
  const IframeRef = useRef(null);

  useEffect(() => {
    // sendMessage();
  }, []);

  return (
    <div className="w-full  h-[100vh] bg-gray-500 flex items-center justify-center">
      <div className="">from child peddlesoft</div>
    </div>
  );
}

export default Home;
