import { v4 as uuid } from "uuid";
import { Timestamp } from "firebase/firestore";

export default class Conversation {
  id: string = uuid();

  type: ConversationType;
  name?: string; // engineering, general, arjun, jacob and rachel...

  createdDate: Timestamp = Timestamp.now();
  createdByUserId: string;

  constructor(
    _createdByUserId: string,
    _type: ConversationType,
    _name?: string
  ) {
    this.name = _name;
    this.createdByUserId = _createdByUserId;
    this.type = _type;
  }
}

export enum ConversationType {
  personal = "personal", // no conversation name then
  group = "group", // must have conversation name
}
