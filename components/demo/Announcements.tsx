import { FaAngleDown, FaCheck, FaMicrophoneAlt, FaPlay } from "react-icons/fa";
import { UserStatus } from "../../models/user";

import Image from "next/image";
import { Tooltip } from "antd";
import { DemoStep, IVoiceDemoProps } from "./VoiceLineConceptDemo";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Announcements(props: IVoiceDemoProps) {
  const isAnnouncementsTurn =
    props.demoStep == DemoStep.playAnnouncement ||
    props.demoStep == DemoStep.doneDemo;

  const [showAnnouncement, setShowAnnouncement] = useState<boolean>(false);

  useEffect(() => {
    if (props.demoStep == DemoStep.playAnnouncement) {
      setTimeout(function () {
        setShowAnnouncement(true);

        var audio = new Audio(
          "https://firebasestorage.googleapis.com/v0/b/nirvana-for-business.appspot.com/o/messages%2Fb2858200-4a15-478a-b863-bdf88b26b2e4.mp3?alt=media&token=3ffc8955-50fa-4418-a146-1c73f56409d1"
        );
        audio.play();

        toast.success("Harold's saying his update!");
      }, 2000);

      setTimeout(function () {
        props.handleChangeDemoStep(DemoStep.doneDemo);

        toast.success("done with the demo!");
      }, 11000);
    }
  }, [props.demoStep]);

  return (
    <section
      className={`p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md absolute right-0 backdrop-blur-xl ${
        isAnnouncementsTurn ? " z-20 " : "blur-sm"
      }`}
    >
      <span className="flex flex-row justify-start items-center pb-5">
        <span className="flex flex-col mr-20">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            ANNOUNCEMENTS
            {/* <button
              className="right-1 rounded-lg py-1 px-2 ml-1 
                            shadow-md text-center text-gray-400 text-sm font-bold"
            >
              CTRL + A
            </button> */}
          </span>

          <span className="text-gray-400 text-xs">
            updates, pep talks, blockers, reminders
          </span>
        </span>

        {/* tab pane */}
        <span className="ml-auto flex flex-row space-x-5 uppercase mr-5">
          <span className="underline underline-offset-8 decoration-gray-500 text-gray-500 hover:cursor-pointer">
            Active
          </span>

          <span className="text-gray-400 hover:cursor-pointer">Resolved</span>
        </span>

        <span className="text-sm text-gray-400 flex flex-row items-center">
          TODAY <FaAngleDown />
        </span>

        <Tooltip title={"You can create announcements in the future."}>
          <button className="bg-gray-400 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
            <FaMicrophoneAlt className="text-lg text-gray-500" />
          </button>
        </Tooltip>
      </span>

      <div className="flex flex-row overflow-auto whitespace-nowrap space-x-5 items-center">
        {/* arjun's announcement */}
        <span
          className={`flex flex-row p-3 bg-gray-300 bg-opacity-25 rounded-lg items-center transition-all duration-300 ${
            showAnnouncement ? "animate-pulse bg-orange-500" : "hidden "
          }`}
        >
          <span className="relative mr-2 grid items-center justify-items-center">
            <span className="bg-gray-200 bg-opacity-20 rounded-full shadow-md absolute w-full h-full"></span>

            <Image
              src={"/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-29.svg"}
              alt="profile"
              width={50}
              height={50}
            />
          </span>

          <span className="flex flex-col items-baseline mr-5">
            <span className="text-md font-semibold text-gray-600">Harold</span>
            <span className="text-xs text-gray-400">2 seconds ago</span>
            <span className="text-xs text-white bg-indigo-400 p-1 rounded-md font-semibold flex flex-row items-center">
              <span>engineering</span>
            </span>
          </span>

          <Tooltip
            title={"Announcements should be resolved to keep the team focused."}
          >
            <button className="bg-gray-400 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
              <FaCheck className="text-lg text-gray-500" />
            </button>
          </Tooltip>
        </span>

        {/* adriana's announcement */}
        <span className="flex flex-row p-3 bg-gray-300 bg-opacity-25 rounded-lg items-center">
          <span className="relative mr-2 grid items-center justify-items-center">
            <span className="bg-gray-200 bg-opacity-20 rounded-full shadow-md absolute w-full h-full"></span>

            <Image
              src={"/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-06.svg"}
              alt="profile"
              width={50}
              height={50}
            />
          </span>

          <span className="flex flex-col items-baseline">
            <span className="text-md font-semibold text-gray-600">Adriana</span>
            <span className="text-xs text-gray-400">30 minutes ago</span>
            <span className="text-xs text-white bg-red-400 p-1 rounded-md font-semibold flex flex-row items-center">
              <span>blockers</span>
            </span>
          </span>

          <Tooltip title={"Resolve"}>
            <button className="bg-gray-400 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
              <FaCheck className="text-lg text-gray-500" />
            </button>
          </Tooltip>
        </span>
      </div>
    </section>
  );
}
