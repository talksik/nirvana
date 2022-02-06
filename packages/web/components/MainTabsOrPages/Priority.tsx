import React from "react";
import { useRecoilValue } from "recoil";
import { FaRocket } from "react-icons/fa";
import { priorityConvosSelector } from "../../recoil/main";
import PriorityConvoRow from "../Conversations/PriorityConvoRow";
import { useAuth } from "../../contexts/authContext";

export default function Priority() {
  const priorityConvos = useRecoilValue(priorityConvosSelector);

  return (
    <>
      {priorityConvos?.length > 0 ? (
        <>
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
