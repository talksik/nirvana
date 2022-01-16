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
  FaAngleDown,
  FaCheck,
  FaDatabase,
  FaMicrophoneAltSlash,
  FaVolumeMute,
} from "react-icons/fa";
import { useTeamDashboardContext } from "../../contexts/teamDashboardContext";
import router from "next/router";
import Moment from "react-moment";
import { User } from "../../models/user";
import { generateGreetings } from "../../helpers/dateTime";
import { Dropdown, Menu, Tooltip } from "antd";
import { useRouter } from "next/router";
import { TeamMemberRole, TeamMemberStatus } from "../../models/teamMember";
import { toast } from "react-hot-toast";
import SubMenu from "antd/lib/menu/SubMenu";
import { useEffect, useState } from "react";
import TeamService from "../../services/teamService";
import { Team } from "../../models/team";
import Loading from "../Loading";
import { useAudioContext } from "../../contexts/audioContext";

const teamService = new TeamService();

export default function Header() {
  const { currUser, logOut } = useAuth();
  const { team, user, userTeamMember } = useTeamDashboardContext();
  const router = useRouter();
  const { teamid } = router.query;
  const {
    hasRecPermit,

    audioInputDeviceId,
    audioOutputDeviceId,
    selectAudioOutput,
    selectAudioInput,
    inputDevices,
    outputDevices,

    isMuted,
    isSilenceMode,
    muteOrUnmute,
    silenceOrLivenMode,
  } = useAudioContext();

  const [usersTeams, setUserTeams] = useState<Team[]>(null);

  // get team data for the team dropdown
  useEffect(() => {
    (async function () {
      try {
        // get all the teams that this user is part of
        const newTeams: Team[] =
          await teamService.getActiveOrInvitedTeamsbyUser(
            currUser.uid,
            currUser.email
          );

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

  const TeamsMenu = (
    <Menu key={2} title="teams">
      <Menu.Item onClick={handleAdminRoute} key={1} icon={<FaDatabase />}>
        <button>Admin</button>
      </Menu.Item>

      <Menu.Divider />

      {/* all current teams that this person is a part of */}
      {usersTeams &&
        usersTeams.map((uteam, i) => {
          return (
            <Menu.Item
              key={i + 5}
              icon={team.id == uteam.id ? <FaCheck /> : <></>}
              onClick={() => {
                console.log("going to " + uteam.id);
                window.location.href = "/teams/" + uteam.id;
              }}
            >
              <button>{uteam.name}</button>
            </Menu.Item>
          );
        })}

      <Menu.Divider />

      {/* create TEAM */}
      <Menu.Item
        key={"createteam"}
        icon={<FaPeopleCarry />}
        onClick={() => router.push("/teams/create")}
      >
        <button>Create Team</button>
      </Menu.Item>
    </Menu>
  );
  const UserMenu = (
    <Menu title="user menu">
      <Menu.Item key={2} onClick={() => router.push("/teams/profile")}>
        <button>Profile</button>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item danger key={3} onClick={handleSignOut}>
        <button>Sign Out</button>
      </Menu.Item>
    </Menu>
  );

  const audioInputDropMenu = (
    <Menu title="audio input">
      {inputDevices.map((device, i) => {
        return (
          <Menu.Item
            key={device.deviceId}
            icon={device.deviceId == audioInputDeviceId ? <FaCheck /> : <></>}
            onClick={() => selectAudioInput(device.deviceId)}
          >
            <button>{device.label}</button>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const audioOutputDropMenu = (
    <Menu title="audio ouput">
      {outputDevices.map((device, i) => {
        return (
          <Menu.Item
            key={device.deviceId}
            icon={device.deviceId == audioOutputDeviceId ? <FaCheck /> : <></>}
            onClick={() => selectAudioOutput(device.deviceId)}
          >
            <button>{device.label}</button>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  function renderAudioInput() {
    if (!hasRecPermit) {
      return (
        <Tooltip title="enable mic permissions">
          <span>
            <FaMicrophoneAltSlash className="text-xl text-orange-400 ease-in-out duration-300 hover:scale-110 hover:cursor-pointer" />
          </span>
        </Tooltip>
      );
    }

    if (isMuted) {
      return (
        <span onClick={muteOrUnmute}>
          <FaMicrophoneAltSlash className="text-xl text-orange-400 ease-in-out duration-300 hover:scale-110 hover:cursor-pointer" />
        </span>
      );
    }

    return (
      <Dropdown overlay={audioInputDropMenu}>
        <span onClick={muteOrUnmute}>
          <FaMicrophoneAlt className="text-xl text-gray-200 hover:text-white ease-in-out duration-300 hover:scale-110 hover:cursor-pointer" />
        </span>
      </Dropdown>
    );
  }

  function renderAudioOutput() {
    if (isSilenceMode) {
      return (
        <span onClick={silenceOrLivenMode}>
          <FaVolumeMute className="text-xl text-orange-400 ease-in-out duration-300 hover:scale-110 hover:cursor-pointer" />
        </span>
      );
    }

    return (
      <Dropdown overlay={audioOutputDropMenu}>
        <span onClick={silenceOrLivenMode}>
          <FaHeadphonesAlt className="text-xl text-gray-200 hover:text-white ease-in-out duration-300 hover:scale-110 hover:cursor-pointer" />
        </span>
      </Dropdown>
    );
  }

  const today = new Date();
  const periodOfDay = generateGreetings();
  return (
    <section className="flex-1 flex flex-row items-center justify-between py-5">
      {/* welcome message */}
      <span className="flex flex-col items-baseline">
        <span className="font-bold text-xl text-white capitalize ">
          👋Hey {user.firstName}, {periodOfDay}!
        </span>

        {/* Date and time */}
        <span className="flex flex-row space-x-2">
          <span className="text-sky-700 bg-sky-200 p-1 rounded-md text-xs font-bold mt-2 flex flex-row items-center space-x-1">
            <FaCalendarDay />
            <Moment date={today} format="ddd, MMM DD" />
          </span>

          <span className="text-emerald-700 bg-emerald-200 p-1 rounded-md text-xs font-bold mt-2 flex flex-row items-center space-x-1">
            <FaClock />
            <Moment format="h:mm a" />
          </span>
        </span>
      </span>

      {/* header control section */}
      <span className="flex flex-row items-center space-x-5">
        {/* search bar */}

        {/* <FaBell className="text-lg text-gray-400 hover:text-white ease-in-out duration-300 hover:scale-110 hover:cursor-pointer" /> */}

        {renderAudioOutput()}

        {renderAudioInput()}

        {/* teams menu */}

        <Dropdown overlay={TeamsMenu} trigger={["click"]}>
          <button
            className="text-gray-200 flex flex-row items-center"
            onClick={(e) => e.preventDefault()}
          >
            {team.name} <FaAngleDown />
          </button>
        </Dropdown>

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
