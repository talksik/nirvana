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
import { useRecoilState, useSetRecoilState } from "recoil";
import { useAuth } from "../contexts/authContext";
import {
  allRelevantContactsAtom,
  allRelevantConversationsAtom,
  allUsersConversationsAtom,
  cachedRelevantContactsSelector,
  nirvanaUserDataAtom,
} from "./main";

import { firestoreDb as db } from "../services/firebaseService";
import { userService } from "@nirvana/common/services";

export default function MainRecoilDataHandler() {
  const { currUser } = useAuth();
  const [nirvanaUser, setNirvanaUser] = useRecoilState(nirvanaUserDataAtom);

  const [userConvos, setUserConvos] = useRecoilState(allUsersConversationsAtom);
  const [relevantConvos, setRelevantConvos] = useRecoilState(
    allRelevantConversationsAtom
  );

  const [relContacts, setRelContacts] = useRecoilState(allRelevantContactsAtom);

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
              // if we are adding a new convo relevant to me, then start a convo listener for this convo
              const convoId = change.doc.ref.parent.parent!.id;

              // update all user convo associations
              setUserConvos((prevMap) => {
                return new Map(prevMap.set(convoId, newConvoMember));
              });

              // if we are adding a new convo relevant to me, then start a convo listener for this convo

              // find if this is a done, later, or inbox, and only add listeners accordingly
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

          // build user's cache
          let allUsersToCache: string[] = [] as string[];

          arrayConvos.forEach((currconvo) => {
            allUsersToCache = [...allUsersToCache, ...currconvo.activeMembers];
          });

          console.log(
            "going to try caching a bunch of users...maybe some duplicates",
            allUsersToCache
          );

          // if this userId is in the contacts map, then cool
          // otherwise fetch with userService

          allUsersToCache.map(async (oUser) => {
            if (
              relContacts.has(oUser) &&
              relContacts.get(oUser) instanceof User
            ) {
              // do nothing

              console.log("user already cached, no need to re-cache");
            } else {
              // otherwise, fetch document from firestore and then set the cache
              const retrievedUser = await userService.getUser(oUser);
              console.log("fetching user to add to cache");

              if (retrievedUser) {
                setRelContacts(new Map(relContacts.set(oUser, retrievedUser)));
              }
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
