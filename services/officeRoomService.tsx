import {
  addDoc,
  collection,
  doc,
  FieldValue,
  Firestore,
  getFirestore,
  serverTimestamp,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import OfficeRoom, { OfficeRoomState } from "../models/officeRoom";
import { Collections } from "./collections";

export default class OfficeRoomService {
  private db: Firestore = getFirestore();
  private batch = writeBatch(this.db);

  async createInitialOfficeRooms(createdByUserId: string, teamId: string) {
    const entrance = new OfficeRoom("Entrance", teamId, createdByUserId);
    const kitchen = new OfficeRoom("Kitchen", teamId, createdByUserId);
    const hallway = new OfficeRoom("Hallway", teamId, createdByUserId);
    const corner = new OfficeRoom("Corner", teamId, createdByUserId);
    const main = new OfficeRoom("Team Hub", teamId, createdByUserId);
    const handsOnDeck = new OfficeRoom(
      "All Hands On Deck",
      teamId,
      createdByUserId
    );

    const initialORs: OfficeRoom[] = [
      entrance,
      kitchen,
      hallway,
      corner,
      main,
      handsOnDeck,
    ];

    initialORs.forEach((oR) => {
      const oRRef = doc(this.db, Collections.officeRooms, oR.id);
      this.batch.set(oRRef, { ...oR, createdDate: serverTimestamp() });
    });

    await this.batch.commit();
  }

  // async createOrUpdateRoom(room: Room) {
  //   if (room.id) {
  //     //update
  //     await this.updateRoom(room);
  //   } else {
  //     //create
  //     const roomDocRef = await addDoc(collection(this.db, Collections.rooms), {
  //       ...room,
  //       createdDate: serverTimestamp(),
  //     });
  //   }
  // }

  async updateMembersInOfficeRoom(
    officeRoomId: string,
    newMembersInRoom: string[]
  ) {
    // if the room is going to be empty, then change status accordingly
    var state: OfficeRoomState = OfficeRoomState.active;
    if (newMembersInRoom.length == 0) {
      state = OfficeRoomState.idle;
    }

    const docRef = doc(this.db, Collections.officeRooms, officeRoomId);
    await setDoc(
      docRef,
      {
        state,
        members: newMembersInRoom,
        lastUpdatedDate: serverTimestamp(),
      },
      { merge: true }
    );
  }

  // async updateRoom(room: Room) {
  //   const docRef = doc(this.db, Collections.rooms, room.id);
  //   await setDoc(
  //     docRef,
  //     { ...room, lastUpdatedDate: serverTimestamp() },
  //     { merge: true }
  //   );
  // }
}
