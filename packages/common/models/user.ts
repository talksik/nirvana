import {
  documentId,
  Firestore,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default class User {
  id: string = uuidv4();
  emailAddress: string;

  firstName: string;
  lastName: string;

  avatarUrl: string;
  userStatus: UserStatus;

  /**designer? dev? in the future can put other things like 'best in the world' */
  description?: string;

  createdDate: Timestamp = Timestamp.now();
  lastUpdatedDate?: Timestamp;

  // serialize() {
  //     return {
  //         createdDate: Timestamp.fromDate(this.createdDate),
  //         lastUpdatedDate: Timestamp.fromDate(this.lastUpdatedDate)
  //     }
  // }

  // deserialize(firestoreData: {}) {
  //     this.lastUpdatedDate = firestoreData.lastUpdatedDate.toDate()
  // }

  constructor(
    _id: string = uuidv4(),
    _emailAddress: string,
    _firstName: string,
    _lastName: string,
    _avatarUrl: string,
    _userStatus: UserStatus
  ) {
    this.id = _id;
    this.emailAddress = _emailAddress;
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.avatarUrl = _avatarUrl;
    this.userStatus = _userStatus;
  }
}

export enum UserStatus {
  online = "online",
  offline = "offline",
  busy = "busy",

  // new statuses
  inLiveRoom = "inLiveRoom",
  focusMode = "focusMode",
}
