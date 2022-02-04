import { User as FirebaseUser } from "@firebase/auth";
import Conversation, {
  ConversationMember,
  AudioClip,
  Link,
  ConversationMemberState,
} from "@nirvana/common/models/conversation";
import { User as NirvanaUser } from "@nirvana/common/models/user";
import { userService } from "@nirvana/common/services";

import { atom, DefaultValue, selector, selectorFamily } from "recoil";
import {
  today,
  yesterday,
  Days7Ago,
  earlierThisMonth as earlyMonthDate,
} from "@nirvana/common/helpers/dateTime";

export enum RecoilActions {
  TEST = "TEST",

  CURR_PAGE_PATH = "CURR_PAGE_PATH",

  ALL_COMPLETE_CONVERSATIONS = "ALL_COMPLETE_CONVERSATIONS",
  ALL_USERS_CONVERSATION_RELATIONSHIPS = "ALL_USERS_CONVERSATION_RELATIONSHIPS",
  ALL_RELEVANT_CONVERSATIONS = "ALL_RELEVANT_CONVERSATIONS",

  SORTED_CONVERSATIONS = "SORTED_CONVERSATIONS",
  LIVE_ROOMS = "LIVE_ROOMS",
  RELATIVE_TIME_SECTIONS_CONVOS = "RELATIVE_TIME_SECTIONS_CONVOS",

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
import { earlierThisMonth } from "@nirvana/common/helpers/dateTime";

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

      if (a.lastActivityDate.toDate() > b.lastActivityDate.toDate()) {
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

export enum RelativeTimeConvosSections {
  today = "TODAY",

  last7Days = "LAST 7 DAYS",

  earlierThisMonth = "EARLIER THIS MONTH",

  oldJunk = "OLD JUNK",
}

// map from the section title to the list of conversations, all sorted desc lastActivity date
export const RelativeTimeSeparatedConvosSelector = selector<
  Map<RelativeTimeConvosSections, Conversation[]>
>({
  key: RecoilActions.RELATIVE_TIME_SECTIONS_CONVOS,
  get: ({ get }) => {
    const sortedConvos = get(sortedRoomSelector);

    // find the convos where the user convo membership state is "inbox" or default
    const userMemberMap = get(allUsersConversationsAtom);

    // inbox/default Convos: already sorted
    const defaultConvos = sortedConvos.filter((convo) => {
      return (
        userMemberMap.get(convo.id)?.state == ConversationMemberState.default &&
        !convo.membersInLiveRoom?.length
      );
    });

    // go through these and organize in the different sections

    const organizedMapRelConvos = new Map<
      RelativeTimeConvosSections,
      Conversation[]
    >(new Map());

    // putting in sections in map so we can just add later
    organizedMapRelConvos.set(
      RelativeTimeConvosSections.today,
      [] as Conversation[]
    );
    organizedMapRelConvos.set(
      RelativeTimeConvosSections.last7Days,
      [] as Conversation[]
    );
    organizedMapRelConvos.set(
      RelativeTimeConvosSections.earlierThisMonth,
      [] as Conversation[]
    );
    organizedMapRelConvos.set(
      RelativeTimeConvosSections.oldJunk,
      [] as Conversation[]
    );

    defaultConvos.map((convo) => {
      let sectionForConvo = RelativeTimeConvosSections.today;

      // put it in the junk with this
      if (!convo.lastActivityDate) {
        sectionForConvo = RelativeTimeConvosSections.oldJunk;
      } else if (convo.lastActivityDate.toDate() > yesterday) {
        sectionForConvo = RelativeTimeConvosSections.today;
      } else if (convo.lastActivityDate.toDate() > Days7Ago) {
        sectionForConvo = RelativeTimeConvosSections.last7Days;
      } else if (convo.lastActivityDate.toDate() > earlyMonthDate) {
        sectionForConvo = RelativeTimeConvosSections.earlierThisMonth;
      } else {
        sectionForConvo = RelativeTimeConvosSections.oldJunk;
      }

      const currValInSection = organizedMapRelConvos.get(sectionForConvo);

      // already set, but just making sure
      if (currValInSection) {
        organizedMapRelConvos.set(sectionForConvo, [
          ...currValInSection,
          convo,
        ]);
      }
    });

    return organizedMapRelConvos;
  },
});

// map cache of all relevant users
// get all of the users in all of the conversations, once through a simple service call
export const allRelevantContactsAtom = atom<Map<string, NirvanaUser>>({
  key: RecoilActions.ALL_RELEVANT_CONTACTS,
  default: new Map<string, NirvanaUser>(),
});

// todo: useful selector where a component can pass in a list of users
// and return their full information...either get from cache if there or fetch from database if not and update cache
