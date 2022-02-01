import { QueryRoutes } from "@nirvana/common/helpers/routes";
import { useRouter } from "next/router";
import { GlobalHotKeys, KeyMap, configure } from "react-hotkeys";

configure({
  ignoreTags: [],
});

export default function KeyboardShortcutHandler() {
  const router = useRouter();

  const handleEscape = () => {
    console.log("woah");
    router.push({ query: { page: QueryRoutes.convos } });
  };

  const keyMap: KeyMap = {
    ESCAPE: "esc",
  };
  const handlers = { ESCAPE: handleEscape };

  return <GlobalHotKeys handlers={handlers} keyMap={keyMap} />;
}
