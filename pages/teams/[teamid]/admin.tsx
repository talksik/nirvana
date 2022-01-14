import { useRouter } from 'next/router'

export default function TeamAdmin() {
  const router = useRouter()
  const { teamid } = router.query

  // check if the team is a valid team route and show the dashboard for the team

  return (
    <span>this is the admin page for team: {teamid}</span>
  )
}