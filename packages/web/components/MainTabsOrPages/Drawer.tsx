import React from "react";
import { FaLink } from "react-icons/fa";

export default function Drawer() {
  return (
    <div className="mx-auto my-auto flex flex-col">
      <img
        src="/illustrations/undraw_share_link_qtxe.svg"
        className="h-[15rem] mx-auto my-auto"
      />

      <span></span>
      <span className="text-slate-400 text-center mt-5">
        A place to <FaLink className="inline" /> bookmark that <br></br> drive
        folder, GitHub repo, video, Jira ticket.
      </span>
    </div>
  );
}
