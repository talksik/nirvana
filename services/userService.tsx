import { User as FirUser } from "firebase/auth";
import { Firestore, getFirestore, doc, getDoc } from "firebase/firestore";
import { User } from '../models/user'

export default class UserService {
  private db : Firestore = getFirestore()
  private static collectionName: string = "users"

  constructor() {

  }

  // give back the avatar based on the person's google account avatar or if they set one then
  getUserAvatar(firstName: string, lastName: string, avatar: string = null) {
    if (avatar) {
      return avatar
    }

    return `https://ui-avatars.com/api/?name=${firstName}+${lastName}`
  }

  async getUser(userId: string) : Promise<User | null> {
    const docRef = doc(this.db, UserService.collectionName, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      let user: User = docSnap.data() as User
      return user
    } else {
      // doc.data() will be undefined in this case
      console.log("user not found!");
      
      return null
    }
  }
}