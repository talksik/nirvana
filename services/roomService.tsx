import {
  addDoc,
  collection,
  doc,
  Firestore,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import Room from "../models/room";
import { Collections } from "./collections";

export default class RoomService {
  private db: Firestore = getFirestore();

  async createRoom(room: Room) {
    const roomDocRef = await addDoc(collection(this.db, Collections.rooms), {
      ...room,
      createdDate: serverTimestamp(),
    });
  }
}
