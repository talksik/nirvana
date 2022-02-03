import Conversation, {
  ConversationMember,
} from "@nirvana/common/models/conversation";
import Collections from "@nirvana/common/services/collections";
import {
  collection,
  collectionGroup,
  doc,
  getFirestore,
  onSnapshot,
  query,
  Unsubscribe,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { useAuth } from "../contexts/authContext";
import { allRelevantConversations, allUsersConversations } from "./main";

const db = getFirestore();

export default function MainRecoilDataHandler() {
  const { currUser } = useAuth();

  const [userConvos, setUserConvos] = useRecoilState(allUsersConversations);
  const [relevantConvos, setRelevantConvos] = useRecoilState(
    allRelevantConversations
  );

  useEffect(() => {
    const unsubs: Unsubscribe[] = [] as Unsubscribe[];

    const convoSubs: Unsubscribe[] = [] as Unsubscribe;

    (async function () {
      try {
        // get all conversations that I am a part of
        const q = query(
          collectionGroup(db, Collections.conversationMembers),
          where("id", "==", currUser.uid)
        );
        const unsubscribeUserConvoMember = onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added" || change.type === "modified") {
              const newConvoMember: ConversationMember =
                change.doc.data() as ConversationMember;
              newConvoMember.id = change.doc.id;
              console.log("modified convo member found: ", change.doc.data());

              // update all user convo associations
              setUserConvos((prevMap) => {
                return new Map(prevMap.set(newConvoMember.id, newConvoMember));
              });

              // if we are adding a new convo relevant to me, then start a convo listener for this convo
              const convoId = change.doc.ref.parent.parent?.id;

              console.log(convoId);
              if (change.type === "added" && convoId) {
                const unsubConvo = onSnapshot(
                  doc(db, Collections.conversations, convoId),
                  (convoDoc) => {
                    const updatedConvo = convoDoc.data() as Conversation;
                    console.log("got convo data and subscribed");
                    console.log(updatedConvo);

                    setRelevantConvos((prevMap) => {
                      return new Map(prevMap.set(convoId, updatedConvo));
                    });
                  }
                );

                // todo : remove specific listeners if they are no longer priority conversations

                unsubs.push(unsubConvo);
              }
            }
            if (change.type === "removed") {
              console.log("Removed convo member: ", change.doc.data());
            }
          });
        });

        unsubs.push(unsubscribeUserConvoMember);
      } catch (error) {
        console.log(error);
        toast.error("Problem in retrieving data");
      }
    })();

    return () => {
      unsubs.forEach((unsub) => {
        unsub();
      });
    };
  }, []);

  return <></>;
}
