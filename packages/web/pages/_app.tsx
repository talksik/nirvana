import "../styles/globals.css";
import "antd/dist/antd.css";
import { AuthProvider } from "../contexts/authContext";
import SiteLayout from "../components/Layouts/SiteLayout";
import { Toaster } from "react-hot-toast";

import type { NextPage } from "next";
import type { AppProps } from "next/app";

import { connection } from "@nirvana/common";
import React, { ReactElement, ReactNode } from "react";
connection();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // any custom layout for app persistence
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SiteLayout>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>

      <Toaster position="top-center" />
    </SiteLayout>
  );
}

export default MyApp;
