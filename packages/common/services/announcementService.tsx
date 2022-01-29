import {
  addDoc,
  collection,
  doc,
  Firestore,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { AnnouncementState } from "../models/announcement";
import { Collections } from "./collections";

export class AnnouncementService {
  private db: Firestore = getFirestore();

  async updateAnnouncementState(
    announcementId: string,
    newState: AnnouncementState
  ) {
    const docRef = doc(this.db, Collections.announcements, announcementId);
    await setDoc(
      docRef,
      { state: newState, lastUpdatedDate: serverTimestamp() },
      { merge: true }
    );
  }
}
