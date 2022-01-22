import { Avatar } from "antd";
import { useAuth } from "../contexts/authContext";
import { useTeamDashboardContext } from "../contexts/teamDashboardContext";
import OfficeRoom, { OfficeRoomState } from "../models/officeRoom";
import { User } from "../models/user";

interface IOfficeCard {
  officeRoom: OfficeRoom;
}

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

  return (
    <span className="flex flex-col">
      <span className="flex flex-row justify-start items-center">
        {renderOfficePulse(props.officeRoom.state)}

        {/* office location name */}
        <span className="text-gray-200 text-md font-semibold ml-2">
          {props.officeRoom.name}
        </span>

        {/* all members in room */}
        <span className="ml-auto">
          <Avatar.Group>
            {allMembersInRoom.map((member) => {
              <Avatar
                src={member.avatarUrl}
                style={{ backgroundColor: "teal", verticalAlign: "middle" }}
                className="shadow-xl hover:z-20 hover:cursor-pointer"
              >
                {member.nickName[0]}
              </Avatar>;
            })}
          </Avatar.Group>
        </span>
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
