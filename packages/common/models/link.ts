import { Timestamp } from "firebase/firestore";

export default class Link {
  id: string;
  name: string;
  description: string;
  link: string; //url for file

  state: LinkState = LinkState.active;
  type: LinkType;

  teamId: string;
  // if it's not a teamAttachment, then have a list of members who it's for
  recipients: string[]; // userIds

  createdByUserId: string;
  createdDate: Timestamp;

  constructor(
    _name: string,
    _description: string,
    _link: string,
    _teamId: string,
    recipientsArr: string[],
    _createdByUserId: string
  ) {
    this.name = _name;
    this.description = _description;
    this.link = _link;
    this.teamId = _teamId;
    this.recipients = recipientsArr;
    this.createdByUserId = _createdByUserId;

    if (!recipientsArr || recipientsArr?.length == 0) {
      this.recipients = null;
    } else {
      this.recipients = recipientsArr;
    }

    this.type = Link.getLinkType(_link);
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

export enum LinkState {
  active = "active",
  archived = "archived",
  deleted = "deleted",
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
