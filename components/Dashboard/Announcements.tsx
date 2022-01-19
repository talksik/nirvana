import { FaAngleDown, FaCheck, FaMicrophoneAlt, FaPlay } from "react-icons/fa";
import { UserStatus } from "../../models/user";

import Image from "next/image";

export default function Announcements() {
  return (
    <section className="p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md">
      <span className="flex flex-row justify-start items-center pb-5">
        <span className="flex flex-col mr-20">
          <span className="text-white mr-auto">
            ANNOUNCEMENTS
            <button
              className="right-1 rounded-lg py-1 px-2 ml-1 
                            shadow-md text-center text-white text-sm font-bold"
            >
              CTRL + A
            </button>
          </span>
          <span className="text-gray-300 text-xs">
            updates, pep talks, blockers, reminders
          </span>
        </span>

        {/* tab pane */}
        <span className="ml-auto flex flex-row space-x-5 uppercase mr-5">
          <span className="underline underline-offset-8 decoration-white text-white hover:text-white hover:cursor-pointer">
            Active
          </span>

          <span className="text-gray-300 hover:text-white hover:cursor-pointer">
            Resolved
          </span>
        </span>

        <span className="text-sm text-gray-300 flex flex-row items-center">
          TODAY <FaAngleDown />
        </span>

        <button className="bg-gray-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
          <FaMicrophoneAlt className="text-lg text-white" />
        </button>
        <button className="bg-gray-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
          <FaPlay className="text-lg text-white" />
        </button>
      </span>

      <div className="flex flex-row overflow-auto whitespace-nowrap space-x-5 items-center">
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
            <span className="text-md font-bold text-white">Adriana</span>
            <span className="text-xs text-gray-200">5 minutes ago</span>
            <span className="text-xs text-white bg-red-400 p-1 rounded-md font-semibold flex flex-row items-center">
              <span>blockers</span>
            </span>
          </span>
        </span>

        {/* arjun's announcement */}
        <span className="flex flex-row p-3 bg-gray-300 bg-opacity-25 rounded-lg items-center">
          <span className="relative mr-2 grid items-center justify-items-center">
            <span className="bg-gray-200 bg-opacity-20 rounded-full shadow-md absolute w-full h-full"></span>

            <Image
              src={"/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-22.svg"}
              alt="profile"
              width={50}
              height={50}
            />
          </span>

          <span className="flex flex-col items-baseline mr-5">
            <span className="text-md font-bold text-white">Arjun</span>
            <span className="text-xs text-gray-200">30 minutes ago</span>
            <span className="text-xs text-white bg-indigo-400 p-1 rounded-md font-semibold flex flex-row items-center">
              <span>engineering</span>
            </span>
          </span>

          <button className="bg-gray-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
            <FaCheck className="text-lg text-white" />
          </button>
        </span>
      </div>
    </section>
  );
}
