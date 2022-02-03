import {
  addDoc,
  collection,
  doc,
  Firestore,
  getFirestore,
  serverTimestamp,
  setDoc,
  runTransaction,
  writeBatch,
} from "firebase/firestore";
import Conversation, { ConversationMember } from "../models/conversation";
import Collections from "./collections";

export default class ConversationService {
  private db: Firestore = getFirestore();

  async test() {
    const docRef = doc(this.db, "test", "test");
    await setDoc(
      docRef,
      { hi: " hiii", lastUpdatedDate: serverTimestamp() },
      { merge: true }
    );
  }

  async createConversation(
    conversation: Conversation,
    members: ConversationMember[]
  ) {
    try {
      const newConvoRef = doc(
        this.db,
        Collections.conversations,
        conversation.id
      );

      const newConvo = await runTransaction(this.db, async (transaction) => {
        transaction.set(
          newConvoRef,
          {
            ...conversation,
            createdDate: serverTimestamp(),
            lastActivityDate: serverTimestamp(),
          },
          { merge: true }
        );

        return newConvoRef;
      });

      const batch = writeBatch(this.db);

      members.forEach((mem) => {
        const newMemberRef = doc(
          this.db,
          Collections.conversations,
          newConvo.id,
          Collections.conversationMembers,
          mem.id
        );
        batch.set(newMemberRef, { ...mem, createdDate: serverTimestamp() });
      });

      await batch.commit();

      console.log(
        "submitted batch write for each new member of this conversation"
      );
    } catch (e) {
      console.error(e);
      throw new Error("Problem in creating conversation");
    }
  }
}
