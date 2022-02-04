import Conversation, {
  ConversationMember,
} from "@nirvana/common/models/conversation";
import { User } from "@nirvana/common/models/user";
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
import { useRecoilState, useRecoilValue } from "recoil";
import { useAuth } from "../contexts/authContext";
import {
  allRelevantConversations,
  allUsersConversations,
  nirvanaUserDataAtom,
} from "./main";

const db = getFirestore();

export default function MainRecoilDataHandler() {
  const { currUser } = useAuth();
  const [nirvanaUser, setNirvanaUser] = useRecoilState(nirvanaUserDataAtom);

  const [userConvos, setUserConvos] = useRecoilState(allUsersConversations);
  const [relevantConvos, setRelevantConvos] = useRecoilState(
    allRelevantConversations
  );

  useEffect(() => {
    const unsubs: Unsubscribe[] = [] as Unsubscribe[];

    (async function () {
      try {
        // get all conversations that I am a part of
        const q = query(
          collectionGroup(db, Collections.conversationMembers),
          where("id", "==", currUser?.uid)
        );
        const unsubscribeUserConvoMember = onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            const newConvoMember: ConversationMember =
              change.doc.data() as ConversationMember;
            newConvoMember.id = change.doc.id;

            if (change.type === "added" || change.type === "modified") {
              // update all user convo associations
              setUserConvos((prevMap) => {
                return new Map(prevMap.set(newConvoMember.id, newConvoMember));
              });

              // if we are adding a new convo relevant to me, then start a convo listener for this convo
              const convoId = change.doc.ref.parent.parent?.id;

              // find if this is a done, later, or inbox, and only add listeners accordingly
              console.log(convoId);
              // if (change.type === "added" && convoId) {
              //   const unsubConvo = onSnapshot(
              //     doc(db, Collections.conversations, convoId),
              //     (convoDoc) => {
              //       const updatedConvo = convoDoc.data() as Conversation;
              //       console.log("got convo data and subscribed");
              //       console.log(updatedConvo);

              //       setRelevantConvos((prevMap) => {
              //         return new Map(prevMap.set(convoId, updatedConvo));
              //       });
              //     }
              //   );

              //   // todo : remove specific listeners if they are no longer priority conversations

              //   unsubs.push(unsubConvo);
              // }
            }
            if (change.type === "removed") {
              console.log("Removed convo member: ", change.doc.data());
            }
          });
        });

        unsubs.push(unsubscribeUserConvoMember);

        // get my current user profile and stay updated to my status
        const unsubUser = onSnapshot(
          doc(db, Collections.users, currUser!.uid),
          (doc) => {
            const nirvanaUser = doc.data() as User;
            setNirvanaUser(nirvanaUser);
          }
        );
        unsubs.push(unsubUser);

        // get every conversation where I am in the activeMembers list
        const convoQuery = query(
          collection(db, Collections.conversations),
          where("activeMembers", "array-contains", currUser!.uid)
        );
        const unsubConvosListener = onSnapshot(convoQuery, (snapshot) => {
          const arrayConvos: Conversation[] = [];
          snapshot.docChanges().forEach((change) => {
            const newOrUpdatedConvo: Conversation =
              change.doc.data() as Conversation;
            newOrUpdatedConvo.id = change.doc.id;

            if (change.type === "added" || change.type === "modified") {
              arrayConvos.push(newOrUpdatedConvo);
            }
            if (change.type === "removed") {
              // todo: if convo was removed for me, then take out of array
              // arrayConvos.filter()
            }
          });

          // add to the main convos atom, by modifying the current map
          setRelevantConvos((prevConvosMap) => {
            const newMap = new Map(prevConvosMap);
            arrayConvos.forEach((currconvo) => {
              newMap.set(currconvo.id, currconvo);
            });

            console.log("updated convos: ", newMap);

            return newMap;
          });
        });
        unsubs.push(unsubConvosListener);
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
