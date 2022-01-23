import { Tooltip } from "antd";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { useTeamDashboardContext } from "../../contexts/teamDashboardContext";
import OfficeRoom from "../../models/officeRoom";
import { Collections } from "../../services/collections";
import OfficeRoomService from "../../services/officeRoomService";
import OfficeCard from "../OfficeCard";

const db = getFirestore();

const officeRoomService = new OfficeRoomService();

export default function Office() {
  const { currUser } = useAuth();
  const { team } = useTeamDashboardContext();

  const [officeRoomsMap, setOfficeRoomsMap] = useState<Map<string, OfficeRoom>>(
    new Map<string, OfficeRoom>()
  );

  // get all offices for this team : realtime
  useEffect(() => {
    /**
     * QUERY:
     * all offices for this team
     *
     */
    const q = query(
      collection(db, Collections.officeRooms),
      where("teamId", "==", team.id)
    );

    // return unsubscribe
    return onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        // seed data and create the initial rooms
        console.log("seeding office rooms for this team");
        officeRoomService.createInitialOfficeRooms(currUser.uid, team.id);
        return;
      }

      snapshot.docChanges().forEach((change) => {
        let updatedOfficeRoom = change.doc.data() as OfficeRoom;
        updatedOfficeRoom.id = change.doc.id;

        if (change.type === "added" || change.type === "modified") {
          // update office rooms map on change of the room
          setOfficeRoomsMap((prevMap) => {
            return new Map(
              prevMap.set(updatedOfficeRoom.id, updatedOfficeRoom)
            );
          });
        }
        if (change.type === "removed") {
          console.log("Removed office room: ", updatedOfficeRoom);
        }
      });
    });
  }, []);

  const allOfficeRooms = Array.from(officeRoomsMap.values());

  allOfficeRooms.sort((a, b) => {
    if (a.name < b.name) {
      return 1;
    }

    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  // if there are none, then show user button to create initial office rooms and then create them

  return (
    <section className="p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md w-96 shrink-0 flex-1 overflow-auto">
      <Tooltip
        title={
          "Tell teammates above to chat in the 'kitchen' or other places in the office."
        }
      >
        <span className="flex flex-row justify-start items-center pb-5">
          <span className="flex flex-col">
            <span className="text-white uppercase">Office</span>
          </span>
        </span>
      </Tooltip>

      {/* all office rooms  */}
      <span className="flex flex-col overflow-auto pr-2 space-y-2">
        {allOfficeRooms.map((officeRoom) => (
          <OfficeCard key={officeRoom.id} officeRoom={officeRoom} />
        ))}
        {/* <OfficeCard /> */}
      </span>
    </section>
  );
}
