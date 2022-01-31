import getDynamicMeLayout from "../../components/Layouts/DynamicMeLayout";
import React from "react";
import { FaCheck } from "react-icons/fa";

export default function Done() {
  return (
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
  );
}

Done.getLayout = function getLayout(page: React.ReactElement) {
  return getDynamicMeLayout(page);
};
