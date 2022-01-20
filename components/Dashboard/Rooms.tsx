import React, { useEffect, useState } from "react";

import { FaAngleDown, FaBell, FaClock, FaPlus, FaLink } from "react-icons/fa";
import { IoTimer } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import CreateOrUpdateRoom from "../Modals/CreateOrUpdateRoom";
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
import { Divider, Dropdown, Menu, Radio, Tooltip } from "antd";
import RoomCard from "../RoomCard";
import toast from "react-hot-toast";
import RoomTypeTag from "../RoomTypeTag";

enum RoomTypeFilter {
  team = "team",
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
const nextWeek = new Date();
nextWeek.setDate(nextWeek.getDate() + 7);

export default function DashboardRoom() {
  const { currUser } = useAuth();
  const { handleModalType, showModalType } = useKeyboardContext();
  const { team } = useTeamDashboardContext();

  const [roomsMap, setRoomsMap] = useState<Map<string, Room>>(
    new Map<string, Room>()
  );

  // get recurring rooms data realtime: ALL of them
  useEffect(() => {
    /**
     * QUERY:
     * all recurring rooms, as the created date can be a year ago
     *
     */
    const q = query(
      collection(db, Collections.rooms),
      where("teamId", "==", team.id),
      where("type", "==", RoomType.recurring)
    );

    // return unsubscribe
    return onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(handleDocChange);
    });
  }, []);

  // get scheduled rooms data realtime
  useEffect(() => {
    /**
     * QUERY:
     * all scheduled rooms in the past 7 days or the next 7 days
     *
     */
    const q = query(
      collection(db, Collections.rooms),
      where("teamId", "==", team.id),
      where("type", "==", RoomType.scheduled),
      where("scheduledDateTime", ">", lastWeek),
      where("scheduledDateTime", "<", nextWeek),
      orderBy("scheduledDateTime", "asc")
    );

    // return unsubscribe
    return onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(handleDocChange);
    });
  }, []);

  // get now rooms data realtime
  useEffect(() => {
    /**
     * QUERY:
     * all live/now rooms going on right now
     *
     */
    const q = query(
      collection(db, Collections.rooms),
      where("teamId", "==", team.id),
      where("type", "==", RoomType.now),
      where("createdDate", ">", lastWeek),
      orderBy("createdDate", "asc")
    );

    // return unsubscribe
    return onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(handleDocChange);
    });
  }, []);

  function handleDocChange(change) {
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
  }

  // on CTRL + Q, new tab to google meet
  // on CTRL + V, show modal to create meeting with the link

  const [selectedTabPane, setSelectedTabPane] = useState<string>(
    RoomTypeFilter.me
  );

  // sort this mega array
  const allRooms = Array.from(roomsMap.values());

  const teamRooms = allRooms.filter(
    (room) => room.status != RoomStatus.archived
  );
  const meRooms = allRooms.filter(
    (room) =>
      room.members.includes(currUser.uid) && room.status != RoomStatus.archived
  );

  const liveRooms = allRooms.filter((room) => room.status == RoomStatus.live);
  const archivedRooms = allRooms.filter(
    (room) => room.status == RoomStatus.archived
  );

  function getRoomContent() {
    // return data based on the selected filters
    switch (selectedTabPane) {
      case RoomTypeFilter.team:
        return teamRooms.map((room) => {
          // if the room is
          return (
            <RoomCard
              key={room.id}
              room={room}
              updateRoomHandler={handleUpdateRoom}
            />
          );
        });
      case RoomTypeFilter.me:
        // render sections for different types

        const recurring = meRooms.filter(
          (room) =>
            room.type == RoomType.recurring && room.status == RoomStatus.empty
        );
        const now = meRooms.filter((room) => room.status == RoomStatus.live);
        const scheduled = meRooms.filter(
          (room) =>
            room.type == RoomType.scheduled && room.status == RoomStatus.empty
        );

        return (
          <>
            <span className="flex flex-row justify-start">
              <RoomTypeTag
                roomStatus={RoomStatus.live}
                roomType={RoomType.now}
              />
            </span>
            <div className="flex flex-row overflow-x-auto">
              {now.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  updateRoomHandler={handleUpdateRoom}
                />
              ))}
            </div>

            <Divider className="bg-gray-400" />

            <span className="flex flex-row justify-start">
              <RoomTypeTag
                roomStatus={RoomStatus.empty}
                roomType={RoomType.scheduled}
              />
            </span>
            <span className="text-gray-200">
              Your next room is in{" "}
              <span className="text-orange-500">20 minutes</span>
            </span>
            <div className="flex flex-row overflow-x-auto">
              {scheduled.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  updateRoomHandler={handleUpdateRoom}
                />
              ))}
            </div>

            <Divider className="bg-gray-400" />

            <span className="flex flex-row justify-start">
              <RoomTypeTag
                roomStatus={RoomStatus.empty}
                roomType={RoomType.recurring}
              />
            </span>
            <div className="flex flex-row overflow-x-auto">
              {recurring.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  updateRoomHandler={handleUpdateRoom}
                />
              ))}
            </div>
          </>
        );

      // return meRooms.map((room) => {
      //   return (
      //     <RoomCard
      //       key={room.id}
      //       room={room}
      //       updateRoomHandler={handleUpdateRoom}
      //     />
      //   );
      // });
      case RoomTypeFilter.live:
        return liveRooms.map((room) => {
          // if the room is
          return (
            <RoomCard
              key={room.id}
              room={room}
              updateRoomHandler={handleUpdateRoom}
            />
          );
        });
      case RoomTypeFilter.archived:
        return archivedRooms.map((room) => {
          // if the room is
          return (
            <RoomCard
              key={room.id}
              room={room}
              updateRoomHandler={handleUpdateRoom}
            />
          );
        });
      default:
        return allRooms.map((room) => {
          // if the room is
          return (
            <RoomCard
              key={room.id}
              room={room}
              updateRoomHandler={handleUpdateRoom}
            />
          );
        });
    }
  }

  const TimePeriodFilterMenu = (
    <Menu>
      <Menu.Item key={1} disabled>
        Past 24 Hours (Coming Soon)
      </Menu.Item>
      <Menu.Item key={2} disabled>
        This Month (Coming Soon)
      </Menu.Item>
    </Menu>
  );

  const [selectedUpdateRoom, setSelectedUpdateRoom] = useState<Room>(null);

  async function handleUpdateRoom(roomId: string) {
    console.log("going to update room");

    // get the room details and pass it into the modal
    if (!roomsMap.has(roomId)) {
      toast.error("not a valid room to edit");
      return;
    }

    // pass this to the modal for use
    setSelectedUpdateRoom(roomsMap.get(roomId));

    // call the keyboard context to show the modal
    handleModalType(ShowModalType.createRoom);
  }

  async function handleCloseModal() {
    console.log("closing modal");

    // to make sure that the next time the props changes, the modal has the updated room object
    setSelectedUpdateRoom(null);

    // close the modal
    handleModalType(ShowModalType.na);
  }

  return (
    <section className="p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md">
      {/*  modal for creating room */}
      <CreateOrUpdateRoom
        show={showModalType == ShowModalType.createRoom}
        updateRoom={selectedUpdateRoom}
        handleClose={handleCloseModal}
      />

      {/* header */}
      <Tooltip title={"  archive rooms to keep your team focused"}>
        <span className="flex flex-row justify-end space-x-3 pb-5 items-center">
          <span className="flex flex-col mr-auto">
            <span className="text-white ">
              ROOMS
              <button
                onClick={() => window.open("https://meet.google.com", "_blank")}
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
            <Radio.Button value={RoomTypeFilter.me}>
              {RoomTypeFilter.me}{" "}
              <span className="text-xs text-orange-500">
                {meRooms.length > 0 ? meRooms.length : ""}
              </span>
            </Radio.Button>
            <Radio.Button value={RoomTypeFilter.team}>
              {RoomTypeFilter.team}{" "}
              <span className="text-xs text-orange-500">
                {teamRooms.length}
              </span>
            </Radio.Button>
            <Radio.Button value={RoomTypeFilter.live}>
              {RoomTypeFilter.live}{" "}
              <span className="text-xs text-orange-500">
                {liveRooms.length > 0 ? liveRooms.length : ""}
              </span>
            </Radio.Button>
            <Radio.Button value={RoomTypeFilter.archived}>
              {RoomTypeFilter.archived}{" "}
              <span className="text-xs text-orange-500">
                {archivedRooms.length > 0 ? archivedRooms.length : ""}
              </span>
            </Radio.Button>
          </Radio.Group>

          <Dropdown overlay={TimePeriodFilterMenu}>
            <span className="text-sm text-gray-300 flex flex-row items-center uppercase hover:cursor-pointer">
              Week <FaAngleDown />
            </span>
          </Dropdown>

          <button
            onClick={() => {
              setSelectedUpdateRoom(null);
              handleModalType(ShowModalType.createRoom);
            }}
            className="bg-gray-300 bg-opacity-25 p-2 rounded hover:bg-opacity-40"
          >
            <FaPlus className="text-lg text-white" />
          </button>

          {/* <BsThreeDots className="text-xl text-white" /> */}
        </span>
      </Tooltip>

      {/* all rooms */}
      <span className="h-[32rem] overflow-auto">{getRoomContent()}</span>
    </section>
  );
}
