import React, { useEffect, useState } from "react";

import { FaAngleDown, FaBell, FaClock, FaPlus, FaLink } from "react-icons/fa";
import { IoTimer } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import CreateRoom from "../Modals/CreateRoom";
import {
  ShowModalType,
  useKeyboardContext,
} from "../../contexts/keyboardContext";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Collections } from "../../services/collections";
import { useTeamDashboardContext } from "../../contexts/teamDashboardContext";
import Room, { RoomStatus, RoomType } from "../../models/room";
import { useAuth } from "../../contexts/authContext";
import { Dropdown, Menu, Radio, Tooltip } from "antd";
import RoomCard from "../RoomCard";

enum RoomTypeFilter {
  all = "all",
  me = "me",
  live = "live",
  archived = "archived",
}

enum RoomTimeFilter {
  today = "today",
  week = "week",
  month = "month",
}

const db = getFirestore();

const lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 7);

export default function DashboardRoom() {
  const { currUser } = useAuth();
  const { handleModalType } = useKeyboardContext();
  const { team } = useTeamDashboardContext();

  const [roomsMap, setRoomsMap] = useState<Map<string, Room>>(
    new Map<string, Room>()
  );

  // get rooms data realtime
  useEffect(() => {
    /**
     * QUERY:
     * all rooms in the past week
     * order createdDate desc
     *
     */
    const q = query(
      collection(db, Collections.rooms),
      where("teamId", "==", team.id),
      where("createdDate", ">", lastWeek),
      orderBy("createdDate", "desc")
    );

    // return unsubscribe
    return onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let updatedRoom = change.doc.data() as Room;
        updatedRoom.id = change.doc.id;

        if (change.type === "added" || change.type === "modified") {
          console.log("New or updated room: ", updatedRoom);
          // update rooms map
          setRoomsMap((prevMap) => {
            return new Map(prevMap.set(updatedRoom.id, updatedRoom));
          });
        }
        if (change.type === "removed") {
          console.log("Removed room: ", updatedRoom);
        }
      });
    });
  }, []);

  // on CTRL + Q, new tab to google meet
  // on CTRL + V, show modal to create meeting with the link

  const [selectedTabPane, setSelectedTabPane] = useState<string>(
    RoomTypeFilter.all
  );

  // tab pane ui from scratch
  // function renderTabPane() {
  //   return (
  //     <span className="flex flex-row space-x-5 uppercase mr-5">
  //       <span
  //         onClick={() => setSelectedTabPane(RoomTypeFilter.all)}
  //         className={`${
  //           selectedTabPane == RoomTypeFilter.all
  //         } underline underline-offset-8 decoration-white text-white hover:text-white hover:cursor-pointer`}
  //       >
  //         All
  //       </span>

  //       <span
  //         onClick={() => setSelectedTabPane(RoomTypeFilter.me)}
  //         className="text-gray-300 hover:text-white hover:cursor-pointer"
  //       >
  //         Me
  //       </span>

  //       <span
  //         onClick={() => setSelectedTabPane(RoomTypeFilter.now)}
  //         className="text-gray-300 hover:text-white hover:cursor-pointer"
  //       >
  //         Now
  //       </span>

  //       <span
  //         onClick={() => setSelectedTabPane(RoomTypeFilter.scheduled)}
  //         className="text-gray-300 hover:text-white hover:cursor-pointer"
  //       >
  //         Scheduled
  //       </span>

  //       <span
  //         onClick={() => setSelectedTabPane(RoomTypeFilter.recurring)}
  //         className="text-gray-300 hover:text-white hover:cursor-pointer"
  //       >
  //         Recurring
  //       </span>

  //       <span
  //         onClick={() => setSelectedTabPane(RoomTypeFilter.archived)}
  //         className="text-gray-300 hover:text-white hover:cursor-pointer"
  //       >
  //         Archive
  //       </span>
  //     </span>
  //   );
  // }

  const allRooms = Array.from(roomsMap.values());
  const meRooms = allRooms.filter((room) =>
    room.members.includes(currUser.uid)
  );

  const liveRooms = allRooms.filter((room) => room.status == RoomStatus.live);
  const archivedRooms = allRooms.filter(
    (room) => room.status == RoomStatus.archived
  );

  function getRoomContent() {
    // return data based on the selected filters
    switch (selectedTabPane) {
      case RoomTypeFilter.all:
        return allRooms;
      case RoomTypeFilter.me:
        return meRooms;
      case RoomTypeFilter.live:
        return liveRooms;
      default:
        return allRooms;
    }
  }

  const TimePeriodFilterMenu = (
    <Menu>
      <Menu.Item key={1} disabled>
        Past 24 Hours (Coming Soon)
      </Menu.Item>
      <Menu.Item key={2} disabled>
        This Month(Coming Soon)
      </Menu.Item>
    </Menu>
  );

  return (
    <section className="p-5 w-full flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md">
      {/*  modal for creating room */}
      <CreateRoom />

      {/* header */}
      <Tooltip title={"  archive rooms to keep your team focused"}>
        <span className="flex flex-row justify-end space-x-3 pb-5 items-center">
          <span className="flex flex-col mr-auto">
            <span className="text-white ">
              Rooms
              <button
                className="right-1 rounded-lg py-1 px-2 ml-1 
                                        shadow-md text-center text-white text-sm font-bold"
              >
                CTRL + Q
              </button>
            </span>
            <span className="text-gray-300 text-xs"></span>
          </span>

          <Radio.Group
            value={selectedTabPane}
            onChange={(e) => setSelectedTabPane(e.target.value)}
          >
            <Radio.Button value={RoomTypeFilter.all}>
              {RoomTypeFilter.all}{" "}
              <span className="text-xs text-orange-500">{allRooms.length}</span>
            </Radio.Button>
            <Radio.Button value={RoomTypeFilter.me}>
              {RoomTypeFilter.me}{" "}
              <span className="text-xs text-orange-500">{meRooms.length}</span>
            </Radio.Button>
            <Radio.Button value={RoomTypeFilter.live}>
              {RoomTypeFilter.live}{" "}
              <span className="text-xs text-orange-500">
                {liveRooms.length}
              </span>
            </Radio.Button>
            <Radio.Button value={RoomTypeFilter.archived}>
              {RoomTypeFilter.archived}{" "}
              <span className="text-xs text-orange-500">
                {archivedRooms.length}
              </span>
            </Radio.Button>
          </Radio.Group>

          <Dropdown overlay={TimePeriodFilterMenu}>
            <span className="text-sm text-gray-300 flex flex-row items-center uppercase hover:cursor-pointer">
              Week <FaAngleDown />
            </span>
          </Dropdown>

          <button
            onClick={() => handleModalType(ShowModalType.createRoom)}
            className="bg-gray-300 bg-opacity-25 p-2 rounded hover:bg-opacity-40"
          >
            <FaPlus className="text-lg text-white" />
          </button>

          <BsThreeDots className="text-xl text-white" />
        </span>
      </Tooltip>

      {/* all rooms */}
      <span className="flex flex-row flex-wrap max-h-96 overflow-auto">
        {getRoomContent().map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </span>
    </section>
  );
}
