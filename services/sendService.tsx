import {
  addDoc,
  collection,
  Firestore,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import Announcement from "../models/announcement";
import Link from "../models/link";
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

  async sendLink(link: Link) {
    await addDoc(collection(this.db, Collections.links), {
      ...link,
      createdDate: serverTimestamp(),
    });
  }

  async sendAnnouncement(announcement: Announcement) {
    await addDoc(collection(this.db, Collections.announcements), {
      ...announcement,
      createdDate: serverTimestamp(),
    });
  }
}
