import { documentId, Firestore, serverTimestamp, Timestamp } from "firebase/firestore";
import IFirestoreSerializable from "./firestoreSerializable";

export class User {
    id: string;
    emailAddress: string;
    nickName: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    userStatus: UserStatus

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
    inCall = "in call",
    busy = "busy"
}
