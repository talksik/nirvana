export class TeamMember {
  id: string;
  userId: string;
  teamId: string;

  inviteEmailAddress: string;
  invitedByUserId: string;
  
  role: TeamMemberRole
  status: TeamMemberStatus 
}

export enum TeamMemberRole {
  admin = "admin"
}

export enum TeamMemberStatus {
  invited = "invited",
  activated = "activated",
  deleted = "deleted"
}