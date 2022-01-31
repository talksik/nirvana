import getDynamicMeLayout from "../../components/Layouts/DynamicMeLayout";
import React from "react";
import { FaRocket } from "react-icons/fa";

export default function Priority() {
  return (
    <div className="mx-auto my-auto flex flex-col">
      <img
        src="/illustrations/undraw_absorbed_in_xahs.svg"
        className="h-[15rem] mx-auto my-auto"
      />

      <span></span>
      <span className="text-slate-400 text-center mt-5">
        One place for your most important
        <br></br>people and items <FaRocket className="inline" />.<br></br>
        <span className="text-red-600">Keep this clean at all costs.</span>
      </span>
    </div>
  );
}

Priority.getLayout = function getLayout(page: React.ReactElement) {
  return getDynamicMeLayout(page);
};
