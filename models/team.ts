import { Timestamp } from "firebase/firestore";

export class Team {
  id: string;
  name:string;

  status: TeamStatus;

  allowedUserCount:number;

  createdBy: string;
  createdDate: Timestamp;

  lastUpdatedDate: Timestamp;
}

export enum TeamStatus {
  created = "created",
  deactivated = "deactivated",
  deleted = "deleted"
}