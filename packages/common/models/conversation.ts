import { v4 as uuid } from "uuid";
import { Timestamp } from "firebase/firestore";

export default class Conversation {
  id: string = uuid();

  name: string; // engineering, general, arjun, jacob and rachel...

  lastActivityDate: Timestamp = Timestamp.now(); // caching this for purpose of saving on listeners

  activeMembers: string[]; // userIds
  membersInLiveRoom: string[] = [] as string[]; // all members in a live call right now for this convo

  cachedAudioClip?: AudioClip; // last message pretty much
  cachedDrawerItem?: Link; // last link pretty much

  tldr?: string; // description almost that people keep up to day in the convo

  createdDate: Timestamp = Timestamp.now();
  createdByUserId: string;

  constructor(
    _createdByUserId: string,
    _name: string,
    _initialUsers: string[] = [] as string[],
    _tldr?: string
  ) {
    this.name = _name;
    this.createdByUserId = _createdByUserId;
    this.activeMembers = _initialUsers;

    if (_tldr) {
      this.tldr = _tldr;
    }
  }
}

export class ConversationMember {
  id: string; // will be the userId
  state: ConversationMemberState;

  role: ConversationMemberRole;

  createdDate: Timestamp = Timestamp.now();
  lastUpdatedDate?: Timestamp;
  lastInteractionDate?: Timestamp;

  constructor(
    _userId: string,
    _state: ConversationMemberState,
    _role: ConversationMemberRole
  ) {
    this.id = _userId;
    this.state = _state;
    this.role = _role;
  }
}

export enum ConversationMemberRole {
  admin = "admin",
  member = "member",
  attendee = "attendee", // for future when only execs or higher ups want to talk in an async chat
}

export enum ConversationMemberState {
  inbox = "inbox",
  default = "default",
  priority = "priority",
  later = "later",
  done = "done",
  blocked = "removed", // blocked from the conversation now
}

export class AudioClip {
  id: string = uuid();

  audioDataUrl?: string;

  senderUserId: string;
  createdDate: Timestamp = Timestamp.now();

  constructor(_audioDataurl: string, _senderUserId: string) {
    this.audioDataUrl = _audioDataurl;
    this.senderUserId = _senderUserId;
  }
}

export class Link {
  id: string = uuid();

  url: string;
  name: string;
  type: LinkType;

  createdByUserId: string;
  createdDate: Timestamp = Timestamp.now();

  constructor(_name: string, _linkUrl: string, _senderUserId: string) {
    this.createdByUserId = _senderUserId;
    this.url = _linkUrl;
    this.name = _name;
    this.type = Link.getLinkType(_linkUrl);
  }

  static getLinkType(url: string): LinkType {
    if (url.includes(LinkType.github)) {
      return LinkType.github;
    } else if (url.includes(LinkType.atlassian)) {
      return LinkType.atlassian;
    } else if (
      url.includes(LinkType.googleDrive) ||
      url.includes("docs.google")
    ) {
      return LinkType.googleDrive;
    } else if (
      url.includes(".png") ||
      url.includes(".jpg") ||
      url.includes(".svg") ||
      url.includes(".gif") ||
      url.includes(LinkType.pastePics)
    ) {
      return LinkType.image;
    } else if (url.includes(LinkType.pdf)) {
      return LinkType.pdf;
    } else if (url.includes(LinkType.codePile)) {
      return LinkType.codePile;
    } else {
      return LinkType.default;
    }
  }
}

export enum LinkType {
  default = "default",
  github = "github",
  atlassian = "atlassian",
  googleDrive = "drive.google",
  onedrive = "onedrive",
  image = "image",
  pdf = "pdf",
  codePile = "codepile",
  pastePics = "paste.pics",
  googleMeet = "googleMeet",
}
