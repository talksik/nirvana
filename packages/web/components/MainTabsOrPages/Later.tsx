import React from "react";
import { FaRegClock } from "react-icons/fa";

export default function Later() {
  console.log("re-rendering later");
  return (
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
  );
}
