import "../styles/globals.css";
import { AppProps } from "next/app";
import { UserContextProvider } from "../AuthContext/UserContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />;
    </UserContextProvider>
  );
}

export default MyApp;
