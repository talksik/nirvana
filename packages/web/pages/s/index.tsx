import Routes from "@nirvana/common/helpers/routes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Conversations from "../../components/v2/Conversations";
import Done from "../../components/v2/done";
import Drawer from "../../components/v2/drawer";
import Header from "../../components/v2/Header";
import Later from "../../components/v2/later";
import Sidebar from "../../components/v2/Sidebar";

export default function Me() {
  // figure out what content to render from here
  const router = useRouter();
  const [currRoute, setCurrRoute] = useState<string>(router.pathname);

  useEffect(() => {
    const onHashChangeStart = (url) => {
      console.log(`Path changing to ${url}`);
      setCurrRoute(url);
    };

    router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events]);

  function getCurrentContent() {
    switch (currRoute) {
      case Routes.convos:
        return <Conversations />;
      case Routes.later:
        return <Later />;
      case Routes.done:
        return <Done />;
      case Routes.drawer:
        return <Drawer />;
      default:
        return <></>;
    }
  }

  return (
    <div className="flex flex-col">
      <Header />

      <div className="flex-1 flex flex-row items-stretch">
        <Sidebar />

        <div className="flex-1 flex flex-col px-20 justify-start items-stretch container mx-auto">
          {getCurrentContent()}
        </div>
      </div>
    </div>
  );
}
