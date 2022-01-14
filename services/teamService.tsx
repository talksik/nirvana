import { addDoc, collection, doc, DocumentReference, Firestore, getFirestore, serverTimestamp } from 'firebase/firestore'
import { Team } from '../models/team'
import { TeamMember, TeamMemberRole, TeamMemberStatus } from '../models/teamMember'
import { Collections } from './collections'
import IService from './IService'

export default class TeamService implements IService {
  db : Firestore = getFirestore()

  async createTeam(team: Team): Promise<string> {
    // create team
    const teamDocRef = await addDoc(collection(this.db, Collections.teams), {
      ...team,
      createdDate: serverTimestamp()
    })

    const teamMember = new TeamMember()
    teamMember.role = TeamMemberRole.admin
    teamMember.teamId = teamDocRef.id
    teamMember.userId = team.createdByUserId
    teamMember.status = TeamMemberStatus.activated

    // create team member as admin who created the team
    const teamMemberRef = await addDoc(collection(this.db, Collections.teamMembers), {
      ...teamMember,
      createdDate: serverTimestamp()
    })

    console.log('created team')

    return teamDocRef.id
  }
}