import Conversation from "@nirvana/common/models/conversation";
import { agoraService, conversationService } from "@nirvana/common/services";
import { Avatar, Tooltip } from "antd";
import toast from "react-hot-toast";
import { FaPhoneSlash, FaWalking } from "react-icons/fa";
import { useAuth } from "../../contexts/authContext";
import { MasterAvatarGroupWithUserFetch } from "../UserDetails/MasterAvatarGroup";

export default function LiveRoom(props: {
  conversation: Conversation;
  handleJoinLive: (conversationId: string) => Promise<void>;
  handleLeaveLive: (conversationId: string) => Promise<void>;
}) {
  const { currUser } = useAuth();

  return (
    <span className="group relative flex flex-row items-center bg-slate-50 rounded-lg border p-5 animate-pulse">
      <MasterAvatarGroupWithUserFetch
        listOfUserIds={props.conversation.membersInLiveRoom}
        showCurrUser={true}
      />

      <span className="text-md font-semibold ml-2 mr-10">
        {props.conversation.name}
      </span>

      <span className="ml-auto text-xs text-slate-300 group-hover:invisible">
        {"01:20"}
      </span>

      {props.conversation.membersInLiveRoom.includes(currUser!.uid) ? (
        <Tooltip title={"Leave"}>
          <span
            onClick={() => props.handleLeaveLive(props.conversation.id)}
            className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200
          absolute right-5 text-slate-50 group-hover:text-red-600 text-lg transition-all -z-10 group-hover:z-10"
          >
            <FaPhoneSlash className="text-lg" />
          </span>
        </Tooltip>
      ) : (
        <Tooltip title={"Join live conversation"}>
          <span
            onClick={() => props.handleJoinLive(props.conversation.id)}
            className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200
          absolute right-5 text-slate-50 group-hover:text-teal-600 text-lg transition-all -z-10 group-hover:z-10"
          >
            <FaWalking className="text-lg" />
          </span>
        </Tooltip>
      )}
    </span>
  );
}
