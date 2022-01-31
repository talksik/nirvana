import { v4 as uuid } from "uuid";
import { Timestamp } from "firebase/firestore";

export default class Conversation {
  id: string = uuid();

  name: string; // engineering, general, arjun and jacob...

  createdDate: Timestamp = Timestamp.now()
  createdByUserId: string


  constructor(name: string createdByUserId: string) {
    this.name = name;
    this.createdByUserId = createdByUserId
  }
}
