import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { Team } from "../models/team";
import {
  TeamMember,
  TeamMemberRole,
  TeamMemberStatus,
} from "../models/teamMember";
import { Collections } from "./collections";
import IService from "./IService";

export default class TeamService implements IService {
  db: Firestore = getFirestore();

  async createTeam(team: Team): Promise<string> {
    // create team
    const teamDocRef = await addDoc(collection(this.db, Collections.teams), {
      ...team,
      createdDate: serverTimestamp(),
    });

    const teamMember = new TeamMember();
    teamMember.role = TeamMemberRole.admin;
    teamMember.teamId = teamDocRef.id;
    teamMember.userId = team.createdByUserId;
    teamMember.status = TeamMemberStatus.activated;

    // create team member as admin who created the team
    const teamMemberRef = await addDoc(
      collection(this.db, Collections.teamMembers),
      {
        ...teamMember,
        createdDate: serverTimestamp(),
      }
    );

    console.log("created team");

    return teamDocRef.id;
  }

  async getTeam(teamId: string): Promise<Team | null> {
    const docRef = doc(this.db, Collections.teams, teamId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("got team data");
      let team: Team = docSnap.data() as Team;
      team.id = docSnap.id;
      return team;
    } else {
      // doc.data() will be undefined in this case
      console.log("team not found!");

      return null;
    }
  }

  async getTeamMemberByUserId(
    teamId: string,
    userId: string
  ): Promise<TeamMember | null> {
    const q = query(
      collection(this.db, Collections.teamMembers),
      where("teamId", "==", teamId),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 1) {
      console.log(
        "there are multiple teammembers for this user...error in teamservice"
      );
    }

    var teamMember: TeamMember | null = null;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // get the first one and just return...shouldn't be more
      console.log("got teammember data");
      teamMember = doc.data() as TeamMember;

      teamMember.id = doc.id;
    });

    return teamMember;
  }

  async getTeamMemberByEmailInvite(
    teamId: string,
    emailAddress: string
  ): Promise<TeamMember | null> {
    const q = query(
      collection(this.db, Collections.teamMembers),
      where("teamId", "==", teamId),
      where("inviteEmailAddress", "==", emailAddress)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 1) {
      console.log(
        "there are multiple teammembers for this user...error in teamservice"
      );
    }

    var teamMember: TeamMember | null = null;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // get the first one and just return...shouldn't be more
      console.log("got teammember data");
      teamMember = doc.data() as TeamMember;

      teamMember.id = doc.id;
    });

    return teamMember;
  }

  async getTeamMembersByEmailInvite(
    emailAddress: string
  ): Promise<TeamMember[]> {
    const q = query(
      collection(this.db, Collections.teamMembers),
      where("inviteEmailAddress", "==", emailAddress)
    );

    const querySnapshot = await getDocs(q);

    var teamMembers: TeamMember[] = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // get the first one and just return...shouldn't be more
      console.log("got teammember data");
      let teamMember: TeamMember = doc.data() as TeamMember;

      teamMember.id = doc.id;

      teamMembers.push(teamMember);
    });

    return teamMembers;
  }

  async getTeamMembersByUserId(userId: string): Promise<TeamMember[]> {
    const q = query(
      collection(this.db, Collections.teamMembers),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 1) {
      console.log("this user is part of multiple teams");
    }

    var teamMembers: TeamMember[] = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // get the first one and just return...shouldn't be more
      console.log("got teammember data");
      let teamMember: TeamMember = doc.data() as TeamMember;
      teamMember.id = doc.id;

      teamMembers.push(teamMember);
    });

    return teamMembers;
  }

  async getTeamMembersByTeamId(teamId: string): Promise<TeamMember[]> {
    const q = query(
      collection(this.db, Collections.teamMembers),
      where("teamId", "==", teamId)
    );

    const querySnapshot = await getDocs(q);

    var teamMembers: TeamMember[] = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // get the first one and just return...shouldn't be more
      let teamMember: TeamMember = doc.data() as TeamMember;
      teamMember.id = doc.id;

      teamMembers.push(teamMember);
    });

    return teamMembers;
  }

  async updateTeamMember(teamMember: TeamMember) {
    const docRef = doc(this.db, Collections.teamMembers, teamMember.id);
    await setDoc(
      docRef,
      { ...teamMember, lastUpdatedDate: serverTimestamp() },
      { merge: true }
    );
  }

  async createTeamInvite(teamMember: TeamMember) {
    // if a person was already invited, then update that record, otherwise create a new one
    const existingTeamMember = await this.getTeamMemberByEmailInvite(
      teamMember.teamId,
      teamMember.inviteEmailAddress
    );

    if (!existingTeamMember) {
      const teamMemberRef = await addDoc(
        collection(this.db, Collections.teamMembers),
        {
          ...teamMember,
          createdDate: serverTimestamp(),
        }
      );

      return;
    }

    // just update the current user to active since we are activating again
    await this.updateTeamMemberStatus(
      existingTeamMember.id,
      TeamMemberStatus.invited
    );
  }

  async updateTeamMemberStatus(teamMemberId: string, status: TeamMemberStatus) {
    const docRef = doc(this.db, Collections.teamMembers, teamMemberId);
    await setDoc(
      docRef,
      { status, lastUpdatedDate: serverTimestamp() },
      { merge: true }
    );
  }
}
