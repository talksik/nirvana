import { Timestamp } from "firebase/firestore";

export default class Link {
  id: string;
  name: string;
  description: string;
  link: string; //url for file

  state: AttachmentState = AttachmentState.active;

  isLoomScreenshare: boolean = false;

  teamId: string;
  // if it's not a teamAttachment, then have a list of members who it's for

  createdByUserId: string;
  createdDate: Timestamp;

  constructor(id: string, name: string, description: string) {}
}

export enum AttachmentState {
  active = "active",
  archived = "archived",
}

export enum AttachmentType {
  link = "link",
  screenshare = "",
}
