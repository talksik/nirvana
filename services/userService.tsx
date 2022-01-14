import { User as FirUser } from "firebase/auth";
import { Firestore, getFirestore, doc, getDoc, setDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import { User } from '../models/user'

export default class UserService {
  private db : Firestore = getFirestore()
  private static collectionName: string = "users"
  
  // give back the avatar based on the person's google account avatar
  getUserAvatar(displayName: string) {
    return `https://ui-avatars.com/api/?name=${displayName}`
  }

  async getUser(userId: string) : Promise<User | null> {
    const docRef = doc(this.db, UserService.collectionName, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('got user data')
      let user: User = docSnap.data() as User
      return user
    } else {
      // doc.data() will be undefined in this case
      console.log("user not found!");
      
      return null
    }
  }

  async createUser(userId: string, emailAddress: string, avatarUrl: string) {
    const docRef = doc(this.db, UserService.collectionName, userId);
    await setDoc(docRef, { emailAddress, avatarUrl, createdDate: serverTimestamp() }, { merge: true })
  }

  async updateUser(user: User) {
    const docRef = doc(this.db, UserService.collectionName, user.id);
    await setDoc(docRef, { ...user, lastUpdatedDate: serverTimestamp() }, { merge: true })
  }
}