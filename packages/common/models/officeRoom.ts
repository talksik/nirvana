import { Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default class OfficeRoom {
  id: string = uuidv4();

  teamId: string;

  name: string; // entrance, kitchen, etc.

  createdDate: Timestamp;
  createdByUserId: string;

  lastUpdatedDate: Timestamp;

  members: string[] = []; // id's of users in the office room

  state: OfficeRoomState;

  constructor(
    _name: string,
    _teamId: string,
    _createdBy: string,
    _state: OfficeRoomState = OfficeRoomState.idle
  ) {
    this.name = _name;
    this.teamId = _teamId;
    this.createdByUserId = _createdBy;
    this.state = _state;
  }
}

export enum OfficeRoomState {
  active = "active",
  idle = "idle",
  archived = "archived",
}
