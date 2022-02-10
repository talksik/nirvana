import { User as FirUser } from "firebase/auth";
import {
  Firestore,
  getFirestore,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  serverTimestamp,
  onSnapshot,
  Unsubscribe,
  DocumentSnapshot,
} from "firebase/firestore";
import User, { UserStatus } from "../models/user";
import Collections from "./collections";

export default class UserService {
  private db: Firestore = getFirestore();

  // give back the avatar based on the person's google account avatar
  getUserAvatar(displayName: string) {
    return `https://ui-avatars.com/api/?name=${displayName}`;
  }

  async getUser(userId: string): Promise<User | null> {
    const docRef = doc(this.db, Collections.users, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let user: User = docSnap.data() as User;
      return user;
    } else {
      // doc.data() will be undefined in this case
      console.log("user not found!");

      return null;
    }
  }

  async getUserRealtime(userId: string): Promise<Unsubscribe> {
    const docRef = doc(this.db, Collections.users, userId);

    const unsub = onSnapshot(docRef, (doc) => {
      console.log(doc.data());
    });

    return unsub;
  }

  async createUser(userId: string, emailAddress: string, avatarUrl: string) {
    const docRef = doc(this.db, Collections.users, userId);
    await setDoc(
      docRef,
      { emailAddress, avatarUrl, createdDate: serverTimestamp() },
      { merge: true }
    );
  }

  async updateUser(user: User) {
    const docRef = doc(this.db, Collections.users, user.id);
    await setDoc(
      docRef,
      { ...user, lastUpdatedDate: serverTimestamp() },
      { merge: true }
    );
  }

  async updateUserStatus(userId: string, newStatus: UserStatus) {
    const docRef = doc(this.db, Collections.users, userId);
    await setDoc(
      docRef,
      { userStatus: newStatus, lastUpdatedDate: serverTimestamp() },
      { merge: true }
    );
  }
}
