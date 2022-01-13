
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAuth } from '../../contexts/authContext'

export default function Dashboard() {
  const { currUser, signOut } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    // if not authed, go to home    
    if (!currUser) {
      console.log('routing from dashboard to teams home')
      router.push('/teams')
    }
  }, [])

  return (
    <div>
      <h1 className='text-white'>This is the dashboard</h1>
      <button onClick={signOut} className='mt-10 text-sm text-orange-500 font-semibold py-1 px-4 bg-orange-200 rounded'>👋 Logout</button>
    </div>
  )
}