import { Divider } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import {
  TeamDashboardContextProvider,
  useTeamDashboardContext,
} from "../../../contexts/teamDashboardContext";
import {
  TeamMember,
  TeamMemberRole,
  TeamMemberStatus,
} from "../../../models/teamMember";
import { toast } from "react-hot-toast";
import { Team, TeamStatus } from "../../../models/team";

import {
  FaMoneyBillWave,
  FaTrash,
  FaPaperPlane,
  FaArrowLeft,
} from "react-icons/fa";
import TeamService from "../../../services/teamService";
import Router from "next/router";
import Moment from "react-moment";

export default function TeamAdminWrapper() {
  return (
    <TeamDashboardContextProvider>
      <TeamAdmin />
    </TeamDashboardContextProvider>
  );
}

const initialSite: string = "https://";

function renderTeamMemberStatus(status: TeamMemberStatus) {
  switch (status) {
    case TeamMemberStatus.invited:
      return (
        <span className="text-gray-700 ml-1 bg-gray-200 p-1 rounded-md text-xs font-bold mt-2">
          invited
        </span>
      );
    case TeamMemberStatus.activated:
      return (
        <span className="text-sky-700 ml-1 bg-sky-200 p-1 rounded-md text-xs font-bold mt-2">
          active
        </span>
      );
    case TeamMemberStatus.deleted:
      return (
        <span className="text-red-700 ml-1 bg-red-200 p-1 rounded-md text-xs font-bold mt-2">
          deleted
        </span>
      );
  }
}

const teamService = new TeamService();

