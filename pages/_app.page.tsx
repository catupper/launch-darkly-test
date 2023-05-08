import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  asyncWithLDProvider,
  LDProvider,
  withLDProvider,
} from "launchdarkly-react-client-sdk";
import { ComponentClass, ComponentType } from "react";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// `as ComponentType<{}>` from https://launchdarkly.com/blog/using-launchdarkly-with-typescript/
export default withLDProvider({
  clientSideID: "644f44da70b56712c9fdaf40",
})(App as ComponentType<{}>);
