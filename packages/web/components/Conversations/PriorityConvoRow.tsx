import { Avatar } from "antd";
import { useRecoilValue } from "recoil";
import { selectedPriorityConvoAtom } from "../../recoil/main";
import Conversation from "../../../common/models/conversation";
import { MasterAvatarGroupWithUserFetch } from "../UserDetails/MasterAvatarGroup";
import moment from "moment";

export default function PriorityConvoRow(props: {
  conversation: Conversation;
  itemIndex: number;
}) {
  // figure out if this is a selectedConvo
  const selectedConvo = useRecoilValue(selectedPriorityConvoAtom);

  const isSelected = selectedConvo == props.conversation.id ? true : false;

  // who was the last sender based on the lastInteractionDate etc.
  const myTurn = false;

  // todo: implement method in conversation
  // const isOneonOne =

  return (
    <span
      className={`group flex flex-row items-center rounded-lg p-2 w-full hover:cursor-pointer ${
        isSelected && "bg-slate-50 shadow-lg"
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

        <span className="text-slate-300 text-xs">
          {moment(props.conversation.lastActivityDate.toDate()).fromNow()}
        </span>
      </span>
    </span>
  );
}
