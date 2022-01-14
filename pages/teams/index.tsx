import { useAuth } from "../../contexts/authContext"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import UserService from '../../services/userService'
import { User } from "../../models/user"
import { GetServerSidePropsContext } from "next"
import nookies from 'nookies'
import firebaseAdmin from 'firebase-admin'
import unfetch from 'isomorphic-unfetch'

/**
 * figure out where to take the user based on everything
 */
function RouteHandler({ user }) {
  const { currUser } = useAuth()
  const router = useRouter()
  const userService: UserService = new UserService()
  const [loading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
    
    (async function() {
      try {
        // if not authenticated, take user to the login
        if (!currUser) {
          console.log('not authenticated...routing from dashboard to teams home')
          router.push('/teams/login')
        }

        // get user 
        const user: User | null = await userService.getUser(currUser.uid)
        console.log(user)
        // if user has no profile, then go to create profile
        if (!user || !user.firstName || !user.lastName || !user.nickName) {
          console.log('no profile for the user, routing him/her there')
          router.push('/teams/profile')
        }

        // check if user is in a team go to the team dashboard

        

      } catch(error) {
        console.log(error)
        router.push('/teams/login')
      }
    })();
  }, [currUser])

  if (loading)  {
    return <div>figuring out where you should go</div>
  }

  return (
    <div className="text-black">this is the route handler page</div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // const cookies = nookies.get(context);

  // var user: User | null = null

  // if (cookies.token) {
  //   try {
  //     const headers: HeadersInit = {
  //       'Content-Type': 'application/json',
  //        Authorization: JSON.stringify({ token: cookies.token })
  //     };
  //     const result = await unfetch('/api/auth/validateToken', { headers });
  //     console.log(result)

  //      // get user data
  //     const userService: UserService = new UserService()

  //     // the user is authenticated!

  //     // FETCH STUFF HERE!! 🚀

  //     // user = await userService.getUser("asdf")
  //   } catch (e) {
  //     // let exceptions fail silently
  //     // could be invalid token, just let client-side deal with that

  //     console.log(e)
  //   }
  // }
  
  // // Pass data to the page via props
  // return { props: { 
  //   user
  //  }
  // }

  return { props: { }}
}

export default RouteHandler
