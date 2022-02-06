import { QueryRoutes } from "@nirvana/common/helpers/routes";
import { useRouter } from "next/router";
import { GlobalHotKeys, KeyMap, configure } from "react-hotkeys";
import { selectedConvoAtom } from "../../recoil/main";
import { useSetRecoilState } from "recoil";

export default function KeyboardShortcutHandler() {
  const router = useRouter();

  configure({
    ignoreTags: [],
  });

  const setSelectedPriorityConvo = useSetRecoilState(selectedConvoAtom);

  const handleEscape = () => {
    console.log("woah");
    router.push({ query: { page: QueryRoutes.convos } });

    setSelectedPriorityConvo(null);
  };

  const keyMap: KeyMap = {
    ESCAPE: "esc",
  };
  const handlers = { ESCAPE: handleEscape };

  return <GlobalHotKeys handlers={handlers} keyMap={keyMap} />;
}
