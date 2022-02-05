import React from "react";
import { FaRegClock } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { laterConvosSelector } from "../../recoil/main";
import ConversationFullRow from "../Conversations/ConversationFullRow";

export default function Later() {
  const laterConvos = useRecoilValue(laterConvosSelector);

  return (
    <>
      {laterConvos?.length > 0 ? (
        <span className="flex flex-col w-full items-stretch">
          {laterConvos.map((tRoom) => (
            <ConversationFullRow key={tRoom.id} conversation={tRoom} />
          ))}
        </span>
      ) : (
        <div className="mx-auto my-auto flex flex-col">
          <img
            src="/illustrations/undraw_season_change_f99v.svg"
            className="h-[15rem] mx-auto my-auto"
          />

          <span></span>
          <span className="text-slate-400 text-center mt-5">
            Focusing right now? <br></br> No worries, go through low-priority{" "}
            <br></br>
            conversations <FaRegClock className="inline" /> later.
          </span>
        </div>
      )}
    </>
  );
}
