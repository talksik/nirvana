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
// import AgoraService from "./agoraService";
import { Collections } from "./collections";

export default class OfficeRoomService {
  private db: Firestore = getFirestore();
  private batch = writeBatch(this.db);

  // private agoraService = new AgoraService();

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

  async joinOfficeRoom(officeRoom: OfficeRoom, userId: string) {
    // get agoraToken
    // const agoraToken = await this.agoraService.getAgoraToken();

    // join channel
    // await this.agoraService.handleJoinChannel(officeRoom.id, agoraToken);

    // update members list in firestore
    const newMembers = [...officeRoom.members, userId];
    await this.updateMembersInOfficeRoom(officeRoom.id, newMembers);
  }

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
