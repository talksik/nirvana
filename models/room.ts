export default class Room {
  id: string;

  title: string;
  subtitle: string;

  roomLink: string; // google meet link for now

  roomMembers: string[]; //userIds of "mandatory"/invited people including the person who created it

  attachments: string[]; // the links themselves (NOT Ids)...there will be duplicate entries in the attachments table which will be created

  roomType: RoomType;

  approximateDateTime: string; // vaguely say when the meeting should be...give user pointers
}

enum RoomType {
  now = "now",
  scheduled = "scheduled", // one time sort of standard meeting
  recurring = "recurring", //daily standup
}
