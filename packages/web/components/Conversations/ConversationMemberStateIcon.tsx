import { ConversationMemberState } from "@nirvana/common/models/conversation";
import { FaStream, FaRegClock, FaRocket, FaCheck } from "react-icons/fa";

export default function ConversationMemberStateIcon(props: {
  convoUserAssocState: ConversationMemberState;
}) {
  switch (props.convoUserAssocState) {
    case ConversationMemberState.default:
      return <FaStream className="text-teal-600" />;
    case ConversationMemberState.later:
      return <FaRegClock className="text-purple-500" />;
    case ConversationMemberState.priority:
      return <FaRocket className="text-sky-500" />;
    case ConversationMemberState.done:
      return <FaCheck className="text-emerald-500" />;
    default:
      return <FaStream className="text-teal-600" />;
  }
}
