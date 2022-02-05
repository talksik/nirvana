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
import { ConversationMemberState } from "../models/conversation";

export default class ConversationService {
  private db: Firestore = getFirestore();

  async test(): Promise<boolean> {
    const docRef = doc(this.db, "test", "test");
    await setDoc(
      docRef,
      { hi: " hiii", lastUpdatedDate: serverTimestamp() },
      { merge: true }
    );

    return false;
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

  async updateUserConvoRelationship(
    userId: string,
    convoId: string,
    newState: ConversationMemberState,
    changeLastInteractionDate: boolean = true
  ) {
    const docRef = doc(
      this.db,
      Collections.conversations,
      convoId,
      Collections.conversationMembers,
      userId
    );

    const newUpdates = changeLastInteractionDate
      ? {
          state: newState,
          lastUpdatedDate: serverTimestamp(),
          lastInteractionDate: serverTimestamp(),
        }
      : {
          state: newState,
          lastUpdatedDate: serverTimestamp(),
        };

    await setDoc(docRef, newUpdates, { merge: true });
  }
}
