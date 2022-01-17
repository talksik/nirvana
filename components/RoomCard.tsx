import { BsThreeDots } from "react-icons/bs";
import { FaBell, FaClock, FaLink } from "react-icons/fa";
import { IoTimer } from "react-icons/io5";
import Room from "../models/room";
import RoomTypeTag from "./RoomTypeTag";
import Image from "next/image";
import { useAuth } from "../contexts/authContext";
import { Tooltip } from "antd";

interface IRoomCardProps {
  room: Room;
}
export default function RoomCard(props: IRoomCardProps) {
  const { currUser } = useAuth();

  // const x = {`${
  //   props.room.membersInRoom?.includes(currUser.uid)
  //     ? " bg-white bg-opacity-80"
  //     : "bg-gray-300 bg-opacity-25"
  // }`}

  var isUserInRoom: boolean;
  if (props.room.membersInRoom?.includes(currUser.uid)) {
    isUserInRoom = true;
  }

  const membersInRoom = (
    <Tooltip title={"Arjun and Liam"}>
      <span className="inline-flex flex-row-reverse items-center shrink-0 mr-1">
        <span className="relative flex">
          <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
          <Image
            className=""
            src={"/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-20.svg"}
            alt="profile"
            width={30}
            height={30}
          />
        </span>
        <span className="-mr-4 relative flex">
          <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
          <Image
            className=""
            src={"/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-22.svg"}
            alt="profile"
            width={30}
            height={30}
          />
        </span>
      </span>
    </Tooltip>
  );

  return (
    <span
      className={`flex flex-col ${
        isUserInRoom ? " bg-white bg-opacity-80" : "bg-gray-300 bg-opacity-25"
      }  rounded-lg justify-between w-96 max-w-screen-sm m-2 overflow-clip`}
    >
      {/* header */}
      <span className="flex flex-row justify-between items-baseline space-x-1 p-5">
        {/* meeting details */}
        <span className="flex flex-col items-baseline max-w-xs pr-20">
          <span
            className={`${
              isUserInRoom ? " text-gray-500" : "text-white"
            }   font-semibold mr-auto`}
          >
            {props.room.name}
          </span>
          <span
            className={`${
              isUserInRoom ? " text-gray-400" : "text-gray-200"
            }   text-xs  overflow-wrap`}
          >
            {props.room.description}
          </span>

          {/* badges and tags */}
          {/* <span className="flex flex-row flex-wrap space-x-2">
            <span className="text-xs my-3 text-white bg-cyan-400 p-1 rounded-md font-bold flex flex-row space-x-2 items-center">
              <span>scrum</span>
            </span>
          </span> */}
        </span>

        {/* room status and link(s) */}
        <span className="flex flex-col items-end space-y-1 justify-between h-full">
          <RoomTypeTag roomType={props.room.type} />

          {/* room attachments */}
          <span className="flex flex-row space-x-2">
            {props.room.attachments && props.room.attachments.length > 0 && (
              <button
                onClick={() => window.open(props.room.attachments[0], "_blank")}
                className={`${
                  isUserInRoom
                    ? " bg-gray-400 bg-opacity-25 text-gray-400"
                    : "bg-gray-300 bg-opacity-25 text-white"
                }   bg-gray-400 bg-opacity-25 p-2 ml-auto rounded hover:bg-opacity-40`}
              >
                <FaLink className="text-sm" />
              </button>
            )}
          </span>
        </span>
      </span>

      {/* footer */}
      <span className="flex flex-row items-center bg-gray-400 bg-opacity-30 p-3">
        {membersInRoom}
        <button className="ml-auto text-sm text-orange-500 font-semibold py-1 px-4 bg-gray-200 rounded">
          👋 Leave
        </button>
        <BsThreeDots className="text-white ml-2 hover:cursor-pointer" />{" "}
      </span>
    </span>
  );
}
