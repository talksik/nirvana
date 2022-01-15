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

function TeamDashboard() {
  const { currUser } = useAuth();
  const router = useRouter();
  const teamDashboardContext = useTeamDashboardContext();

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
