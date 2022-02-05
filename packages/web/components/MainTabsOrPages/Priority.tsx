import { Avatar, Tooltip, Badge } from "antd";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  FaCircle,
  FaMicrophone,
  FaPlay,
  FaRocket,
  FaUser,
} from "react-icons/fa";
import {
  priorityConvosSelector,
  selectedPriorityConvoAtom,
} from "../../recoil/main";
import PriorityConvoRow from "../Conversations/PriorityConvoRow";
import { GlobalHotKeys, HotKeys } from "react-hotkeys";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MAX_SHORTCUT_MAPPINGS_PRIORITY = 8;

export default function Priority() {
  const priorityConvos = useRecoilValue(priorityConvosSelector);
  const [mapShortcutsToConvoId, setmapShortcutsToConvoId] = useState<
    Map<string, string>
  >(new Map<string, string>());

  const setSelectedConversationId = useSetRecoilState(
    selectedPriorityConvoAtom
  );

  // set keyboard shortcuts for 1->8, but only if this component is shown, and not in stuff like
  // convo view
  useEffect(() => {
    // reset entire map of shortcuts now with new list of priority convos

    const newMap = new Map<string, string>();

    priorityConvos.map((convo, i) => {
      if (i < MAX_SHORTCUT_MAPPINGS_PRIORITY) {
        const shortcut = (i + 1).toString();
        newMap.set(shortcut, convo.id);
      }
    });
    setmapShortcutsToConvoId(newMap);
  }, [priorityConvos]);

  const selectingPriorityConvoHandler = (event) => {
    const key = event.key;

    // select the convo based on the right convo

    if (!mapShortcutsToConvoId.has(key)) {
      toast.error("Not a valid conversation selected");
      return;
    }

    const selectedConvoId = mapShortcutsToConvoId.get(key);

    if (selectedConvoId) {
      setSelectedConversationId(selectedConvoId);
    }
  };

  const keyMap = {
    SELECT_PRIORITY_CONVO: ["1", "2", "3", "4", "5", "6", "7", "8"],
  };

  const handlers = {
    SELECT_PRIORITY_CONVO: selectingPriorityConvoHandler,
  };

  return (
    <>
      {priorityConvos?.length > 0 ? (
        <>
          <GlobalHotKeys
            keyMap={keyMap}
            handlers={handlers}
            allowChanges={true}
          />

          {priorityConvos.map((convo, i) => (
            <PriorityConvoRow
              key={convo.id}
              conversation={convo}
              itemIndex={i + 1}
            />
          ))}
        </>
      ) : (
        <div className="mx-auto my-auto flex flex-col">
          <img
            src="/illustrations/undraw_absorbed_in_xahs.svg"
            className="h-[15rem] mx-auto my-auto"
          />

          <span></span>
          <span className="text-slate-400 text-center mt-5">
            One place for your
            <br></br> important conversations <FaRocket className="inline" />.
            <br></br>
            <span className="text-red-600">Keep this clean at all costs.</span>
          </span>
        </div>
      )}
    </>
  );
}
