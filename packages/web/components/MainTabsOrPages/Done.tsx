import React from "react";
import { FaCheck } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { doneConvosSelector } from "../../recoil/main";
import ConversationFullRow from "../Conversations/ConversationFullRow";

export default function Done() {
  const doneConvos = useRecoilValue(doneConvosSelector);

  return (
    <>
      {doneConvos?.length > 0 ? (
        <span className="flex flex-col w-full items-stretch">
          {doneConvos.map((tRoom) => (
            <ConversationFullRow key={tRoom.id} conversation={tRoom} />
          ))}
        </span>
      ) : (
        <div className="mx-auto my-auto flex flex-col">
          <img
            src="/illustrations/undraw_scooter_re_lrsb.svg"
            className="h-[15rem] mx-auto my-auto"
          />

          <span></span>
          <span className="text-slate-400 text-center mt-5">
            Add things to <FaCheck className="inline" /> done to <br></br> clear
            your mind.
          </span>
        </div>
      )}
    </>
  );
}
