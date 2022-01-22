import { Avatar } from "antd";
import OfficeRoom, { OfficeRoomState } from "../models/officeRoom";

interface IOfficeCard {
  officeRoom: OfficeRoom;
}

export default function OfficeCard(props: IOfficeCard) {
  return (
    <span className="flex flex-col">
      <span className="flex flex-row justify-start items-center">
        {renderOfficePulse(OfficeRoomState.active)}

        {/* office location name */}
        <span className="text-gray-200 text-lg font-semibold ml-2">
          {props.officeRoom.name}
        </span>

        {/* all members in room */}
        <span className="ml-auto">
          <Avatar.Group>
            {props.officeRoom.members.map((officeLocation) => {
              <Avatar
                style={{ backgroundColor: "teal", verticalAlign: "middle" }}
                className="shadow-xl hover:z-20 hover:cursor-pointer"
              >
                {officeLocation[0]}
              </Avatar>;
            })}
          </Avatar.Group>
        </span>
      </span>
    </span>
  );
}

function renderOfficePulse(officeRoomState: OfficeRoomState) {
  return (
    <span className="h-4 w-4 rounded-full bg-green-500 animate-pulse shadow-lg"></span>
  );
}
