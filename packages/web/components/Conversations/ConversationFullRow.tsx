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
  allUsersConversationsAtom,
  checkIncomingMessageSelector,
} from "../../recoil/main";
import { MasterAvatarGroupWithUserFetch } from "../UserDetails/MasterAvatarGroup";
import { FaPlay } from "react-icons/fa";
import { ConversationMemberState } from "../../../common/models/conversation";
import { conversationService } from "@nirvana/common/services";
import { useAuth } from "../../contexts/authContext";
import toast from "react-hot-toast";

export default function ConversationFullRow(props: {
  conversation: Conversation;
}) {
  const { currUser } = useAuth();
  const usersConvosMap = useRecoilValue(allUsersConversationsAtom);

  // check if I am outdate on a certain conversation
  const isNewIncoming = useRecoilValue(
    checkIncomingMessageSelector(props.conversation.id)
  );

  const handleOrganizeConversation = async (
    toState: ConversationMemberState
  ) => {
    try {
      // use service to make change in database which will change local data
      await conversationService.updateUserConvoRelationship(
        currUser!.uid,
        props.conversation.id,
        toState
      );

      toast.success("Moved conversation to " + toState);
    } catch (error) {
      console.error(error);
      toast.error("Problem in moving conversation");
    }
  };

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
        {props.conversation.tldr}
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
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleOrganizeConversation(ConversationMemberState.priority);
            }}
            className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200"
          >
            <FaRocket className="ml-auto text-lg" />
          </span>
        </Tooltip>
        <Tooltip title={"Later"}>
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleOrganizeConversation(ConversationMemberState.later);
            }}
            className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200"
          >
            <FaRegClock className="ml-auto text-lg" />
          </span>
        </Tooltip>
        <Tooltip title={"Done"}>
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleOrganizeConversation(ConversationMemberState.done);
            }}
            className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200"
          >
            <FaCheck className="ml-auto text-lg" />
          </span>
        </Tooltip>
      </span>
    </span>
  );
}
