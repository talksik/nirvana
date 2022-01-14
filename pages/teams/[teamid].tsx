import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BackgroundLayout from '../../components/Layouts/BackgroundLayout'
import { useAuth } from '../../contexts/authContext'
import { Team } from '../../models/team'
import { TeamMemberStatus } from '../../models/teamMember'
import TeamService from '../../services/teamService'

const teamService = new TeamService()

export default function TeamDashboard() {
  const { currUser } = useAuth()
  const router = useRouter()
  const { teamid } = router.query

  const [loading, setLoading] = useState<Boolean>(true)
  const [team, setTeam] = useState<Team>(null)

  useEffect(() => {
    (async function() {
      try {
        // if not authenticated, take user to the login
        if (!currUser) {
          console.log('not authenticated...routing from dashboard to teams home')
          router.push('/teams/login')
          return
        }

        if (typeof teamid !== "string") {
          console.log('not a proper query with teamid')
          router.push('/teams')
          return
        }

        // check if the team is a valid team and that user is in it
        const returnedTeam = await teamService.getTeam(teamid)
        if (!returnedTeam) {
          console.log('team doesnt exist')
          router.push('/teams')
          return
        }

        const returnedTeamMember = await teamService.getTeamMemberByUserId(teamid, currUser.uid)          

        console.log(returnedTeam)
        console.log(returnedTeamMember)

        //  if you are not a member of this team, then get out of here
        //   but have to check through email invite and userid
        if (returnedTeamMember && returnedTeamMember.status == TeamMemberStatus.deleted) {
          console.log('user was deleted from team')
          router.push('/teams')
          return
        }

        // if there is no team member through user id,
        // give him last chance and see if he was invited
        if (!returnedTeamMember) {
          const invitedTeamMember = await teamService.getTeamMemberByEmailInvite(teamid, currUser.email)

          if (!invitedTeamMember) {
            console.log('not invited to team either')
            router.push('/teams')
            return 
          }

          // if I am new to the team but I was invited, and this is my first time, then activate me into the team
          // and proceed with showing the dashboard stuff

          invitedTeamMember.status = TeamMemberStatus.activated
          invitedTeamMember.userId = currUser.uid
          await teamService.updateTeamMember(invitedTeamMember)
        }
      } catch(error) {
        console.log(error)
        router.push('/teams/login')
      }

      setLoading(false)
    })();
  }, [])

  if (loading) {
    return (
      <div>loading</div> 
    )
  }

  return (
    <BackgroundLayout>
      the team is {teamid}
      
    
    </BackgroundLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // basic check if this team exists

  // todo check if authenticated

  // todo check if this user is in this team

  return {
    props: {},
  }
}