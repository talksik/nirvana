import { useAuth } from "../../contexts/authContext"
import { useRouter } from "next/router"
import { useEffect } from "react"

/**
 * figure out where to take the user based on everything
 */
function RouteHandler() {
  const { currUser, logOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // if not authenticated, take user to the login
    if (!currUser) {
      console.log('not authenticated...routing from dashboard to teams home')
      router.push('/teams/login')
    }
  }, [currUser])

  return (
    <div className="text-white">this is the route handler page</div>
  )
}

export async function getServerSideProps() {
  // Pass data to the page via props
  return { props: {  } }
}

export default RouteHandler
