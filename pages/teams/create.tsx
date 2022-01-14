import { Divider } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { User, UserStatus } from "../../models/user";

const initialSite: string = 'https://'
export default function CreateTeam() {
  const { currUser, logOut } = useAuth()
  const [error, setError] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    (async function() {
      try {
        // if not authenticated, take user to the login
        if (!currUser) {
          console.log('not authenticated...routing from dashboard to teams home')
          // router.push('/teams/login')
        }

      } catch(error) {
        console.log(error)
        router.push('/teams/login')
      }
    })();
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    if (!teamName) {
      setError('You must input a team name!')
    }

    if (companySite == initialSite) {
      // make sure to put null in database for the team
    }

    // provision a team with state of initiated
  }

  const [teamName, setTeamName] = useState<string>('')
  const [companySite, setcompanySite] = useState<string>(initialSite)

  return (
    <form 
      className="container mx-auto flex flex-col max-w-md m-10 bg-white p-10 rounded-lg shadow-md space-y-5"
      onSubmit={handleSubmit}  
    >
      {/* header */}
      <div className="text-lg">🙌Create a Team</div>

      {
        error && <span className="text-red-300 text-md">{error}</span>
      }

      <Divider />

      <span className="flex flex-col items-start">
        <span className="text-md">Team Name</span>
        <span className="text-gray-300 text-xs mb-2">Everyone in your team will see this. You can always change this later.</span>
        <input placeholder="ex. AirBnB" className="w-full rounded-lg bg-gray-50 p-3" value={teamName} onChange={e => setTeamName(e.target.value)} />        
      </span>

      <span className="flex flex-col items-start">
        <span className="text-md">Company Site</span>
        <span className="text-gray-300 text-xs mb-2">optional</span>
        <input placeholder="ex. https://" className="w-full rounded-lg bg-gray-50 p-3" value={companySite} onChange={e => setcompanySite(e.target.value)} />        
      </span>

      <Divider />

      <span className="flex flex-row justify-end space-x-2">
        <button onClick={() => router.push('/teams') } className="bg-gray-100 py-2 px-5 rounded text-gray-400">Cancel</button>                
        <button type="submit" className='text-sm text-white font-semibold py-2 px-5 bg-teal-500 rounded'>
          {'Continue ->'}
        </button>
      </span>
    </form>
  )
}