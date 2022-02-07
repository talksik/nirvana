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
  FaStream,
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
import { useRouter } from "next/router";
import { Routes } from "@nirvana/common/helpers/routes";

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

  const router = useRouter();

  const handleViewConversationDetails = (e) => {
    router.push({
      pathname: Routes.home,
      query: { convoId: props.conversation.id },
    });
  };

  const playLastClip = () => {
    if (!props.conversation.cachedAudioClip) {
      toast.error("Nothing to play");
      return;
    }

    // todo: add to queue instead of playing here
    const audio = new Audio(props.conversation.cachedAudioClip.audioDataUrl);
    audio.play();
  };

  // todo:
  /**
   * show actions based on which state it is currently in for this user
   *
   */
  const currUserAssoc = usersConvosMap.get(props.conversation.id);

  let currConvoMemberState: ConversationMemberState =
    ConversationMemberState.default;
  if (currUserAssoc) {
    if (currUserAssoc.state == ConversationMemberState.later) {
      currConvoMemberState = ConversationMemberState.later;
    } else if (currUserAssoc.state == ConversationMemberState.done) {
      currConvoMemberState = ConversationMemberState.done;
    } else if (currUserAssoc.state == ConversationMemberState.priority) {
      currConvoMemberState = ConversationMemberState.priority;
    }
  }
  return (
    <span
      onClick={handleViewConversationDetails}
      className={`py-5 px-4 border-t border-t-slate-200 flex flex-row last:border-b-slate-200 last:border-b
       hover:bg-slate-50 transition-all items-center group relative hover:cursor-pointer ${
         isNewIncoming ? "bg-slate-50" : "text-slate-100"
       }`}
    >
      <FaCircle
        className={`mr-2 animate-pulse text-[0.75rem] ${
          isNewIncoming ? "text-orange-500" : "text-slate-100"
        }`}
      />

      <span className="w-[15rem] flex flex-row items-center">
        <span className="w-[5rem]">
          <MasterAvatarGroupWithUserFetch
            listOfUserIds={props.conversation.activeMembers}
            showCurrUser={false}
          />
        </span>

        <span
          className={`ml-2 ${
            isNewIncoming ? "text-slate-500 font-semibold" : "text-slate-400"
          }`}
        >
          {props.conversation.name}
        </span>
      </span>

      <span className="text-slate-300 w-[20rem] truncate text-sm">
        {props.conversation.tldr}
      </span>

      <span
        className={`ml-auto  text-sm group-hover:invisible ${
          isNewIncoming ? "text-slate-400 font-semibold" : "text-slate-300"
        }`}
      >
        {moment(props.conversation.lastActivityDate.toDate()).fromNow()}
      </span>

      {/* actions */}
      <span
        className="ml-auto flex flex-row items-center 
      group-hover:visible invisible absolute right-5 text-slate-400"
      >
        <Tooltip title={"Play last convo chunk."}>
          <span
            onClick={(e) => {
              e.stopPropagation();
              playLastClip();
            }}
            className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200"
          >
            <FaPlay className="ml-auto text-lg text-emerald-500" />
          </span>
        </Tooltip>

        {currConvoMemberState != ConversationMemberState.default && (
          <Tooltip title={"Inbox"}>
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleOrganizeConversation(ConversationMemberState.default);
              }}
              className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200"
            >
              <FaStream className="ml-auto text-lg" />
            </span>
          </Tooltip>
        )}

        {currConvoMemberState != ConversationMemberState.later && (
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
        )}

        {currConvoMemberState != ConversationMemberState.priority && (
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
        )}

        {currConvoMemberState != ConversationMemberState.done && (
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
        )}
      </span>
    </span>
  );
}
