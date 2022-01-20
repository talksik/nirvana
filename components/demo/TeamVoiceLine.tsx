import { FaPlus } from "react-icons/fa";
import { UserStatus } from "../../models/user";

import Image from "next/image";
import { IoPulseOutline, IoRemoveOutline } from "react-icons/io5";

let testFriends = [
  {
    name: "Liam",
    role: "engineer",
    systemAvatar: "29",
    status: UserStatus.online,
  },
  {
    name: "Emily",
    role: "engineer",
    systemAvatar: "02",
    status: UserStatus.online,
  },
  {
    name: "Paul",
    role: "architect",
    systemAvatar: "43",
    status: UserStatus.online,
  },
  {
    name: "Mark",
    role: "engineer",
    systemAvatar: "04",
    status: UserStatus.busy,
  },
];

function statusBubble(status: UserStatus) {
  console.log(status);

  switch (status) {
    case UserStatus.online:
      return (
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></span>
      );
    case UserStatus.busy:
      return (
        <span className="absolute top-0 right-0 w-3 h-3 bg-orange-400 rounded-full"></span>
      );
    case UserStatus.offline:
      return (
        <span className="absolute top-0 right-0 w-3 h-3 bg-gray-400 rounded-full"></span>
      );
    default:
      return (
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></span>
      );
  }
}

function renderPulse(status: UserStatus) {
  switch (status) {
    case UserStatus.online:
      return (
        <IoPulseOutline className="text-green-500 text-2xl animate-pulse mx-2 ml-auto" />
      );
    case UserStatus.busy:
      return (
        <IoPulseOutline className="text-orange-400 text-2xl animate-pulse mx-2 ml-auto" />
      );
    case UserStatus.offline:
      return (
        <IoRemoveOutline className="text-gray-400 text-2xl mx-2 ml-auto" />
      );
    default:
      return (
        <IoPulseOutline className="text-green-400 text-2xl animate-pulse mx-2 ml-auto" />
      );
  }
}

export default function TeamVoiceLine() {
  return (
    <section className="p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-2xl translate-x-32 translate-y-20 z-10 backdrop-blur-xl">
      <span className="flex flex-row justify-start items-center pb-5">
        <span className="flex flex-col">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            TEAM
          </span>
        </span>

        <button className="bg-gray-400 bg-opacity-50 p-2 ml-auto rounded hover:bg-opacity-40">
          <FaPlus className="text-lg text-gray-500" />
        </button>
      </span>

      {/* list of team members */}
      {testFriends.map((friend, i) => {
        return (
          <span
            key={i}
            className={
              "flex w-52 flex-row items-center py-2 px-2 justify-items-start ease-in-out duration-300"
            }
          >
            <span className="relative flex mr-2 shrink-0">
              <span className="bg-gray-200 bg-opacity-30 rounded-full shadow-md absolute w-full h-full"></span>

              {statusBubble(friend.status)}

              <Image
                src={
                  "/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-" +
                  friend.systemAvatar +
                  ".svg"
                }
                alt="profile"
                width={50}
                height={50}
              />
            </span>

            <span className="flex flex-col mr-10">
              <span className="flex flex-row items-center space-x-2">
                <span className="text-sm text-gray-600 font-semibold">
                  {friend.name}{" "}
                </span>
                <button
                  className="rounded-lg py-1 px-2 shadow-lg 
                                text-center text-gray-200 text-sm font-bold"
                >
                  {i}
                </button>
              </span>

              <span className={"text-xs span-sans text-gray-400"}>
                {friend.role}
              </span>
            </span>

            {renderPulse(friend.status)}
          </span>
        );
      })}
    </section>
  );
}
