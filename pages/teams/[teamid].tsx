import { useRouter } from 'next/router'

export default function Team() {
  const router = useRouter()
  const { teamid } = router.query

  // check if the team is a valid team route and show the dashboard for the team

  return (
    <span>the team is {teamid}</span>
  )
}