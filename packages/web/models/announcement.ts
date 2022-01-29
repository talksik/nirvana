import { Timestamp } from "firebase/firestore";

export default class Announcement {
  id: string;
  teamId: string;
  audioDataUrl: string; // link to cloud storage file

  state: AnnouncementState = AnnouncementState.active;

  createdByUserId: string;
  createdDate: Timestamp;
  lastUpdatedDate: Timestamp;

  constructor(_audioUrl: string, _teamId: string, _createdByUserId: string) {
    this.audioDataUrl = _audioUrl;
    this.createdByUserId = _createdByUserId;
    this.teamId = _teamId;
  }
}

export enum AnnouncementState {
  active = "active",
  resolved = "resolved",
  deleted = "deleted",
}
