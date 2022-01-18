import {
  addDoc,
  collection,
  doc,
  Firestore,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Room, { RoomStatus } from "../models/room";
import { Collections } from "./collections";

export default class RoomService {
  private db: Firestore = getFirestore();

  async createOrUpdateRoom(room: Room) {
    if (room.id) {
      //update
      await this.updateRoom(room);
    } else {
      //create
      const roomDocRef = await addDoc(collection(this.db, Collections.rooms), {
        ...room,
        createdDate: serverTimestamp(),
      });
    }
  }

  async updateMembersInRoom(roomId: string, newMembersInRoom: string[]) {
    // if the room is going to be empty, then change status accordingly
    var status: RoomStatus = RoomStatus.live;
    if (newMembersInRoom.length == 0) {
      status = RoomStatus.empty;
    }

    const docRef = doc(this.db, Collections.rooms, roomId);
    await setDoc(
      docRef,
      {
        status,
        membersInRoom: newMembersInRoom,
        lastUpdatedDate: serverTimestamp(),
      },
      { merge: true }
    );
  }

  async updateRoom(room: Room) {
    const docRef = doc(this.db, Collections.rooms, room.id);
    await setDoc(
      docRef,
      { ...room, lastUpdatedDate: serverTimestamp() },
      { merge: true }
    );
  }
}
