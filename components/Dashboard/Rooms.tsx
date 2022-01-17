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
import Room, { RoomType } from "../../models/room";
import { useAuth } from "../../contexts/authContext";
import { Radio } from "antd";
import RoomCard from "../RoomCard";

enum RoomTypeFilter {
  all = "all",
  me = "me",
  now = "now",
  scheduled = "scheduled",
  recurring = "recurring",
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

  function getRoomContent() {
    // return data based on the selected filters
    switch (selectedTabPane) {
      case RoomTypeFilter.all:
        return allRooms;
      case RoomTypeFilter.me:
        const meRooms = allRooms.filter((room) =>
          room.members.includes(currUser.uid)
        );
        return meRooms;
      case RoomTypeFilter.now:
        const nowRooms = allRooms.filter((room) => room.type == RoomType.now);
        return nowRooms;
      case RoomTypeFilter.scheduled:
        const scheduledRooms = allRooms.filter(
          (room) => room.type == RoomType.scheduled
        );
        return scheduledRooms;
      case RoomTypeFilter.recurring:
        const recurringRooms = allRooms.filter(
          (room) => room.type == RoomType.recurring
        );
        return recurringRooms;
      case RoomTypeFilter.archived:
        const archivedRooms = allRooms.filter(
          (room) => room.type == RoomType.archived
        );
        return archivedRooms;
      default:
        return allRooms;
    }
  }

  return (
    <section className="p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md">
      {/*  modal for creating room */}
      <CreateRoom />

      {/* header */}
      <span className="flex flex-row justify-end space-x-3 pb-5 items-center">
        <span className="text-white mr-auto">
          ROOMS
          <button
            className="right-1 rounded-lg py-1 px-2 ml-1 
              shadow-md text-center text-white text-sm font-bold"
          >
            CTRL + Q
          </button>
        </span>

        <Radio.Group
          value={selectedTabPane}
          onChange={(e) => setSelectedTabPane(e.target.value)}
        >
          <Radio.Button value={RoomTypeFilter.all}>
            {RoomTypeFilter.all}
          </Radio.Button>
          <Radio.Button value={RoomTypeFilter.me}>
            {RoomTypeFilter.me}
          </Radio.Button>
          <Radio.Button value={RoomTypeFilter.now}>
            {RoomTypeFilter.now}
          </Radio.Button>
          <Radio.Button value={RoomTypeFilter.scheduled}>
            {RoomTypeFilter.scheduled}
          </Radio.Button>
          <Radio.Button value={RoomTypeFilter.recurring}>
            {RoomTypeFilter.recurring}
          </Radio.Button>
          <Radio.Button value={RoomTypeFilter.archived}>
            {RoomTypeFilter.archived}
          </Radio.Button>
        </Radio.Group>

        <span className="text-sm text-gray-300 flex flex-row items-center uppercase">
          Week <FaAngleDown />
        </span>

        <button
          onClick={() => handleModalType(ShowModalType.createRoom)}
          className="bg-gray-300 bg-opacity-25 p-2 rounded hover:bg-opacity-40"
        >
          <FaPlus className="text-lg text-white" />
        </button>

        <BsThreeDots className="text-xl text-white" />
      </span>

      {/* all rooms */}
      <span className="flex flex-row flex-wrap max-h-96 overflow-auto">
        {getRoomContent().map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </span>
    </section>
  );
}
