import { useAuth } from "../../contexts/authContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserService from "../../services/userService";
import { User } from "../../models/user";
import { GetServerSidePropsContext } from "next";
import firebaseAdmin from "firebase-admin";
import {
  FaPeopleCarry,
  FaArrowRight,
  FaBullhorn,
  FaPlus,
} from "react-icons/fa";
import BackgroundLayout from "../../components/Layouts/BackgroundLayout";
import TeamService from "../../services/teamService";
import Loading from "../../components/Loading";
import { TeamMemberStatus } from "../../models/teamMember";
import { Divider, Tooltip } from "antd";
import { Team } from "../../models/team";
import moment from "moment";

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
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    (async function () {
      try {
        // if not authenticated, take user to the login
        if (!currUser) {
          console.log(
            "not authenticated...routing from dashboard to teams home"
          );
          router.push("/teams/login");
          return;
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
          return;
        }
        setUser(returnedUser);

        // get all teams that this user id is active in
        // get all of the teams that this user's email is invited to
        const teams: Team[] = await teamService.getActiveOrInvitedTeamsbyUser(
          currUser.uid,
          returnedUser.emailAddress
        );

        setTeams(teams);

        setLoading(false);
      } catch (error) {
        console.log(error);
        router.push("/teams/login");
      }
    })();
  }, []);

  if (loading || !user) {
    return <Loading />;
  }

  // not in a team yet, and have not created a team yet
  return (
    <div className="container mx-auto flex flex-col max-w-screen-md m-10 bg-white p-10 rounded-lg shadow-md space-y-5">
      {/* header */}
      <div className="flex flex-row items-center justify-between">
        <span className="flex flex-col justify-start">
          <div className="text-lg">👋Hey, {user.firstName}</div>
          <span className="text-gray-300 text-md">
            Let&apos;s get you started.
          </span>
        </span>

        <Tooltip title={"Click to Edit Profile"}>
          <button onClick={() => router.push("/teams/profile")}>
            <img
              src={user ? user.avatarUrl : currUser.photoURL}
              alt="asdf"
              className="rounded-full w-12 shadow-lg"
            />
          </button>
        </Tooltip>
      </div>

      <div className="flex flex-row items-center">
        <span className="text-gray-400">Your Teams</span>
        <Tooltip title={"Add members and get started immediately!"}>
          <button
            onClick={() => window.open("/teams/create", "_self")}
            className="ml-auto rounded text-xs font-semibold bg-gray-200 p-2 text-teal-600 shadow-lg flex flex-row items-center space-x-2"
          >
            <FaPlus />
            <span>Create</span>
          </button>
        </Tooltip>
      </div>

      {/* all teams part of */}
      <div className="flex flex-row flex-wrap">
        {teams.map((team) => {
          console.log(team);
          return (
            <span
              key={team.id}
              className="group  hover:bg-teal-600 hover:bg-opacity-10 transition-all 
              p-5 rounded bg-gray-200 bg-opacity-20 flex flex-row justify-between items-center w-[20rem] m-2"
            >
              <span className="flex flex-col mr-10 items-start">
                <span className="flex flex-row items-center space-x-2">
                  <span className="text-lg text-teal-600 group-hover:font-semibold transition-all">
                    {team.name}
                  </span>
                  <Tooltip title={"Number of pro spots purchased"}>
                    <span className="bg-teal-600 bg-opacity-50 text-xs rounded-full w-5 h-5 flex items-center justify-evenly text-white ">
                      {team.allowedUserCount || 2}
                    </span>
                  </Tooltip>
                </span>

                {team.companySite && (
                  <span
                    onClick={() => window.open(team.companySite, "_blank")}
                    className="text-xs hover:cursor-pointer font-semibold text-teal-600 p-1 bg-teal-500 bg-opacity-20 rounded"
                  >
                    {team.companySite}
                  </span>
                )}

                <span className="text-xs text-gray-300">
                  {"created: " + moment(team.createdDate.toDate()).fromNow()}
                </span>
              </span>

              <Tooltip title={"Go to " + team.name}>
                <span
                  onClick={() => window.open("/teams/" + team.id, "_blank")}
                  className="ml-auto hover:cursor-pointer transition-all bg-gray-500 bg-opacity-25 p-2 rounded group-hover:bg-opacity-40 group-hover:bg-teal-500"
                >
                  <FaArrowRight className="text-sm text-white" />
                </span>
              </Tooltip>
            </span>
          );
        })}

        {teams.length == 0 ? (
          <button className="group flex flex-row py-5 px-3 items-center border border-dashed rounded">
            <FaBullhorn className="text-5xl text-orange-300" />

            <span className="flex flex-col items-start ml-2 mr-10">
              <span className="text-gray-500">Remind Your Manager</span>
              <span className="text-gray-300 text-xs text-left">
                Your account email is {user.emailAddress}
              </span>
            </span>
          </button>
        ) : (
          ""
        )}
      </div>

      <span className="text-gray-300 ml-auto text-md mt-10">
        or learn more about{" "}
        <button
          onClick={() => window.open("/", "_self")}
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
