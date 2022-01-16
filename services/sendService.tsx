import {
  addDoc,
  collection,
  Firestore,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { Message } from "../models/message";
import { Collections } from "./collections";

export class SendService {
  private db: Firestore = getFirestore();

  async sendMessage(message: Message) {
    // do quick stuff to create the composite for easier future querying
    message.senderReceiver = [message.senderUserId, message.receiverUserId];

    const teamDocRef = await addDoc(
      collection(this.db, Collections.audioMessages),
      {
        ...message,
        createdDate: serverTimestamp(),
      }
    );
  }
}
