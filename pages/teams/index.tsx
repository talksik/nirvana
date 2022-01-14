import { useAuth } from "../../contexts/authContext"
import { useRouter } from "next/router"
import { useEffect } from "react"
import UserService from '../../services/userService'
import { User } from "../../models/user"
import { GetServerSidePropsContext } from "next"

/**
 * figure out where to take the user based on everything
 */
function RouteHandler({ user }) {
  const { currUser, logOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // if not authenticated, take user to the login
    if (!currUser) {
      console.log('not authenticated...routing from dashboard to teams home')
      router.push('/teams/login')
    }
    
    // if user has no profile, then go to create profile
    
  }, [currUser])

  return (
    <div className="text-black">this is the route handler page</div>
  )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get user data
  const userService: UserService = new UserService()

  var user: User | null = null

  try {
    user = await userService.getUser("asdf")
  } catch(error) {
    console.log(error)
  }

  // Pass data to the page via props
  return { props: { 
    user
   }
  }
}

export default RouteHandler
