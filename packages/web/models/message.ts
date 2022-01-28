import { Timestamp } from "firebase/firestore";

export class Message {
  id: string;
  audioDataUrl: string;

  senderUserId: string;
  receiverUserId: string;

  senderReceiver: string[]; // composite to make querying easier in the future

  createdDate: Timestamp;

  // firstListenDate: Timestamp;
}
