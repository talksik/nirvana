import { v4 as uuid } from "uuid";
import { Timestamp } from "firebase/firestore";

export default class UserConversation {
  id: string = uuid();

  userId: string;
  conversationId: string;
  state: UserConversationState;

  createdDate: Timestamp = Timestamp.now();
  lastUpdatedDate?: Timestamp;

  constructor(
    _userId: string,
    _conversationId: string,
    _state: UserConversationState
  ) {
    this.userId = _userId;
    this.conversationId = _conversationId;
    this.state = _state;
  }
}

export enum UserConversationState {
  inbox = "inbox",
  default = "default",
  priority = "priority",
  later = "later",
  done = "done",
  // blocked = "blocked"
}
