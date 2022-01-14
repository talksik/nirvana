import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

  return <div>{JSON.stringify(teamDashboardContext)}</div>;
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
