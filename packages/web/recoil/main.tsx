import Conversation, {
  ConversationMember,
  AudioClip,
  Link,
} from "@nirvana/common/models/conversation";

import { atom } from "recoil";

export enum RecoilActions {
  CURR_PAGE_PATH = "CURR_PAGE_PATH",
  ALL_COMPLETE_CONVERSATIONS = "ALL_COMPLETE_CONVERSATIONS",
  ALL_USERS_CONVERSATION_RELATIONSHIPS = "ALL_USERS_CONVERSATION_RELATIONSHIPS",
  ALL_RELEVANT_CONVERSATIONS = "ALL_RELEVANT_CONVERSATIONS",
}

// export const currPagePath = atom({
//   key: RecoilActions.CURR_PAGE_PATH, // unique ID (with respect to other atoms/selectors)
//   default: "/s", // default value (aka initial value)
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
