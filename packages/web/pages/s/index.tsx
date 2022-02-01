import Routes from "@nirvana/common/helpers/routes";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useRecoilState } from "recoil";
import Conversations from "../../components/v2/Conversations";
import Done from "../../components/v2/Done";
import Drawer from "../../components/v2/Drawer";
import Header from "../../components/v2/Header";
import Later from "../../components/v2/Later";
import Sidebar from "../../components/v2/Sidebar";
import { currPagePath } from "../../recoil/main";
import {
  CSSTransition,
  TransitionGroup,
  SwitchTransition,
} from "react-transition-group";
import CreateConversation from "../../components/v2/CreateConversation";
import { FaArrowLeft } from "react-icons/fa";
import KeyboardShortcutHandler from "../../components/v2/KeyboardShortcutHandler";
import SearchResults from "../../components/v2/SearchResults";

export default function Me() {
  // figure out what content to render from here
  const router = useRouter();
  const [currRoute, setCurrRoute] = useRecoilState(currPagePath);

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

  /** full page replacements: clean full page
   *    1. search page:
   *    2. view a conversation
   *    3. create conversation
   *    4. profile edit? nah not needed...just keep current separate page
   */

  var fullCleanPageContent: ReactElement = undefined;
  if (currRoute === Routes.createConvo) {
    fullCleanPageContent = <CreateConversation />;
  } else if (router.query.q) {
    fullCleanPageContent = <SearchResults />;
  }

  if (fullCleanPageContent) {
    return (
      <div className="flex flex-col px-20">
        <div className="flex flex-row">
          <span className="flex flex-col items-center">
            <button
              onClick={() => router.push(Routes.convos)}
              className="rounded-lg p-2 border flex flex-row items-center space-x-2
            text-slate-400 text-xs hover:bg-slate-50"
            >
              <FaArrowLeft />
              <span>back</span>
            </button>

            <span className="flex flex-row items-center text-xs text-slate-300">
              ESC
            </span>
          </span>
        </div>

        {fullCleanPageContent}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-row items-stretch">
      <Sidebar />

      <SwitchTransition>
        <CSSTransition
          appear={true}
          key={Math.random()}
          timeout={400}
          classNames="slide"
        >
          <div className="flex-1 flex flex-col px-20 justify-start items-stretch container mx-auto">
            {getCurrentContent()}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

Me.getLayout = function (content: ReactElement) {
  return (
    <div className="flex flex-col">
      <KeyboardShortcutHandler />

      <Header />

      {content}
    </div>
  );
};
