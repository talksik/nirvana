import { Divider } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { Team, TeamStatus } from "../../models/team";
import { User, UserStatus } from "../../models/user";
import TeamService from "../../services/teamService";

const initialSite: string = "https://";

const teamService = new TeamService();

export default function CreateTeam() {
  const { currUser } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();

  useEffect(() => {
    (async function () {
      try {
        // if not authenticated, take user to the login
        if (!currUser) {
          console.log(
            "not authenticated...routing from dashboard to teams home"
          );
          router.push("/teams/login");
        }

        // todo if user is in a team already, notify them to make sure
        // buttt most likely will already be routed to the correct place from the router...don't do the router's job
      } catch (error) {
        console.log(error);
        router.push("/teams/login");
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
      team.createdByUserId = currUser.uid;
      team.status = TeamStatus.created;
      team.allowedUserCount = 2;

      if (companySite != initialSite) {
        // make sure to put null in database for the team
        team.companySite = companySite;
      }

      // provision a team with state of initiated
      const createdTeamId = await teamService.createTeam(team);
      router.push("/teams/" + createdTeamId);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }

  const [teamName, setTeamName] = useState<string>("");
  const [companySite, setcompanySite] = useState<string>(initialSite);

  return (
    <form
      className="container mx-auto flex flex-col max-w-md m-10 bg-white p-10 rounded-lg shadow-md space-y-5"
      onSubmit={handleSubmit}
    >
      {/* header */}
      <div className="text-lg">🙌Create a Team</div>

      {error && <span className="text-red-300 text-md">{error}</span>}

      <Divider />

      <span className="flex flex-col items-start">
        <span className="text-md">Team Name</span>
        <span className="text-gray-300 text-xs mb-2">
          Everyone in your team will see this. You can always change this later.
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
          onClick={(e) => {
            e.preventDefault();
            router.push("/teams");
          }}
          className="bg-gray-100 py-2 px-5 rounded text-gray-400"
        >
          Cancel
        </button>
        {loading ? (
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
            role="status"
          >
            <span className="text-black hidden">Loading...</span>
          </div>
        ) : (
          <button
            type="submit"
            className="text-sm text-white font-semibold py-2 px-5 bg-teal-500 rounded"
          >
            {"Continue ->"}
          </button>
        )}
      </span>
    </form>
  );
}
