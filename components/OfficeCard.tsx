import { Avatar, Tooltip } from "antd";
import toast from "react-hot-toast";
import { FaPhoneSlash, FaPlus } from "react-icons/fa";
import { useAuth } from "../contexts/authContext";
import { useTeamDashboardContext } from "../contexts/teamDashboardContext";
import OfficeRoom, { OfficeRoomState } from "../models/officeRoom";
import { User } from "../models/user";
import OfficeRoomService from "../services/officeRoomService";
import { VscDebugDisconnect } from "react-icons/vsc";

interface IOfficeCard {
  officeRoom: OfficeRoom;
}

const officeRoomService = new OfficeRoomService();

export default function OfficeCard(props: IOfficeCard) {
  const { currUser } = useAuth();
  const { teamUsersMap, user } = useTeamDashboardContext();

  var allMembersInRoom = props.officeRoom.members?.reduce((results, userId) => {
    if (userId in teamUsersMap) {
      results.push(teamUsersMap[userId]);
    }

    if (userId == currUser.uid) {
      results.push(user);
    }

    return results;
  }, [] as User[]);

  async function handleJoinOfficeRoom() {
    // make sure user is not in another room
    // get agora token from cloud function
    // join channel for agora

    if (props.officeRoom.members.includes(currUser.uid)) {
      toast.error("You are already in this office room!");
      return;
    }

    try {
      const newMembers = [...props.officeRoom.members, currUser.uid];
      await officeRoomService.updateMembersInOfficeRoom(
        props.officeRoom.id,
        newMembers
      );
    } catch (error) {
      console.error(error);
      toast.error("problem joining office room");
    }
  }

  async function handleLeaveOfficeRoom() {
    // leave the channel for agora

    // leave from firestore database
    if (!props.officeRoom.members.includes(currUser.uid)) {
      toast.error("You are not in this office room!");
      return;
    }

    try {
      const newMembersInRoom = props.officeRoom.members.filter(
        (memberId) => memberId != currUser.uid
      );

      await officeRoomService.updateMembersInOfficeRoom(
        props.officeRoom.id,
        newMembersInRoom
      );
    } catch (error) {
      console.error(error);
      toast.error("problem leaving office room");
    }
  }

  // check if user is in the office room
  var isUserInRoom: boolean = false;
  if (props.officeRoom.members?.includes(currUser.uid)) {
    isUserInRoom = true;
  }

  return (
    <span
      className={`flex flex-col transition-all duration-300 hover:bg-gray-200 hover:bg-opacity-25
     py-5 px-3 rounded-lg ${isUserInRoom ? "bg-orange-500 bg-opacity-25" : ""}`}
    >
      <span className="flex flex-row justify-start items-center">
        {renderOfficePulse(props.officeRoom.state)}

        {/* office location name */}
        <span className="text-gray-200 text-md font-semibold ml-2">
          {props.officeRoom.name}
        </span>

        {/* all members in room */}
        <span className="ml-auto items-center flex">
          <Avatar.Group>
            {allMembersInRoom.map((member) => {
              return (
                <Tooltip key={member.id} title={member.nickName}>
                  <Avatar
                    src={member.avatarUrl}
                    style={{ backgroundColor: "teal", verticalAlign: "middle" }}
                    className="shadow-xl hover:z-20 hover:cursor-pointer"
                  >
                    {member.nickName[0]}
                  </Avatar>
                </Tooltip>
              );
            })}
          </Avatar.Group>
        </span>

        {isUserInRoom ? (
          <button
            onClick={handleLeaveOfficeRoom}
            className="ml-2 bg-orange-500 bg-opacity-40 p-2 rounded"
          >
            <VscDebugDisconnect className="text-orange-500 text-xl" />
          </button>
        ) : (
          <button
            onClick={handleJoinOfficeRoom}
            className="bg-gray-300 bg-opacity-25 p-2 rounded hover:bg-opacity-40"
          >
            <FaPlus className="text-lg text-white" />
          </button>
        )}
      </span>
    </span>
  );
}

function renderOfficePulse(officeRoomState: OfficeRoomState) {
  switch (officeRoomState) {
    case OfficeRoomState.active:
      return (
        <span className="h-4 w-4 rounded-full bg-green-500 animate-pulse shadow-lg"></span>
      );
    case OfficeRoomState.idle:
      return (
        <span className="h-4 w-4 rounded-full bg-gray-400 animate-pulse shadow-lg"></span>
      );
    default:
      return (
        <span className="h-4 w-4 rounded-full bg-gray-400 animate-pulse shadow-lg"></span>
      );
  }
}
