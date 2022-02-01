import { v4 as uuid } from "uuid";
import { Timestamp } from "firebase/firestore";

export default class Conversation {
  id: string = uuid();

  type: ConversationType;
  name: string; // engineering, general, arjun and jacob...

  createdDate: Timestamp = Timestamp.now();
  createdByUserId: string;

  constructor(
    _name: string,
    _createdByUserId: string,
    _type: ConversationType
  ) {
    this.name = _name;
    this.createdByUserId = _createdByUserId;
    this.type = _type;
  }
}

export enum ConversationType {
  personal = "personal",
  group = "group",
}
