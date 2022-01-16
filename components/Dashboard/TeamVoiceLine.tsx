import { useRouter } from "next/router";
import { FaPlus, FaExternalLinkAlt, FaLink, FaBackward } from "react-icons/fa";
import { IoPulseOutline, IoRemoveOutline, IoTimer } from "react-icons/io5";
import { MdScreenShare } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { useTeamDashboardContext } from "../../contexts/teamDashboardContext";
import { User, UserStatus } from "../../models/user";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { TeamMemberRole, TeamMemberStatus } from "../../models/teamMember";
import UserService from "../../services/userService";
import {
  collection,
  doc,
  DocumentSnapshot,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
  where,
} from "firebase/firestore";
import { Collections } from "../../services/collections";
import { KeyCode } from "../../globals/keycode";
import { Tooltip } from "antd";
import { useAudioContext } from "../../contexts/audioContext";
import UserStatusBubble, { UserPulse } from "../UserStatusBubble";
import { useAuth } from "../../contexts/authContext";
import { Message } from "../../models/message";

const db = getFirestore();

const maxNumberOfKeyboardMappings: number = 9;

// date of yesterday to check if messages are after yesterday
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export default function TeamVoiceLine() {
  const { currUser } = useAuth();
  const {
    addTeamShortcutBinding,
    selectTeamMember,
    selectedTeammate,
    isRecording,
  } = useAudioContext();
  const router = useRouter();
  const { teamid } = router.query;
  const { team, user, userTeamMember, teamMembers } = useTeamDashboardContext();
  const [loading, setLoading] = useState<Boolean>(true);

  const [teamUsers, setTeamUsers] = useState<User[]>([]);

  // setup listeners for each teammate or their status changes
  useEffect(() => {
    const unsubs: Unsubscribe[] = [];

    (async function () {
      try {
        // listeners for all teammates' status
        if (teamMembers) {
          teamMembers.map((tmember) => {
            if (tmember.status == TeamMemberStatus.activated) {
              const docRef = doc(db, Collections.users, tmember.userId);

              const unsub = onSnapshot(docRef, (doc) => {
                const updatedteamMateUser = doc.data() as User;

                setTeamUsers((prevTeamUsers) => {
                  const newTeamUsers = prevTeamUsers.filter(
                    (tm) => tm.id != updatedteamMateUser.id
                  );
                  newTeamUsers.push(updatedteamMateUser);

                  return newTeamUsers;
                });
              });

              unsubs.push(unsub);
            }

            return;
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        router.push("/teams/landing");
      }

      setLoading(false);
    })();

    return () => {
      unsubs.map((listener) => listener());
    };
  }, []);

  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [messagesByTeamMate, setMessagesByTeamMate] = useState<{}>({});

  // listener for all incoming messages
  useEffect(() => {
    var unsubscribe: Unsubscribe;

    (async function () {
      // todo for new messages, change document.title

      /**
       * QUERY:
       * - last 24 hours only
       * - any message that I have sent or received: relevant messages
       * - order by: date desc
       */
      const q = query(
        collection(db, Collections.audioMessages),
        where("senderReceiver", "array-contains", currUser.uid),
        where("createdDate", ">", yesterday),
        orderBy("createdDate", "asc")
      );
      unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          // no need to process results again, just append to arrays instead
          // messages won't be deleted or updated really
          if (change.type === "added") {
            let newMessage = change.doc.data() as Message;
            console.log("New message: ", newMessage);

            // update all messages array
            setAllMessages((prevMessages) => [newMessage, ...prevMessages]);

            // update map of teammate to relevant messages
            setMessagesByTeamMate((prevMap) => {
              console.log("settting state");
              // if the map contains the teammate userid already, then cool, just unshift to that array
              const newMap = { ...prevMap };
              if (newMessage.receiverUserId in prevMap) {
                newMap[newMessage.receiverUserId] = [
                  newMessage,
                  ...prevMap[newMessage.receiverUserId],
                ];
              } // if this is the first relevant message linked to this receiver,
              //then create a new array
              else {
                newMap[newMessage.receiverUserId] = [newMessage];
              }

              return newMap;
            });
          }
          if (change.type === "modified") {
            console.log("Modified message: ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed message: ", change.doc.data());
          }
        });
      });
    })();

    return () => unsubscribe();
  }, []);

  console.log(messagesByTeamMate);

  // set up shortcuts for each teammate
  useEffect(() => {
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
    if (!teamUsers.length) {
      return <span className="text-gray-300">Please add team members.</span>;
    }

    return teamUsers.map((tmember, i) => {
      return (
        <span
          onClick={() => selectTeamMember(tmember.id)}
          key={i}
          className={`rounded flex flex-row items-center py-2 px-2 justify-items-start ease-in-out duration-300 hover:cursor-pointer ${
            tmember.id == selectedTeammate ? "bg-white scale-150 z-20" : ""
          }`}
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
                </span>

                <span className={"text-xs span-sans text-gray-500"}>
                  {tmember.teamRole}
                </span>
              </>
            ) : (
              <>
                <span className="flex flex-row items-center space-x-2">
                  <span className="text-sm text-white font-bold">
                    {tmember.nickName}
                  </span>

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
