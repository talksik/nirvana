import { User as FirebaseUser } from "@firebase/auth";
import Conversation, {
  ConversationMember,
  AudioClip,
  Link,
} from "@nirvana/common/models/conversation";
import { User as NirvanaUser } from "@nirvana/common/models/user";
import { userService } from "@nirvana/common/services";

import { atom, DefaultValue, selector, selectorFamily } from "recoil";

export enum RecoilActions {
  TEST = "TEST",

  CURR_PAGE_PATH = "CURR_PAGE_PATH",

  ALL_COMPLETE_CONVERSATIONS = "ALL_COMPLETE_CONVERSATIONS",
  ALL_USERS_CONVERSATION_RELATIONSHIPS = "ALL_USERS_CONVERSATION_RELATIONSHIPS",
  ALL_RELEVANT_CONVERSATIONS = "ALL_RELEVANT_CONVERSATIONS",

  SORTED_CONVERSATIONS = "SORTED_CONVERSATIONS",
  LIVE_ROOMS = "LIVE_ROOMS",

  ALL_RELEVANT_CONTACTS = "ALL_RELEVANT_CONTACTS",
  RELEVANT_CONTACTS_SELECTOR_CACHE = "RELEVANT_CONTACTS_SELECTOR_CACHE",

  USER_DATA = "USER_DATA",
}

export const nirvanaUserDataAtom = atom<NirvanaUser | null>({
  key: RecoilActions.ALL_COMPLETE_CONVERSATIONS,
  default: null,
});

// testing if we can import data in server side, but since it's next js we need firebase calls in client side
// import { conversationService } from "@nirvana/common/services";

// const getTest = (async () => await conversationService.test())();

// export const test = atom({
//   key: RecoilActions.TEST, // unique ID (with respect to other atoms/selectors)
//   default: getTest, // default value (aka initial value)
// });

// approach: fill in all "bottom" level atoms, and then build the tree later with selectors
// convo id -> userMember object
export const allUsersConversationsAtom = atom({
  key: RecoilActions.ALL_USERS_CONVERSATION_RELATIONSHIPS,
  default: new Map<string, ConversationMember>(),
});

export const allRelevantConversationsAtom = atom({
  key: RecoilActions.ALL_RELEVANT_CONVERSATIONS,
  default: new Map<string, Conversation>(),
  effects: [
    ({ onSet }) => {
      onSet((newMap) => {
        //go through and make sure that our relevant user's cache is up to date
        //  const allUsersInConvos = newMap.values()
      });
    },
  ],
});

export const sortedRoomSelector = selector<Conversation[]>({
  key: RecoilActions.SORTED_CONVERSATIONS,
  get: ({ get }) => {
    const relConvos = get(allRelevantConversationsAtom);
    const convosArr: Conversation[] = Array.from(relConvos.values());

    convosArr.sort((a, b) => {
      if (!a.lastActivityDate) {
        return -1;
      }
      if (!b.lastActivityDate) {
        return 1;
      }

      if (a.lastActivityDate > b.lastActivityDate) {
        return 1;
      }

      return -1;
    });

    return convosArr;
  },
});

// selectors for convos: inbox/default, live, later, done, priority

// get all rooms with active members in the room
export const liveRoomsSelector = selector<Conversation[]>({
  key: RecoilActions.LIVE_ROOMS,
  get: ({ get }) => {
    const sortedConvos = get(sortedRoomSelector);
    const liveRooms = sortedConvos.filter(
      (conv) => conv.membersInLiveRoom?.length > 0
    );

    return liveRooms;
  },
});

// map cache of all relevant users
// get all of the users in all of the conversations, once through a simple service call
export const allRelevantContactsAtom = atom<Map<string, NirvanaUser>>({
  key: RecoilActions.ALL_RELEVANT_CONTACTS,
  default: new Map<string, NirvanaUser>(),
});

// todo: useful selector where a component can pass in a list of users
// and return their full information
export const cachedRelevantContactsSelector = selector<string[]>({
  key: RecoilActions.RELEVANT_CONTACTS_SELECTOR_CACHE,
  get: async ({ get }) => {
    return [];
  },
  // selector set (pass in a user and build cache if somethings not in the cache already)
  set: async ({ set, get }, listUserIdsToCache: string[]) => {
    if (listUserIdsToCache instanceof DefaultValue) {
      // set(newUserToCache)
      return;
    }

    const contactsMap = get(allRelevantContactsAtom);
  },
});
