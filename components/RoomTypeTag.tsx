import { FaClock } from "react-icons/fa";
import { IoTimer } from "react-icons/io5";
import { RoomType } from "../models/room";

interface RoomTypeTagProps {
  roomType: RoomType;
}

export default function RoomTypeTag(props: RoomTypeTagProps) {
  switch (props.roomType) {
    case RoomType.now:
      return (
        <span
          className="text-xs bg-red-500
      text-white font-bold p-1 rounded-md flex flex-row space-x-2 items-center"
        >
          <FaClock />
          <span>live</span>
        </span>
      );

    case RoomType.scheduled:
      return (
        <span className="text-blue-700 bg-blue-200 p-1 rounded-md text-xs font-bold flex flex-row items-center space-x-1">
          <FaClock />
          <span>scheduled</span>
        </span>
      );

    case RoomType.recurring:
      return (
        <span className="text-yellow-700 bg-yellow-200 p-1 rounded-md text-xs font-bold flex flex-row items-center space-x-1">
          <IoTimer />
          <span>recurring</span>
        </span>
      );
  }
}
