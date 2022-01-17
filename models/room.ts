import { Timestamp } from "firebase/firestore";

export default class Room {
  id: string;

  name: string;
  description: string;

  link: string; // google meet link for now

  members: string[]; //userIds of "mandatory"/invited people including the person who created it

  membersInRoom: string[];

  attachments: string[]; // the links themselves (NOT Ids)...there will be duplicate entries in the attachments table which will be created

  type: RoomType;

  approximateDateTime: string; // vaguely say when the meeting should be...give user pointers

  createdDate: Timestamp;
  createdByUserId: string;

  teamId: string;
}

export enum RoomType {
  now = "now",
  scheduled = "scheduled", // one time sort of standard meeting
  recurring = "recurring", //daily standup
  archived = "archived", // this room is dead or over
}
