import { useAuth } from "../../contexts/authContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserService from "../../services/userService";
import { User } from "../../models/user";
import { GetServerSidePropsContext } from "next";
import firebaseAdmin from "firebase-admin";
import { FaPeopleCarry, FaArrowRight, FaBullhorn } from "react-icons/fa";
import BackgroundLayout from "../../components/Layouts/BackgroundLayout";
import TeamService from "../../services/teamService";
import Loading from "../../components/Loading";
import { TeamMemberStatus } from "../../models/teamMember";

/**
 * figure out where to take the user based on everything
 */

const userService: UserService = new UserService();
const teamService: TeamService = new TeamService();

function RouteHandler() {
  const { currUser } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState<Boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async function () {
      try {
        // if not authenticated, take user to the login
        if (!currUser) {
          console.log(
            "not authenticated...routing from dashboard to teams home"
          );
          router.push("/teams/login");
        }

        // get user
        const returnedUser: User | null = await userService.getUser(
          currUser.uid
        );

        // if user has no profile, then go to create profile
        if (
          !returnedUser ||
          !returnedUser.firstName ||
          !returnedUser.lastName ||
          !returnedUser.nickName
        ) {
          console.log("no profile for the user, routing him/her there");
          router.push("/teams/profile");
        }
        setUser(returnedUser);

        // check if user is in a team go to the team dashboard
        const returnedTeamMembers = await teamService.getTeamMembersByUserId(
          currUser.uid
        );
        console.log(returnedTeamMembers);
        // if the user is deleted from a team, don't let them go there
        returnedTeamMembers.map((tm) => {
          if (tm.status != TeamMemberStatus.deleted) {
            console.log(
              "in a team! going to the team dashboard of the first one!"
            );
            router.push("/teams/" + returnedTeamMembers[0].teamId);
            return;
          }
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        router.push("/teams/login");
      }
    })();
  }, [currUser]);

  if (loading || !user) {
    return <Loading />;
  }

  // not in a team yet, and have not created a team yet
  return (
    <div className="container mx-auto flex flex-col max-w-md m-10 bg-white p-10 rounded-lg shadow-md space-y-5">
      {/* header */}
      <div className="flex flex-row items-center justify-between">
        <span className="flex flex-col justify-start">
          <div className="text-lg">👋Hey, {user.firstName}</div>
          <span className="text-gray-300 text-md">
            Let&apos;s get you started.
          </span>
        </span>

        <button onClick={() => router.push("/teams/profile")}>
          <img
            src={user ? user.avatarUrl : currUser.photoURL}
            alt="asdf"
            className="rounded-full w-12"
          />
        </button>
      </div>

      {/* create team hover thing */}
      <button
        onClick={() => router.push("/teams/create")}
        className="group flex flex-row py-5 px-3 items-center border border-dashed rounded hover:shadow-lg transition duration-400"
      >
        <FaPeopleCarry className="text-5xl text-teal-500" />

        <span className="flex flex-col items-start ml-2 mr-10">
          <span className="text-gray-500">Create a Team</span>
          <span className="text-gray-300 text-sm text-left">
            Add members, and get started immediately.
          </span>
        </span>

        <span className="ml-auto bg-gray-500 bg-opacity-25 p-2 rounded group-hover:bg-opacity-40 group-hover:bg-teal-500">
          <FaArrowRight className="text-sm text-white" />
        </span>
      </button>

      {/* tell your manager to add your email */}
      <button className="group flex flex-row py-5 px-3 items-center border border-dashed rounded">
        <FaBullhorn className="text-5xl text-orange-300" />

        <span className="flex flex-col items-start ml-2 mr-10">
          <span className="text-gray-500">Remind Your Manager</span>
          <span className="text-gray-300 text-sm text-left">
            Your account email is {user.emailAddress}
          </span>
        </span>
      </button>

      <span className="text-gray-300 ml-auto text-md mt-10">
        or learn more about{" "}
        <button
          onClick={() => router.push("/teams/landing")}
          className="underline font-satisfy text-xl text-teal-500 decoration-teal-500"
        >
          nirvana
        </button>
      </span>
    </div>
  );
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

  return { props: {} };
}

export default RouteHandler;
