import { Avatar, Tooltip } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  checkIncomingMessageSelector,
  selectedPriorityConvoAtom,
} from "../../recoil/main";
import Conversation from "../../../common/models/conversation";
import { MasterAvatarGroupWithUserFetch } from "../UserDetails/MasterAvatarGroup";
import moment from "moment";
import {
  FaCaretRight,
  FaCircle,
  FaMicrophoneAlt,
  FaPlay,
} from "react-icons/fa";
import { useCallback } from "react";
import { FaAngleRight } from "react-icons/fa";

export default function PriorityConvoRow(props: {
  conversation: Conversation;
  itemIndex: number;
}) {
  // figure out if this is a selectedConvo
  const [selectedConvo, setSelectedConvo] = useRecoilState(
    selectedPriorityConvoAtom
  );

  const isSelected = selectedConvo == props.conversation.id ? true : false;

  // who was the last sender based on the lastInteractionDate etc.
  const isNewIncoming = useRecoilValue(
    checkIncomingMessageSelector(props.conversation.id)
  );

  // todo: implement method in conversation
  // const isOneonOne =

  const handleSelectConvo = useCallback(() => {
    setSelectedConvo(props.conversation.id);
  }, [props.conversation]);

  return (
    <span
      onClick={handleSelectConvo}
      className={`group flex flex-row items-center rounded-lg p-2 w-full transition-all hover:cursor-pointer z-10 ${
        isSelected && "bg-slate-50 shadow-lg scale-125 w-[25rem]"
      }`}
    >
      <MasterAvatarGroupWithUserFetch
        listOfUserIds={props.conversation.activeMembers}
        showCurrUser={false}
      />

      <span className="flex flex-col items-start ml-2">
        <span className="flex flex-row items-center space-x-2">
          <span className="text-slate-400">{props.conversation.name}</span>
          <span
            className="ml-auto shadow-lg flex flex-row items-center h-[1.5rem] w-[1.5rem]
justify-center rounded-lg text-slate-400 font-bold hover:cursor-pointer text-xs"
          >
            {props.itemIndex}
          </span>
        </span>

        <span className="flex flex-row">
          {isNewIncoming && (
            <FaCircle className="ml-2 text-orange-500 mr-2 animate-pulse text-[0.75rem]" />
          )}
          <span className="text-slate-300 text-xs">
            {moment(props.conversation.lastActivityDate.toDate()).fromNow()}
          </span>
        </span>
      </span>

      {isSelected && (
        <>
          <Tooltip title={"Record by pressing and holding R on keyboard."}>
            <span className="ml-auto p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaMicrophoneAlt className="ml-auto text-lg text-orange-800" />
            </span>
          </Tooltip>

          <Tooltip
            title={"Play last convo chunk by pressing SPACE on keyboard."}
          >
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaPlay className="ml-auto text-lg text-emerald-800" />
            </span>
          </Tooltip>
          <Tooltip title={"View Details"}>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaAngleRight className="ml-auto text-md text-slate-400" />
            </span>
          </Tooltip>
        </>
      )}
    </span>
  );
}
