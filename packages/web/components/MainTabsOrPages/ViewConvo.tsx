import { LinkType } from "@nirvana/common/models/link";
import { Tooltip } from "antd";
import { FaExternalLinkAlt, FaGithub, FaImages } from "react-icons/fa";
import LinkIcon from "../Drawer/LinkIcon";

const testDrawerItems: {
  linkType: LinkType;
  linkName: string;
  relativeSentTime: string;
}[] = [
  {
    linkType: LinkType.googleMeet,
    linkName: "Gmeet - Meeting",
    relativeSentTime: "5 seconds ago",
  },
  {
    linkType: LinkType.atlassian,
    linkName: "Jira Ticket - Ecommerce Plugin",
    relativeSentTime: "20 minutes ago",
  },
  {
    linkType: LinkType.github,
    linkName: "React library for hotkeys",
    relativeSentTime: "2 hours ago",
  },
  {
    linkType: LinkType.googleDrive,
    linkName: "Engineering - Team Drive Folder",
    relativeSentTime: "last week",
  },
];

export default function ViewConvo(props: { conversationId: string }) {
  // auth if do not have this conversation in react cache, then we are not authorized

  // if somehow it's still cached but we were removed,
  // then authenticate by checking if we are in the array of users for the conversation

  return (
    <>
      <div className="flex flex-row items-stretch mt-5 space-x-10">
        {/* drawer items */}
        <div className="flex-1 flex flex-col max-w-xs">
          <span className="text-md tracking-widest font-semibold text-slate-300 uppercase mb-2">
            Shared
          </span>

          {/* column list of drawer items - github first one  */}
          {testDrawerItems.map((link) => (
            <span
              key={link.linkName}
              className="group flex flex-row items-center border-t p-2 hover:bg-slate-50 transition-all"
            >
              {/* <span className="rounded-lg bg-slate-200 p-2 hover:cursor-pointer"></span> */}

              <LinkIcon
                linkType={link.linkType}
                className="text-3xl shrink-0"
              />

              <span className="flex flex-col ml-2">
                <span className="text-slate-500">{link.linkName}</span>
                <span className="text-slate-300 text-xs">
                  {link.relativeSentTime}
                </span>
              </span>

              <span className="flex flex-row ml-auto space-x-1 group-hover:visible invisible">
                <Tooltip title={"Add to personal drawer."}>
                  <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200 ">
                    <FaImages className="text-xl text-slate-400" />
                  </span>
                </Tooltip>

                <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200 ">
                  <FaExternalLinkAlt className="text-lg text-slate-400" />
                </span>
              </span>
            </span>
          ))}
        </div>

        {/* main timeline view with action buttons on top */}
        <div className="flex-1 flex flex-col">
          <span
            className="text-md tracking-widest font-semibold 
          text-slate-300 uppercase"
          >
            Timeline
          </span>
        </div>
      </div>
    </>
  );
}
