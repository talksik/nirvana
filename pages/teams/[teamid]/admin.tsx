import { Divider } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import {
  TeamDashboardContextProvider,
  useTeamDashboardContext,
} from "../../../contexts/teamDashboardContext";
import { TeamMemberRole } from "../../../models/teamMember";
import { toast } from "react-hot-toast";
import { Team, TeamStatus } from "../../../models/team";

export default function TeamAdminWrapper() {
  return (
    <TeamDashboardContextProvider>
      <TeamAdmin />
    </TeamDashboardContextProvider>
  );
}

const initialSite: string = "https://";

function TeamAdmin() {
  const router = useRouter();
  const { teamid } = router.query;
  const { team, userTeamMember, teamMembers, user } = useTeamDashboardContext();

  const [error, setError] = useState<string>("");
  const [teamName, setTeamName] = useState<string>(team.name);
  const [companySite, setcompanySite] = useState<string>(team.companySite);
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

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    if (!teamName) {
      setError("You must input a team name!");
      return;
    }

    try {
      const team = new Team();
      team.name = teamName;
      team.createdByUserId = user.id;
      team.status = TeamStatus.created;

      if (companySite != initialSite) {
        // make sure to put null in database for the team
        team.companySite = companySite;
      }

      // check again that the team has allowed count of people

      // create invites for new people

      // update team name and company site if it changed

      // take user back to team dashboard
      router.push("/teams/" + team.id);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <form
      className="container mx-auto flex flex-col max-w-md m-10 bg-white p-10 rounded-lg shadow-md space-y-5"
      onSubmit={handleSubmit}
    >
      {/* header */}
      <div className="text-lg">🙌Manage Team</div>

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

      <span className="text-md">Team</span>

      {/* current user */}
      <div className="flex flex-row">
        <img src={user.avatarUrl} alt="asdf" className="rounded-full w-12" />
        <span className="flex flex-col items-start ml-2">
          <span className="text-md text-gray-500">
            {user.firstName + " " + user.lastName}

            <span className="text-gray-700 ml-1 bg-gray-200 p-1 rounded-md text-xs font-bold mt-2">
              admin
            </span>
          </span>
          <span className="text-sm text-gray-200">{user.emailAddress}</span>
        </span>
      </div>

      {teamMembers.map((tmember, i) => {
        return (
          <div key={i} className="flex flex-row">
            <div className="rounded-full w-12 pulse" />

            <span className="flex flex-col items-start ml-2">
              <span className="text-md text-gray-500">
                {tmember.inviteEmailAddress}
              </span>
              <span className="text-sm text-gray-200">{user.emailAddress}</span>
            </span>
          </div>
        );
      })}

      <Divider />

      <span className="flex flex-row justify-end space-x-2">
        <button
          onClick={() => router.push("/teams")}
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
  );
}
