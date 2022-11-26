import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RoutingListener } from "../components/routeListerner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RoutingListener />
      <Component {...pageProps} />{" "}
    </>
  );
}
