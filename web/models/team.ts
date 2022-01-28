import { Timestamp } from "firebase/firestore";

export class Team {
  id: string;
  name: string;

  status: TeamStatus;

  allowedUserCount: number = 2;
  // subscriptionPlan: TeamSubscriptionPlan = TeamSubscriptionPlan.basic

  companySite: string;

  createdByUserId: string;
  createdDate: Timestamp;

  lastUpdatedDate: Timestamp;
}

export enum TeamStatus {
  created = "created",
  deactivated = "deactivated",
  deleted = "deleted",
}

export enum TeamSubscriptionPlan {
  free = "free",
  basic = "basic",
  pro = "pro",
}