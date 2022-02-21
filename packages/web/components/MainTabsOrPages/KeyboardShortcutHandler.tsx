import { QueryRoutes } from "@nirvana/common/helpers/routes";
import { useRouter } from "next/router";
import { GlobalHotKeys, KeyMap, configure } from "react-hotkeys";
import { selectedConvoAtom, audioQueueAtom } from "../../recoil/main";
import { useSetRecoilState } from "recoil";
import toast from 'react-hot-toast'

export default function KeyboardShortcutHandler() {
  const router = useRouter();

  configure({
    ignoreTags: [],
  });

  const setSelectedPriorityConvo = useSetRecoilState(selectedConvoAtom);
  const setAudioQueue = useSetRecoilState(audioQueueAtom);

  const handleEscape = () => {
    console.log("woah");
    router.push({ query: { page: QueryRoutes.convos } });

    setSelectedPriorityConvo(null);
    setAudioQueue([]);

    toast.dismiss()
  };

  const keyMap: KeyMap = {
    ESCAPE: "esc",
  };
  const handlers = { ESCAPE: handleEscape };

  return <GlobalHotKeys handlers={handlers} keyMap={keyMap} />;
}
