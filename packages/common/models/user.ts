import {
  documentId,
  Firestore,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import IFirestoreSerializable from "./firestoreSerializable";

export class User {
  id: string;
  emailAddress: string;
  nickName: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  userStatus: UserStatus;

  /**designer? dev? */
  teamRole: string;

  createdDate: Timestamp;
  lastUpdatedDate: Timestamp;

  // serialize() {
  //     return {
  //         createdDate: Timestamp.fromDate(this.createdDate),
  //         lastUpdatedDate: Timestamp.fromDate(this.lastUpdatedDate)
  //     }
  // }

  // deserialize(firestoreData: {}) {
  //     this.lastUpdatedDate = firestoreData.lastUpdatedDate.toDate()
  // }
}

export enum UserStatus {
  online = "online",
  offline = "offline",
  busy = "busy",

  // new statuses
  inLiveRoom = "inLiveRoom",
  focusMode = "focusMode",
}
