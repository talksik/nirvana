import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/Dashboard/Header";
import Rooms from "../../components/Dashboard/Rooms";
import TeamVoiceLine from "../../components/Dashboard/TeamVoiceLine";
import BackgroundLayout from "../../components/Layouts/BackgroundLayout";
import Loading from "../../components/Loading";
import AudioContextProvider from "../../contexts/audioContext";
import { useAuth } from "../../contexts/authContext";
import {
  TeamDashboardContextProvider,
  useTeamDashboardContext,
} from "../../contexts/teamDashboardContext";
import { Team } from "../../models/team";
import { TeamMemberStatus } from "../../models/teamMember";
import { UserStatus } from "../../models/user";
import TeamService from "../../services/teamService";
import UserService from "../../services/userService";

// User has switched back to the tab
const onFocus = () => {
  console.log("Tab is in focus");
};

// User has switched away from the tab (AKA tab is hidden)
const onBlur = () => {
  console.log("Tab is blurred");
};

const alertUserAboutClosing = (ev) => {
  // change user status to offline

  ev.preventDefault();
  return (ev.returnValue = "are you sure?");
};

const userService = new UserService();

function TeamDashboard() {
  const { currUser } = useAuth();
  const router = useRouter();
  const teamDashboardContext = useTeamDashboardContext();

  // user goes offline
  const handleTabClosing = () => {
    // change status of user
    userService.updateUserStatus(currUser.uid, UserStatus.offline);
  };

  // shows browser alert to warn user of exiting
  const alertUserAboutClosing = (event: any) => {
    event.preventDefault();
    event.returnValue = "";
  };

  useEffect(() => {
    // set the document title based on the team
    // todo: update based on who sent you a message
    document.title = teamDashboardContext.team.name;

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    // Calls onFocus when the window first loads
    onFocus();

    // set user to online until he closes tab/window
    userService.updateUserStatus(currUser.uid, UserStatus.online);

    window.addEventListener("beforeunload", alertUserAboutClosing);
    window.addEventListener("unload", handleTabClosing);
    return () => {
      // Specify how to clean up after this effect:
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("beforeunload", alertUserAboutClosing);
      window.removeEventListener("unload", handleTabClosing);
    };
  }, []);

  console.log(teamDashboardContext);

  return (
    <div className="container mx-auto py-10 px-10 flex flex-col space-y-5">
      <Header />

      <div className="flex flex-row items-baseline space-x-5 space-y-5">
        <TeamVoiceLine />

        <Rooms />
      </div>
    </div>
  );
}

export default function TeamDashboardWrapper() {
  return (
    <TeamDashboardContextProvider>
      <AudioContextProvider>
        <BackgroundLayout>
          <TeamDashboard />
        </BackgroundLayout>
      </AudioContextProvider>
    </TeamDashboardContextProvider>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // basic check if this team exists

  // todo check if authenticated

  // todo check if this user is in this team

  return {
    props: {},
  };
}
