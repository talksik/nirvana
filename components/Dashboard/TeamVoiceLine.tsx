import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import { IoPulseOutline, IoRemoveOutline, IoTimer } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { useTeamDashboardContext } from "../../contexts/teamDashboardContext";
import { User, UserStatus } from "../../models/user";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { TeamMemberRole } from "../../models/teamMember";
import UserService from "../../services/userService";
import { DocumentSnapshot, Unsubscribe } from "firebase/firestore";

const userService = new UserService();

function statusBubble(status: UserStatus) {
  console.log(status);

  switch (status) {
    case UserStatus.online:
      return (
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></span>
      );
    case UserStatus.busy:
      return (
        <span className="absolute top-0 right-0 w-3 h-3 bg-orange-400 rounded-full"></span>
      );
    case UserStatus.offline:
      return (
        <span className="absolute top-0 right-0 w-3 h-3 bg-gray-400 rounded-full"></span>
      );
    default:
      return (
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></span>
      );
  }
}

function renderPulse(status: UserStatus) {
  switch (status) {
    case UserStatus.online:
      return (
        <IoPulseOutline className="text-green-500 text-2xl animate-pulse mx-2 ml-auto" />
      );
    case UserStatus.busy:
      return (
        <IoPulseOutline className="text-orange-400 text-2xl animate-pulse mx-2 ml-auto" />
      );
    case UserStatus.offline:
      return (
        <IoRemoveOutline className="text-gray-400 text-2xl mx-2 ml-auto" />
      );
    default:
      return (
        <IoPulseOutline className="text-green-400 text-2xl animate-pulse mx-2 ml-auto" />
      );
  }
}

export default function TeamVoiceLine() {
  const router = useRouter();
  const { teamid } = router.query;
  const { team, user, userTeamMember, teamMembers } = useTeamDashboardContext();
  const [loading, setLoading] = useState<Boolean>(true);

  const [teamUsers, setTeamUsers] = useState<User[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const unsubs: Unsubscribe[] = [];

    (async function () {
      try {
        // listeners for all teammates' status
        if (teamMembers) {
          teamMembers.forEach(async (tmember) => {
            const unsub = await userService.getUserRealtime(
              tmember.userId,
              (doc: DocumentSnapshot) => {
                // setTeamUsers((prevTeamUsers) => ({
                //   ...prevTeamUsers,
                // }));

                // updated user
                const updatedUser = doc.data() as User;

                // update the teamUsers array in state
                const newUsers: User[] = teamUsers.map((user, i) => {
                  if (user.id == updatedUser.id) {
                    return updatedUser;
                  }

                  return user;
                });

                setTeamUsers(newUsers);
              }
            );

            unsubs.push(unsub);
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        router.push("/teams/login");
      }

      setLoading(false);
    })();

    return () => {
      unsubs.map((listener) => listener());
    };
  }, []);

  async function handleAdminRoute() {
    if (userTeamMember.role == TeamMemberRole.admin) {
      router.push("/teams/" + teamid + "/admin");
      return;
    }

    toast.error("You are not a team admin!");
  }

  function renderTeamMemberList() {
    // show loading skeleton if not yet got friend info
    if (loading) {
      return (
        <div className="w-full h-24 flex animate-pulse flex-row items-center justify-center space-x-5">
          <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
          <div className="flex flex-col space-y-3">
            <div className="w-60 bg-gray-300 h-6 rounded-md "></div>
            <div className="w-40 bg-gray-300 h-6 rounded-md "></div>
          </div>
        </div>
      );
    }

    // if not teammates, stale state message to tell admin to add people
    if (!teamUsers.length) {
      return <span className="text-gray-300">Please add team members.</span>;
    }

    return teamMembers.map((tmember, i) => {
      return (
        <span
          key={i}
          className={
            "flex flex-row items-center py-2 px-2 justify-items-start ease-in-out duration-300"
          }
        >
          <span className="relative flex mr-2">
            <span className="bg-gray-200 bg-opacity-30 rounded-full shadow-md absolute w-full h-full"></span>

            {statusBubble(UserStatus.online)}

            <img src={""} alt="asdf" className="rounded-full w-12" />
          </span>

          <span className="flex flex-col mr-10">
            <span className="flex flex-row items-center space-x-2">
              <span className="text-sm text-white font-bold">
                {tmember.inviteEmailAddress}
              </span>
            </span>

            <span className={"text-xs span-sans text-gray-300"}>
              {tmember.role}
            </span>
          </span>

          {renderPulse(UserStatus.online)}
        </span>
      );
    });
  }

  return (
    <section className="p-5 flex flex-col w-full max-w-sm bg-gray-100 bg-opacity-25 rounded-lg shadow-md">
      <span className="flex flex-row justify-start items-center pb-5">
        <span className="flex flex-col">
          <span className="text-white">TEAM</span>
        </span>

        <button
          onClick={handleAdminRoute}
          className="bg-gray-300 bg-opacity-25 p-2 ml-auto rounded hover:bg-opacity-40"
        >
          <FaPlus className="text-lg text-white" />
        </button>
      </span>
      {/* list of team members */}
      {renderTeamMemberList()}
    </section>
  );
}
