import { useRouter } from "next/router";
import { FaPlus, FaBackward, FaArrowCircleDown } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useTeamDashboardContext } from "../../contexts/teamDashboardContext";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { TeamMemberRole, TeamMemberStatus } from "../../models/teamMember";
import { getFirestore } from "firebase/firestore";
import { Tooltip } from "antd";
import { useKeyboardContext } from "../../contexts/keyboardContext";
import UserStatusBubble, { UserPulse } from "../UserStatusBubble";
import { useAuth } from "../../contexts/authContext";

const maxNumberOfKeyboardMappings: number = 9;

export default function TeamVoiceLine() {
  const { currUser } = useAuth();
  const {
    addTeamShortcutBinding,
    selectTeamMember,
    selectedTeammate,
    isRecording,
  } = useKeyboardContext();
  const router = useRouter();
  const { teamid } = router.query;
  const { userTeamMember, teamUsers, messagesByTeamMate } =
    useTeamDashboardContext();

  // todo use a global is loading
  const [loading, setLoading] = useState<Boolean>(false);

  // set up shortcuts for each teammate
  useEffect(() => {
    // create shortcuts
    if (!teamUsers) {
      console.log("no team members to map to shortcuts");
      return;
    }

    teamUsers.forEach((tmUser, i) => {
      // make sure we don't map a user if they are past the max allowed
      if (i < maxNumberOfKeyboardMappings) {
        let shortcut: number = i + 49; // 49 is what number 1 is on the keyboard
        addTeamShortcutBinding(shortcut, tmUser.id);
      }
    });
  }, [teamUsers]);

  async function handleAdminRoute() {
    if (userTeamMember.role == TeamMemberRole.admin) {
      router.push("/teams/" + teamid + "/admin");
      return;
    }

    toast.error("You are not a team admin!");
  }

  useEffect(() => {
    // todo move all variable stuff like shortcut mappings here
  }, [teamUsers]);

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
    if (!teamUsers) {
      return <span className="text-gray-300">Please add team members.</span>;
    }

    return teamUsers.map((tmember, i) => {
      var isMessageIncoming: boolean = false;
      if (
        messagesByTeamMate.has(tmember.id) &&
        messagesByTeamMate.get(tmember.id)[0]?.receiverUserId == currUser.uid
      ) {
        isMessageIncoming = true;
      }

      var customSelectClasses: string = "";
      if (tmember.id == selectedTeammate) {
        customSelectClasses = "bg-white scale-150 z-20";
      } else if (isMessageIncoming) {
        customSelectClasses = "bg-orange-500 bg-opacity-20";
      }

      return (
        <span
          onClick={() => selectTeamMember(tmember.id)}
          key={i}
          className={`rounded flex flex-row items-center py-2 px-2 justify-items-start ease-in-out duration-300 hover:cursor-pointer ${customSelectClasses}`}
        >
          <span className="relative flex mr-2">
            <span className="bg-gray-200 bg-opacity-30 rounded-full shadow-md absolute w-full h-full"></span>

            <UserStatusBubble status={tmember.userStatus} />

            <img
              src={tmember.avatarUrl}
              alt="asdf"
              className="rounded-full w-12"
            />
          </span>

          <span className="flex flex-col">
            {tmember.id == selectedTeammate ? (
              <>
                <span className="flex flex-row items-center space-x-2">
                  <span className="text-xs text-black font-bold">
                    {tmember.nickName}
                  </span>

                  {isMessageIncoming ? (
                    <FaArrowCircleDown className="text-orange-500" />
                  ) : (
                    ""
                  )}
                </span>

                <span className={"text-xs span-sans text-gray-500"}>
                  {tmember.teamRole}{" "}
                </span>
              </>
            ) : (
              <>
                <span className="flex flex-row items-center space-x-2">
                  <span className="text-sm text-white font-bold">
                    {tmember.nickName}
                  </span>

                  {isMessageIncoming ? (
                    <FaArrowCircleDown className="text-orange-500" />
                  ) : (
                    ""
                  )}

                  <span className="text-white shadow-xl font-bold px-3 py-1 rounded">
                    {/* keyboard shortcuts start from 1 */}
                    {i + 1}
                  </span>
                </span>

                <span className={"text-xs span-sans text-gray-300"}>
                  {tmember.teamRole}
                </span>
              </>
            )}
          </span>

          {tmember.id == selectedTeammate ? (
            <>
              <Tooltip title="press and hold R to send audio message">
                {isRecording ? (
                  <button className="ml-auto shadow-lg w-10 h-10 border-orange-400 bg-orange-400 bg-opacity-80 p-2 rounded hover:bg-opacity-100">
                    <span className="text-sm text-white font-bold">R</span>
                  </button>
                ) : (
                  <button className="ml-auto shadow-lg w-10 h-10 border-orange-400 bg-opacity-80 p-2 rounded hover:bg-opacity-100">
                    <span className="text-sm text-orange-500 font-bold">R</span>
                  </button>
                )}
              </Tooltip>

              <Tooltip title="press space to play last convo">
                <button className="ml-2 h-10 shadow-lg border-green-400 bg-opacity-80 p-2 rounded hover:bg-opacity-100">
                  <span className="text-sm text-green-500 font-bold">
                    SPACE
                  </span>
                </button>
              </Tooltip>

              <BsThreeDots className="text-black ml-2 hover:cursor-pointer" />
            </>
          ) : (
            <UserPulse status={tmember.userStatus} />
          )}
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

        <Tooltip title="power playback mode">
          <button className="bg-gray-300 bg-opacity-25 p-2 ml-auto rounded hover:bg-opacity-40">
            <FaBackward className="text-lg text-white" />
          </button>
        </Tooltip>

        <Tooltip title="add members">
          <button
            onClick={handleAdminRoute}
            className="bg-gray-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40"
          >
            <FaPlus className="text-lg text-white" />
          </button>
        </Tooltip>
      </span>
      {/* list of team members */}
      {renderTeamMemberList()}
    </section>
  );
}
