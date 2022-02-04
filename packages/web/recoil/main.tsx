import { User as FirebaseUser } from "@firebase/auth";
import Conversation, {
  ConversationMember,
  AudioClip,
  Link,
} from "@nirvana/common/models/conversation";
import { User as NirvanaUser } from "@nirvana/common/models/user";

import { atom, selector } from "recoil";

export enum RecoilActions {
  TEST = "TEST",

  CURR_PAGE_PATH = "CURR_PAGE_PATH",

  ALL_COMPLETE_CONVERSATIONS = "ALL_COMPLETE_CONVERSATIONS",
  ALL_USERS_CONVERSATION_RELATIONSHIPS = "ALL_USERS_CONVERSATION_RELATIONSHIPS",
  ALL_RELEVANT_CONVERSATIONS = "ALL_RELEVANT_CONVERSATIONS",

  SORTED_CONVERSATIONS = "SORTED_CONVERSATIONS",
  LIVE_ROOMS = "LIVE_ROOMS",

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

export class CompleteConversation {
  id: string; // conversation id

  get isLive(): boolean {
    return this.members?.length > 0;
  }

  // method/property for knowing if this there is a new activity for me in this conversation

  // method/property for getting the latest link if valid

  // method/property to get the latest convo chunk/last person talking

  conversation: Conversation;

  constructor(convo: Conversation) {
    this.conversation = convo;
    this.id = this.conversation.id;
  }

  userMember?: ConversationMember;

  members: ConversationMember[] = [] as ConversationMember[];
  audioClips: AudioClip[] = [] as AudioClip[];
  links: Link[] = [] as Link[];
}

// map cache of all complete conversation objects
export const allCompleteConversations = atom({
  key: RecoilActions.ALL_COMPLETE_CONVERSATIONS,
  default: new Map<string, CompleteConversation>(),
});

// map cache of all relevant users

// selector for the convos that have members in the live room

// selectors for convos: inbox/default, live, later, done, priority

// approach: fill in all "bottom" level atoms, and then build the tree later with selectors
export const allUsersConversations = atom({
  key: RecoilActions.ALL_USERS_CONVERSATION_RELATIONSHIPS,
  default: new Map<string, ConversationMember>(),
});

export const allRelevantConversations = atom({
  key: RecoilActions.ALL_RELEVANT_CONVERSATIONS,
  default: new Map<string, Conversation>(),
});

export const sortedRoomSelector = selector<Conversation[]>({
  key: RecoilActions.SORTED_CONVERSATIONS,
  get: ({ get }) => {
    const relConvos = get(allRelevantConversations);
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

// get all rooms with active members in the room, and
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
