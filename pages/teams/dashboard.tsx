
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAuth } from '../../contexts/authContext'

export default function Dashboard() {
  const { currUser, logOut } = useAuth()
  const router = useRouter()

  console.log("in dashboard " + currUser)

  useEffect(() => {
    // if not authed, go to home    
    if (!currUser) {
      console.log('not authenticated...routing from dashboard to teams home')
      router.push('/teams')
    }
  }, [currUser])

  async function handleSignOut() {
    console.log("clicked log out button")

    try {
      await logOut()

      router.push('/teams')
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1 className='text-white'>This is the dashboard</h1>
      <button onClick={handleSignOut} className='mt-10 text-sm text-orange-500 font-semibold py-1 px-4 bg-orange-200 rounded'>👋 Logout</button>
    </div>
  )
}