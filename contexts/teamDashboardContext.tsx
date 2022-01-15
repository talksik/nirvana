import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { Team } from "../models/team";
import { TeamMember, TeamMemberStatus } from "../models/teamMember";
import { User } from "../models/user";
import TeamService from "../services/teamService";
import UserService from "../services/userService";
import { useAuth } from "./authContext";

interface TeamDashboardContextInterface {
  team: Team;
  teamMembers: TeamMember[];
  userTeamMember: TeamMember;
  user: User;
}

const TeamDashboardContext =
  React.createContext<TeamDashboardContextInterface | null>(null);

const teamService = new TeamService();
const userService = new UserService();

export function TeamDashboardContextProvider({ children }) {
  const { currUser } = useAuth();
  const [loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();
  const { teamid } = router.query;

  // this context can only be used if it's a specific route: '/teams'
  if (!teamid) {
    router.push("/teams");
  }

  // update this "global" object to send to children
  const [value, setValue] = useState<TeamDashboardContextInterface>(
    {} as TeamDashboardContextInterface
  );

  useEffect(() => {
    (async function () {
      try {
        // SECTION: authentication
        if (!currUser) {
          console.log(
            "not authenticated...routing from dashboard to teams home"
          );
          router.push("/teams/login");
          return;
        }

        // SECTION: get user details
        const returnedUser = await userService.getUser(currUser.uid);
        setValue((prevValue) => ({ ...prevValue, user: returnedUser }));

        // SECTION: getting team data and team member information
        if (typeof teamid !== "string") {
          console.log("not a proper query with teamid");
          router.push("/teams");
          return;
        }

        // check if the team is a valid team and that user is in it
        const returnedTeam = await teamService.getTeam(teamid);
        if (!returnedTeam) {
          console.log("team doesnt exist");
          router.push("/teams");
          return;
        }
        setValue((prevValue) => ({ ...prevValue, team: returnedTeam }));

        const returnedTeamMember = await teamService.getTeamMemberByUserId(
          teamid,
          currUser.uid
        );

        //  if you are not a member of this team, then get out of here
        //   but have to check through email invite and userid
        if (
          returnedTeamMember &&
          returnedTeamMember.status == TeamMemberStatus.deleted
        ) {
          console.log("user was deleted from team");
          router.push("/teams");
          return;
        }

        // if there is no team member through user id,
        // give him last chance and see if he was invited
        if (!returnedTeamMember) {
          const invitedTeamMember =
            await teamService.getTeamMemberByEmailInvite(
              teamid,
              currUser.email
            );

          if (!invitedTeamMember) {
            console.log("not invited to team either");
            router.push("/teams");
            return;
          }

          // if I am new to the team but I was invited, and this is my first time, then activate me into the team
          // and proceed with showing the dashboard stuff

          invitedTeamMember.status = TeamMemberStatus.activated;
          invitedTeamMember.userId = currUser.uid;
          await teamService.updateTeamMember(invitedTeamMember);

          setValue((prevValue) => ({
            ...prevValue,
            userTeamMember: invitedTeamMember,
          }));
        } else {
          setValue((prevValue) => ({
            ...prevValue,
            userTeamMember: returnedTeamMember,
          }));
        }

        // SECTION: get all teammembers for team, will have listeners in other subcomponents
        var teamMembers: TeamMember[] =
          await teamService.getTeamMembersByTeamId(returnedTeam.id);

        teamMembers = teamMembers.filter(
          (element) => element.userId != currUser.uid
        );

        setValue((prevValue) => ({ ...prevValue, teamMembers }));
      } catch (error) {
        console.log(error);
        router.push("/teams/landing");
      }

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <TeamDashboardContext.Provider value={value}>
      {children}
    </TeamDashboardContext.Provider>
  );
}

export function useTeamDashboardContext() {
  return useContext(TeamDashboardContext);
}
