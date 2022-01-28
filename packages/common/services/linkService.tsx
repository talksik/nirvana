import {
  addDoc,
  collection,
  doc,
  Firestore,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Link, { LinkState } from "../models/link";
import { Collections } from "./collections";

export class LinkService {
  private db: Firestore = getFirestore();

  async updateLinkState(linkId: string, newState: LinkState) {
    const docRef = doc(this.db, Collections.links, linkId);
    await setDoc(
      docRef,
      { state: newState, lastUpdatedDate: serverTimestamp() },
      { merge: true }
    );
  }
}
