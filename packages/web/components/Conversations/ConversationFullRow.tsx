import Conversation from "@nirvana/common/models/conversation";
import { Avatar, Tooltip } from "antd";
import moment from "moment";
import {
  FaCircle,
  FaUser,
  FaRocket,
  FaRegClock,
  FaCheck,
  FaAngleRight,
} from "react-icons/fa";
import { useRecoilValue } from "recoil";
import {
  allRelevantConversationsAtom,
  checkIncomingMessageSelector,
} from "../../recoil/main";
import { MasterAvatarGroupWithUserFetch } from "../UserDetails/MasterAvatarGroup";
import { FaPlay } from "react-icons/fa";

export default function ConversationFullRow(props: {
  conversation: Conversation;
}) {
  let quickUpdateText = "";

  if (props.conversation.cachedAudioClips?.length > 0) {
    quickUpdateText = `${props.conversation.cachedAudioClips[0].senderUserId} spoke just now...`;
  }

  // check if I am outdate on a certain conversation
  const isNewIncoming = useRecoilValue(
    checkIncomingMessageSelector(props.conversation.id)
  );

  return (
    <span
      className="py-5 px-4 border-t border-t-slate-200 flex flex-row
       hover:bg-slate-50 transition-all items-center group relative"
    >
      {isNewIncoming && (
        <FaCircle className="text-orange-500 mr-2 animate-pulse text-[0.75rem]" />
      )}

      <span className="w-[15rem] flex flex-row items-center">
        <span className="w-[5rem]">
          <MasterAvatarGroupWithUserFetch
            listOfUserIds={props.conversation.activeMembers}
            showCurrUser={false}
          />
        </span>

        <span className="text-slate-500 ml-2 font-semibold">
          {props.conversation.name}
        </span>
      </span>

      <span className="text-slate-300 w-[20rem] truncate text-sm">
        {quickUpdateText}
      </span>

      <span className="ml-auto text-slate-300 text-sm group-hover:invisible">
        {moment(props.conversation.lastActivityDate.toDate()).fromNow()}
      </span>

      {/* actions */}
      <span
        className="ml-auto flex flex-row items-center 
      group-hover:visible invisible absolute right-5 text-slate-400"
      >
        <Tooltip title={"Play last convo chunk."}>
          <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
            <FaPlay className="ml-auto text-lg text-emerald-500" />
          </span>
        </Tooltip>

        <Tooltip title={"Priority"}>
          <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
            <FaRocket className="ml-auto text-lg" />
          </span>
        </Tooltip>
        <Tooltip title={"Later"}>
          <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
            <FaRegClock className="ml-auto text-lg" />
          </span>
        </Tooltip>
        <Tooltip title={"Done"}>
          <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
            <FaCheck className="ml-auto text-lg" />
          </span>
        </Tooltip>
      </span>
    </span>
  );
}