function TeamAdmin() {
  const router = useRouter();
  const { teamid } = router.query;
  const { team, userTeamMember, teamMembers, user } = useTeamDashboardContext();

  const [error, setError] = useState<string>("");
  const [teamName, setTeamName] = useState<string>(team.name);
  const [companySite, setcompanySite] = useState<string>(team.companySite);
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    (async function () {
      // have checks for team and part of team or not in context
      try {
        // if not admin, I shouldn't be here
        if (userTeamMember.role != TeamMemberRole.admin) {
          toast.error("You are not allowed here!");
          router.push("/teams");
        }
      } catch (error) {
        console.log("something went wrong in admin team page");
        router.push("/teams");
      }

      setLoading(false);
    })();
  }, []);

  async function handleSubmitTeamUpdate(e) {
    e.preventDefault();

    setLoading(true);

    if (!teamName) {
      setError("You must input a team name!");
      return;
    }

    try {
      const updatedTeam = new Team();
      updatedTeam.id = team.id;
      updatedTeam.name = teamName;
      updatedTeam.createdByUserId = user.id;
      updatedTeam.status = TeamStatus.created;

      if (companySite != initialSite) {
        // make sure to put null in database for the team
        updatedTeam.companySite = companySite;
      }

      // update team name and company site if it changed
      await teamService.updateTeam(updatedTeam);

      // take user back to team dashboard
      router.push("/teams/" + team.id);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }

    setLoading(false);
  }

  async function handleSubmitNewTeamMember(e) {
    e.preventDefault();

    setLoading(true);

    if (!inviteEmail) {
      setError("You must input a valid email!");
      return;
    }

    try {
      const newInviteTeamMember = new TeamMember();
      newInviteTeamMember.inviteEmailAddress = inviteEmail;
      newInviteTeamMember.invitedByUserId = user.id;
      newInviteTeamMember.status = TeamMemberStatus.invited;
      newInviteTeamMember.teamId = team.id;

      await teamService.createTeamInvite(newInviteTeamMember);

      Router.reload();
    } catch (error) {
      toast.error("something went wrong");
    }
  }

  async function handleDeleteTeamMember(e, teamMemberId: string) {
    e.preventDefault();

    setLoading(true);

    try {
      await teamService.updateTeamMemberStatus(
        teamMemberId,
        TeamMemberStatus.deleted
      );

      Router.reload();
    } catch (error) {
      toast.error("unable to delete team member");
    }
  }

  if (loading) {
    return <Loading />;
  }

  async function handleInviteTeamMember(e, teamMemberId: string) {
    e.preventDefault();
    setLoading(true);

    try {
      await teamService.updateTeamMemberStatus(
        teamMemberId,
        TeamMemberStatus.invited
      );

      Router.reload();
    } catch (error) {
      toast.error("unable to delete team member");
    }
  }

  if (loading) {
    return <Loading />;
  }

  // get count of all active and invited users...
  const activeOrInvited = teamMembers.filter(
    (tmember) =>
      tmember.status == TeamMemberStatus.invited ||
      tmember.status == TeamMemberStatus.activated
  );
  const teamSpotsRemaining =
    (team.allowedUserCount || 0) - activeOrInvited.length - 1;

  return (
    <div className="container mx-auto max-w-screen-sm m-10 bg-white p-10 rounded-lg shadow-md">
      <form
        onSubmit={handleSubmitTeamUpdate}
        className="flex flex-col space-y-5"
      >
        {/* header */}
        <div className="text-lg flex flex-row items-center space-x-2">
          <FaArrowLeft
            className="hover:cursor-pointer"
            onClick={() => router.push("/teams/" + teamid)}
          />{" "}
          <span>Manage Team</span>
        </div>

        {error && <span className="text-red-300 text-md">{error}</span>}

        <Divider />

        <span className="flex flex-col items-start">
          <span className="text-md">Team Name</span>
          <span className="text-gray-300 text-xs mb-2">
            Everyone in your team will see this.
          </span>
          <input
            placeholder="ex. AirBnB"
            className="w-full rounded-lg bg-gray-50 p-3"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </span>

        <span className="flex flex-col items-start">
          <span className="text-md">Company Site</span>
          <span className="text-gray-300 text-xs mb-2">optional</span>
          <input
            placeholder="ex. https://"
            className="w-full rounded-lg bg-gray-50 p-3"
            value={companySite}
            onChange={(e) => setcompanySite(e.target.value)}
          />
        </span>

        <Divider />

        <span className="flex flex-row justify-end space-x-2">
          <button
            onClick={() => router.push("/teams/" + team.id)}
            className="bg-gray-100 py-2 px-5 rounded text-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-sm text-white font-semibold py-2 px-5 bg-teal-500 rounded"
          >
            Save
          </button>
        </span>
      </form>

      <form
        className="flex flex-col space-y-5"
        onSubmit={handleSubmitNewTeamMember}
      >
        <Divider />

        <span className="flex flex-row justify-start items-start">
          <FaMoneyBillWave className="text-5xl text-green-500" />

          <span className="flex flex-col justify-start ml-2">
            <span className="text-md ">Billing</span>
            <span className="text-md text-gray-500 mr-20">
              Please email{" "}
              <button className="underline decoration-teal-500 text-brown-500">
                usenirvana@gmail.com
              </button>{" "}
              to open more spots for your team.
            </span>
          </span>

          <span className="ml-auto text-center text-orange-700 bg-orange-200 p-1 rounded-md text-sm font-bold mt-2">
            {teamSpotsRemaining} spots remaining
          </span>
        </span>

        <Divider />

        <span className="text-md">Team</span>

        {/* current user */}
        <div className="flex flex-row">
          <img src={user.avatarUrl} alt="asdf" className="rounded-full w-12" />
          <span className="flex flex-col items-start ml-2">
            <span className="text-md text-gray-500">
              {user.firstName + " " + user.lastName}

              <span className="text-green-700 ml-1 bg-green-200 p-1 rounded-md text-xs font-bold mt-2">
                admin
              </span>

              {renderTeamMemberStatus(userTeamMember.status)}
            </span>
            <span className="text-xs text-gray-200">{user.emailAddress}</span>
          </span>
        </div>

        {/* mapping all team members */}
        {teamMembers.map((tmember, i) => {
          return (
            <div key={i} className="flex flex-row items-center">
              <div className="rounded-full w-12 animate-pulse bg-gray-200 h-12" />

              <span className="flex flex-col items-start ml-2">
                <span className="text-md text-gray-500">
                  {tmember.inviteEmailAddress}

                  {renderTeamMemberStatus(tmember.status)}
                </span>

                {/* todo: date joined */}
                {/* <Moment date={tmember} className="text-xs text-gray-200" /> */}
              </span>

              {tmember.status == TeamMemberStatus.deleted &&
              teamSpotsRemaining > 0 ? (
                <button
                  onClick={(e) => handleInviteTeamMember(e, tmember.id)}
                  className="ml-auto bg-gray-300 bg-opacity-25 p-2 rounded hover:bg-opacity-40"
                >
                  <FaPaperPlane className="text-sm text-teal-500 " />
                </button>
              ) : (
                <></>
              )}
              {tmember.status == TeamMemberStatus.invited ||
              tmember.status == TeamMemberStatus.activated ? (
                <button
                  onClick={(e) => handleDeleteTeamMember(e, tmember.id)}
                  className="bg-orange-300 bg-opacity-25 p-2 ml-auto rounded hover:bg-opacity-40"
                >
                  <FaTrash className="text-sm text-orange-500 " />
                </button>
              ) : (
                <></>
              )}
            </div>
          );
        })}

        {/* input for adding people */}
        {teamSpotsRemaining > 0 ? (
          <>
            <span className="flex flex-col items-start">
              <span className="text-md">Add Members</span>
              <span className="text-red-300 text-md mb-2">
                IMPORTANT: Tell them to sign up at{" "}
                <span className="underline decoration-teal-500">
                  usenirvana.com{" "}
                </span>{" "}
                using this same email address.
              </span>
              <input
                placeholder="ex. jack@apple.com"
                className="w-full rounded-lg bg-gray-50 p-3"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </span>

            <span className="flex flex-row justify-end space-x-2">
              {inviteEmail ? (
                <button
                  type="submit"
                  className="text-sm text-white font-semibold py-2 px-5 bg-teal-500 rounded"
                >
                  Add
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-sm text-white font-semibold py-2 px-5 bg-gray-200 rounded"
                  disabled
                >
                  Add
                </button>
              )}
            </span>
          </>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
}
