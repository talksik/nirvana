import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/Dashboard/Header";
import TeamVoiceLine from "../../components/Dashboard/TeamVoiceLine";
import BackgroundLayout from "../../components/Layouts/BackgroundLayout";
import Loading from "../../components/Loading";
import { useAuth } from "../../contexts/authContext";
import {
  TeamDashboardContextProvider,
  useTeamDashboardContext,
} from "../../contexts/teamDashboardContext";
import { Team } from "../../models/team";
import { TeamMemberStatus } from "../../models/teamMember";
import TeamService from "../../services/teamService";

// User has switched back to the tab
const onFocus = () => {
  console.log("Tab is in focus");
};

// User has switched away from the tab (AKA tab is hidden)
const onBlur = () => {
  console.log("Tab is blurred");
};

const onClose = (ev) => {
  // change user status to offline

  ev.preventDefault();
  return (ev.returnValue = "are you sure?");
};

function TeamDashboard() {
  const { currUser } = useAuth();
  const router = useRouter();
  const teamDashboardContext = useTeamDashboardContext();

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    // Calls onFocus when the window first loads
    onFocus();
    // Specify how to clean up after this effect:

    window.addEventListener("beforeunload", onClose);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("beforeunload", onClose);
    };
  }, []);

  console.log(teamDashboardContext);

  return (
    <div className="container mx-auto max-w-screen-xl py-10 px-10 flex flex-col space-y-5">
      <Header />

      <div className="flex flex-row items-baseline space-x-5 space-y-5 flex-wrap">
        <TeamVoiceLine />
      </div>
    </div>
  );
}

export default function TeamDashboardWrapper() {
  return (
    <TeamDashboardContextProvider>
      <BackgroundLayout>
        <TeamDashboard />
      </BackgroundLayout>
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
