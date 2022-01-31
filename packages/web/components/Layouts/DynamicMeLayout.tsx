import Header from "../v2/Header";
import Sidebar from "../v2/Sidebar";
import React from "react";

export default function getDynamicMeLayout(page: React.ReactElement) {
  console.log("rendering layout");

  return (
    <div className="flex flex-col">
      <Header />

      <div className="flex-1 flex flex-row items-baseline">
        <Sidebar />

        <div className="flex flex-col px-20 items-baseline flex-1 container mx-auto">
          {page}
        </div>
      </div>
    </div>
  );
}
