import { LinkType } from "@nirvana/common/models/link";
import { UserStatus } from "@nirvana/common/models/user";
import { Tooltip } from "antd";
import { duration } from "moment";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaEdit,
  FaExternalLinkAlt,
  FaGithub,
  FaImages,
  FaMicrophone,
  FaPlay,
  FaRegClock,
  FaRocket,
} from "react-icons/fa";
import LinkIcon from "../Drawer/LinkIcon";
import UserAvatar, { UserAvatarSizes } from "../UserDetails/UserAvatar";

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

const testAudioClips: {
  senderName: string;
  relativeSentTime: string;
  duration: number;
  alreadyPlayed: boolean;
  isGap?: boolean;
  isLink?: boolean;
}[] = [
  {
    senderName: "John",
    relativeSentTime: "yesterday",
    duration: 150,
    alreadyPlayed: true,
  },

  {
    senderName: "Moha",
    relativeSentTime: "5 minutes ago",
    duration: 600,
    alreadyPlayed: false,
    isGap: true,
  },
  {
    senderName: "Alex",
    relativeSentTime: "7 hours ago",
    duration: 10,
    alreadyPlayed: false,
  },
  {
    senderName: "Ben",
    relativeSentTime: "2 hours ago",
    duration: 300,
    alreadyPlayed: false,
  },

  {
    senderName: "Alex",
    relativeSentTime: "30 minutes ago",
    duration: 200,
    alreadyPlayed: false,
  },
  {
    senderName: "Moha",
    relativeSentTime: "8 minutes ago",
    duration: 600,
    alreadyPlayed: false,
    isLink: true,
  },
  {
    senderName: "Moha",
    relativeSentTime: "5 minutes ago",
    duration: 600,
    alreadyPlayed: false,
  },
];

const gridRows = 4;
const gridItems = 4 * 100;

