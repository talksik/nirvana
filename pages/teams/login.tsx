import { useRouter } from 'next/router'
import { useEffect } from 'react';
import {FaGoogle} from "react-icons/fa";
import { useAuth } from '../../contexts/authContext'

export default function Login() {
  const { currUser, signInGoogle } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // if auth, go to dashboard
    if (currUser) {
      console.log('already logged in, redirecting to the dashboard')
      router.push('/teams/dashboard')
    }
  }, [currUser])

  return (
    <div className="container mx-auto max-w-screen-sm bg-white bg-opacity-80 mt-20 p-10 rounded-lg shadow-lg flex flex-col items-start">
      <button onClick={signInGoogle} className='mx-auto text-md text-sky-500 py-2 px-5 bg-gray-200 rounded flex flex-row items-center space-x-2 shadow-lg'>
        <FaGoogle />
        <span>Continue with Google</span>
      </button>

      {JSON.stringify(currUser?.email)}
    </div> 
  )
}