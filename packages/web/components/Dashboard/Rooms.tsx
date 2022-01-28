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
import moment from "moment";
import { getTime } from "../../helpers/dateTime";

enum RoomTypeFilter {
  team = "team",
  me = "me",
  archived = "archived",
}

enum RoomTimeFilter {
  today = "today",
  week = "week",
  month = "month",
}

const db = getFirestore();

const today = new Date();
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

  // get scheduled rooms data realtime: the ones with the date range
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

  const archivedRooms = allRooms.filter(
    (room) => room.status == RoomStatus.archived
  );

  // data for different meRooms
  const recurring = meRooms.filter(
    (room) => room.type == RoomType.recurring && room.status == RoomStatus.empty
  );
  const now = meRooms.filter(
    (room) =>
      (room.type == RoomType.now && room.status != RoomStatus.archived) ||
      room.status == RoomStatus.live
  );
  const scheduled = meRooms.filter(
    (room) => room.type == RoomType.scheduled && room.status == RoomStatus.empty
  );

  // sorting array of scheduled rooms
  scheduled.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    if (!b.scheduledDateTime) {
      return -1;
    }

    return (
      getTime(a.scheduledDateTime.toDate()) -
      getTime(b.scheduledDateTime.toDate())
    );
  });

  var relativeTimeNextMeeting = "";

  // go through scheduled and find the first one coming up
  if (scheduled && scheduled.length > 0) {
    const firstOneInFuture = scheduled.find(
      (room) => moment(room.scheduledDateTime.toDate()).diff(today) > 0
    );

    if (firstOneInFuture) {
      const meetingDatetime: Date = firstOneInFuture.scheduledDateTime.toDate();
      relativeTimeNextMeeting = moment(meetingDatetime).fromNow();
    }
  }

  function getRoomContent() {
    // return data based on the selected filters
    switch (selectedTabPane) {
      case RoomTypeFilter.team:
        // render sections for different types

        const recurringTeam = teamRooms.filter(
          (room) =>
            room.type == RoomType.recurring && room.status == RoomStatus.empty
        );

        const nowTeam = teamRooms.filter(
          (room) =>
            (room.type == RoomType.now && room.status != RoomStatus.archived) ||
            room.status == RoomStatus.live
        );

        const scheduledTeam = teamRooms.filter(
          (room) =>
            room.type == RoomType.scheduled && room.status == RoomStatus.empty
        );

        // sorting array of scheduled rooms
        scheduledTeam.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          if (!b.scheduledDateTime) {
            return -1;
          }

          return (
            getTime(a.scheduledDateTime.toDate()) -
            getTime(b.scheduledDateTime.toDate())
          );
        });

        return (
          <>
            <div className="flex flex-row flex-wrap">
              {nowTeam.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  updateRoomHandler={handleUpdateRoom}
                />
              ))}

              {scheduledTeam.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  updateRoomHandler={handleUpdateRoom}
                />
              ))}

              {recurringTeam.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  updateRoomHandler={handleUpdateRoom}
                />
              ))}
            </div>
          </>
        );

      case RoomTypeFilter.me:
        return (
          <>
            <div className="flex flex-row flex-wrap">
              {now.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  updateRoomHandler={handleUpdateRoom}
                />
              ))}

              {scheduled.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  updateRoomHandler={handleUpdateRoom}
                />
              ))}

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
      case RoomTypeFilter.archived:
        return (
          <span className="flex flex-col space-y-5 px-10">
            {archivedRooms.map((room) => {
              // if the room is
              return (
                <RoomCard
                  key={room.id}
                  room={room}
                  updateRoomHandler={handleUpdateRoom}
                />
              );
            })}
          </span>
        );
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
    <section className="p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md flex-1 overflow-auto">
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
              <Tooltip
                title={"Press q to create an instant room if you have GSuite."}
              >
                <button
                  className="right-1 rounded-lg py-1 px-2 ml-1 
                                        shadow-md text-center text-white text-sm font-bold"
                >
                  Q
                </button>
              </Tooltip>
            </span>
            {relativeTimeNextMeeting ? (
              <span className="text-gray-300 text-xs">
                {"You have your next scheduled one "}{" "}
                <span className="text-orange-500">
                  {relativeTimeNextMeeting}
                  {"."}
                </span>
              </span>
            ) : (
              <></>
            )}
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
      <span className="overflow-auto">{getRoomContent()}</span>
    </section>
  );
}