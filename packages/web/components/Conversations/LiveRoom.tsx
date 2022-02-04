import Conversation from "@nirvana/common/models/conversation";
import { Avatar } from "antd";
import { FaWalking } from "react-icons/fa";

export default function LiveRoom(props: { conversation: Conversation }) {
  return (
    <span className="group relative flex flex-row items-center bg-slate-50 rounded-lg border p-5 animate-pulse">
      <Avatar.Group
        maxCount={3}
        size={{ xs: 1000 }}
        maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
      >
        <Avatar
          src="https://joeschmoe.io/api/v1/random"
          style={{ backgroundColor: "cyan" }}
        />
        <Avatar src="https://joeschmoe.io/api/v1/100" />
        <Avatar src="https://joeschmoe.io/api/v1/2" />
        <Avatar src="https://joeschmoe.io/api/v1/10" />
        <Avatar src="https://joeschmoe.io/api/v1/8" />
      </Avatar.Group>

      <span className="text-md font-semibold ml-2 mr-10">Engineering</span>

      <span className="text-xs text-slate-300 group-hover:invisible">
        {"01:20"}
      </span>

      <span
        className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200
          absolute right-5 text-slate-50 group-hover:text-teal-600 text-lg transition-all -z-10 group-hover:z-10"
      >
        <FaWalking className="text-lg" />
      </span>
    </span>
  );
}
