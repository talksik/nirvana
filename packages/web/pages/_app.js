import "../styles/globals.css";
import "antd/dist/antd.css";
import Head from "next/head";
import { AuthProvider } from "../contexts/authContext";
import SiteLayout from "../components/Layouts/SiteLayout";
import { Toaster } from "react-hot-toast";

import { connection }from '@nirvana/common' 
connection() 

function MyApp({ Component, pageProps }) {
  return (
    <SiteLayout>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>

      <Toaster position="top-center" />
    </SiteLayout>
  );
}

export default MyApp;
