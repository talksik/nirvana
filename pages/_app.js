import "../styles/globals.css";
import "antd/dist/antd.css";
import Head from "next/head";
import { AuthProvider } from "../contexts/authContext";
import SiteLayout from "../components/Layouts/SiteLayout";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <SiteLayout>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>

      <Toaster />
    </SiteLayout>
  );
}

export default MyApp;
