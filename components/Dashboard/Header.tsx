import { useAuth } from "../../contexts/authContext";
import Image from "next/image";
import {
  FaMicrophoneAlt,
  FaHeadphonesAlt,
  FaTh,
  FaBell,
  FaSearch,
  FaBuilding,
  FaCalendarDay,
  FaClock,
  FaPeopleCarry,
} from "react-icons/fa";
import { useTeamDashboardContext } from "../../contexts/teamDashboardContext";
import router from "next/router";
import Moment from "react-moment";
import { User } from "../../models/user";
import { generateGreetings } from "../../helpers/dateTime";
import { Dropdown, Menu } from "antd";
import { useRouter } from "next/router";
import { TeamMemberRole, TeamMemberStatus } from "../../models/teamMember";
import { toast } from "react-hot-toast";
import SubMenu from "antd/lib/menu/SubMenu";
import { useEffect, useState } from "react";
import TeamService from "../../services/teamService";
import { Team } from "../../models/team";
import Loading from "../Loading";

const teamService = new TeamService();

export default function Header() {
  const { currUser, logOut } = useAuth();
  const { team, user, userTeamMember } = useTeamDashboardContext();
  const router = useRouter();
  const { teamid } = router.query;

  const [usersTeams, setUserTeams] = useState<Team[]>(null);
  console.log("rendering");
  console.log(usersTeams);

  useEffect(() => {
    (async function () {
      try {
        // get all the teams that this user is part of
        const newTeams: Team[] =
          await teamService.getActiveOrInvitedTeamsbyUser(currUser.uid);
        console.log(newTeams);
        setUserTeams(newTeams);
      } catch (error) {
        console.log("problem getting teams of this user");
        toast.error("problem on load");
      }
    })();
  }, []);

  async function handleSignOut() {
    console.log("clicked log out button");

    try {
      await logOut();

      router.push("/teams/landing");
    } catch (error) {
      console.log(error);
      toast.error("Unable to log out!");
    }
  }

  async function handleAdminRoute() {
    if (userTeamMember.role == TeamMemberRole.admin) {
      router.push("/teams/" + teamid + "/admin");
      return;
    }

    toast.error("You are not a team admin!");
  }

  const UserMenu = (
    <Menu>
      <Menu.Item key={1}>
        <button onClick={handleAdminRoute}>admin</button>
      </Menu.Item>

      <SubMenu key={2} title="teams">
        {/* all current teams that this person is a part of */}
        {usersTeams &&
          usersTeams.map((team, i) => {
            return (
              <Menu.Item key={i + 5}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("going to " + team.name);
                    router.push("/teams/" + team.id);
                  }}
                >
                  {team.name}
                </button>
              </Menu.Item>
            );
          })}

        <Menu.Item key={"createteam"} icon={<FaPeopleCarry />}>
          <button
            onClick={(e) => {
              e.preventDefault();
              router.push("/teams/create");
            }}
          >
            create team
          </button>
        </Menu.Item>
      </SubMenu>

      <Menu.Item danger key={3}>
        <button onClick={handleSignOut}>sign out</button>
      </Menu.Item>
    </Menu>
  );

  const searchBar = (
    <div className="pt-2 flex flex-row relative items-center">
      <button type="submit" className="absolute left-0 top-0 mt-5 ml-5">
        <FaSearch className="text-white" />
      </button>

      <input
        className=" bg-white bg-opacity-40 h-10 px-5 pl-10 pr-16 rounded-lg text-white text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
      />

      <button
        className="absolute right-1 rounded-lg py-1 px-2 ml-1 
                                    shadow-md text-center text-white text-sm font-bold"
      >
        CTRL + K
      </button>
    </div>
  );

  const today = new Date();
  const periodOfDay = generateGreetings();
  return (
    <section className="flex-1 flex flex-row items-center justify-between py-5">
      {/* welcome message */}
      {usersTeams && usersTeams.length}
      <span className="flex flex-col items-baseline">
        <span className="font-bold text-xl text-white capitalize ">
          👋Hey {user.firstName}, {periodOfDay}!
        </span>

        {/* Date and time */}
        <span className="flex flex-row space-x-2">
          <span className="text-teal-700 bg-teal-200 p-1 rounded-md text-xs font-bold mt-2 flex flex-row items-center space-x-1">
            <FaBuilding />
            <span>{team.name}</span>
          </span>

          <span className="text-sky-700 bg-sky-200 p-1 rounded-md text-xs font-bold mt-2 flex flex-row items-center space-x-1">
            <FaCalendarDay />
            <Moment date={today} format="ddd, MMM DD" />
          </span>

          <span className="text-sky-700 bg-sky-200 p-1 rounded-md text-xs font-bold mt-2 flex flex-row items-center space-x-1">
            <FaClock />
            <Moment format="h:mm a" />
          </span>
        </span>
      </span>

      {/* header control section */}
      <span className="flex flex-row items-center space-x-5">
        {/* search bar */}

        <FaBell className="text-lg text-gray-400 hover:text-white ease-in-out duration-300 hover:scale-110 hover:cursor-pointer" />
        <FaHeadphonesAlt className="text-lg text-gray-400 hover:text-white ease-in-out duration-300 hover:scale-110 hover:cursor-pointer" />
        <FaMicrophoneAlt className="text-lg text-gray-400 hover:text-white ease-in-out duration-300 hover:scale-110 hover:cursor-pointer" />
        <FaTh className="text-lg text-gray-400 hover:text-white ease-in-out duration-300 hover:scale-110 hover:cursor-pointer" />

        {/* avatar */}
        <Dropdown overlay={UserMenu} trigger={["click"]}>
          <span className="relative flex hover:cursor-pointer">
            <span className="bg-gray-200 bg-opacity-30 rounded-full shadow-md absolute w-full h-full"></span>
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></span>
            <img
              src={user.avatarUrl}
              alt="asdf"
              className="rounded-full w-12"
            />
          </span>
        </Dropdown>
      </span>
    </section>
  );
}
