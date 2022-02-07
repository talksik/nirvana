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
import Conversation, {
  AudioClip,
  ConversationMember,
  ConversationMemberState,
} from "../models/conversation";
import Collections from "./collections";
import { cloudStorageService } from "./index";

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

  async sendAudioClip(
    createdByUserId: string,
    audioMp3File: File,
    convoId: string
  ) {
    // upload to cloud storage
    const downloadUrl = await cloudStorageService.uploadMessageAudioFile(
      audioMp3File
    );
    const newAudioClip = new AudioClip(downloadUrl, createdByUserId);
    newAudioClip.audioDataUrl = downloadUrl;

    const audioClipRef = doc(
      this.db,
      Collections.conversations,
      convoId,
      Collections.conversationAudioClips,
      newAudioClip.id
    );

    const conversationDoc = doc(this.db, Collections.conversations, convoId);
    const userConvoAssocDoc = doc(
      this.db,
      Collections.conversations,
      convoId,
      Collections.conversationMembers,
      createdByUserId
    );

    await runTransaction(this.db, async (transaction) => {
      // want to add to the long term collection of all audio clips for a conversation
      transaction.set(
        audioClipRef,
        { ...newAudioClip, createdDate: serverTimestamp() },
        { merge: true }
      );

      // want to make updates to the conversation document itself: set the last item for just the basic information to be
      // published to users
      transaction.set(
        conversationDoc,
        {
          lastActivityDate: serverTimestamp(),
          cachedAudioClip: { ...newAudioClip, createdDate: serverTimestamp() },
        },
        { merge: true }
      );

      // update the user's convo assoc so that their last interaction was set properly
      transaction.set(
        userConvoAssocDoc,
        {
          lastInteractionDate: serverTimestamp(),
        },
        { merge: true }
      );
    });
  }

  async updateTldr(convoId: string, newTldr: string, updateUserId: string) {
    // todo make sure that this user is allowed to update it
    const docRef = doc(this.db, Collections.conversations, convoId);
    await setDoc(
      docRef,
      {
        tldr: newTldr,
        lastActivityDate: serverTimestamp(),
        lastUpdatedBy: updateUserId,
      },
      { merge: true }
    );

    return false;
  }
}