export default function ViewConvo(props: { conversationId: string }) {
  // auth if do not have this conversation in react cache, then we are not authorized

  // if somehow it's still cached but we were removed,
  // then authenticate by checking if we are in the array of users for the conversation

  const endOfTimeline = useRef();

  useEffect(() => {
    endOfTimeline.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="flex flex-col items-stretch mt-5 space-y-10">
        {/* main timeline view with action buttons on top */}
        <div className="flex-1 flex flex-col overflow-auto">
          {/* header */}
          <span className="flex flex-row justify-between items-center mb-5">
            <span className="flex flex-col group">
              <span className="flex flex-row items-center">
                <span
                  className="text-md tracking-widest font-semibold 
          text-slate-500 uppercase"
                >
                  Engineering
                </span>
                <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200 group-hover:visible invisible">
                  <FaEdit className="ml-auto text-md text-slate-400" />
                </span>
              </span>

              <span className="text-xs text-slate-300 hover:decoration-slate-400">
                25 members
              </span>
            </span>

            <span className="flex flex-row items-center space-x-3">
              <button
                className="rounded-lg p-2 flex flex-row items-center space-x-2
             text-slate-400 text-xs hover:bg-slate-50"
              >
                <FaRocket className="text-sky-500" />
                <span>Priority</span>
              </button>
              <button
                className="rounded-lg p-2 border flex flex-row items-center space-x-2
             text-slate-400 text-xs hover:bg-slate-50"
              >
                <FaRegClock />
                <span>Later</span>
              </button>

              <button
                className="rounded-lg p-2 border flex flex-row items-center space-x-2
             text-slate-400 text-xs hover:bg-slate-50"
              >
                <FaCheck />
                <span>Done</span>
              </button>
            </span>
          </span>

          {/* have one row, but just translate it along y downward to put it in it's own place */}
          <span className="flex flex-row flex-nowrap pb-[10rem] py-[5rem] overflow-auto min-h-max">
            {testAudioClips.map((audClip, index) => {
              if (audClip.isGap) {
                return (
                  <span
                    key={index}
                    className={`flex flex-row justify-center items-center p-5 h-[5rem] shadow shrink-0
                    ${
                      index % 2 == 1 &&
                      "translate-y-[4.75rem] border-t-4 border-t-teal-600"
                    } ${index % 2 == 0 && "border-b-4 border-b-teal-600"}`}
                    style={{
                      // minWidth: "max-content",
                      width: `5rem`,
                    }}
                  >
                    ...
                  </span>
                );
              } else if (audClip.isLink) {
                return (
                  <span
                    key={index}
                    className={`flex flex-row justify-center items-center p-5 h-[5rem] shadow shrink-0
                    ${
                      index % 2 == 1 &&
                      "translate-y-[4.75rem] border-t-4 border-t-teal-600"
                    } ${index % 2 == 0 && "border-b-4 border-b-teal-600"}`}
                    style={{
                      // minWidth: "max-content",
                      width: `5rem`,
                    }}
                  >
                    <LinkIcon
                      linkType={LinkType.googleMeet}
                      className="text-3xl"
                    />
                  </span>
                );
              }
              return (
                <span
                  onClick={() => toast(`${audClip.senderName} speaking...`)}
                  key={index}
                  className={`hover:cursor-pointer flex flex-row items-center 
                  p-5 h-[5rem] shadow shrink-0 last:animate-pulse last:bg-orange-200
                 ${
                   index % 2 == 1 &&
                   "translate-y-[4.75rem] border-t-4 border-t-teal-600"
                 } ${index % 2 == 0 && "border-b-4 border-b-teal-600"} ${
                    audClip.alreadyPlayed
                      ? "bg-slate-100 border"
                      : "bg-sky-100 "
                  }`}
                  style={{
                    minWidth: "max-content",
                    width: `${Math.round(audClip.duration)}px`,
                  }}
                >
                  <UserAvatar
                    userFirstName={"s"}
                    status={UserStatus.busy}
                    size={UserAvatarSizes.large}
                    avatarUrl={"https://joeschmoe.io/api/v1/" + Math.random()}
                  />

                  <span className="flex flex-col ml-2">
                    <span className="text-slate-500 font-semibold">
                      {audClip.senderName}
                    </span>
                    <span className="text-slate-400 text-xs">
                      {audClip.relativeSentTime}
                    </span>
                  </span>
                </span>
              );
            })}

            <div ref={endOfTimeline}></div>
          </span>

          {/* stuff for recording and playing action */}
          <span className="mx-auto flex flex-row py-10 space-x-5">
            <Tooltip title={"Press and hold R to send a voice clip."}>
              <span
                className="ml-auto shadow-lg flex flex-row items-center p-5 
            justify-center rounded-lg bg-slate-50 font-bold hover:cursor-pointer"
              >
                <FaMicrophone className="text-xl text-orange-700" />
              </span>
            </Tooltip>

            <Tooltip title={"SPACE to play last conversation chunk."}>
              <span
                className="shadow-lg flex flex-row items-center p-5 justify-center 
          rounded-lg bg-slate-50 font-bold"
              >
                <FaPlay className="text-teal-600 text-xl" />
              </span>
            </Tooltip>
          </span>
        </div>

        {/* drawer items */}
        <div className="flex-1 flex flex-col">
          <span className="text-md tracking-widest font-semibold text-slate-300 uppercase mb-2">
            Shared
          </span>

          {/* row of cards drawer items  */}
          <span className="flex flex-row items-stretch gap-5 overflow-auto w-full pb-10">
            {testDrawerItems.map((link) => (
              <span
                key={link.linkName}
                className="group flex flex-row items-center border rounded 
                p-2 hover:bg-slate-50 transition-all shrink-0 w-[15rem] bg-slate-50 text-ellipsis"
              >
                {/* <span className="rounded-lg bg-slate-200 p-2 hover:cursor-pointer"></span> */}

                <LinkIcon
                  linkType={link.linkType}
                  className="text-3xl shrink-0"
                />

                <span className="flex flex-col ml-2">
                  <span className="text-slate-400 text-sm">
                    {link.linkName}
                  </span>
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
          </span>
        </div>
      </div>
    </>
  );
}
