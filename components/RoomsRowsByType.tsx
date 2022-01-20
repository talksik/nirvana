import Room, { RoomType } from "../models/room";
import RoomCard from "./RoomCard";

interface IRoomsData {
  rooms: Room[];
}

// different rows for the types
export function RoomsRowsByType(props: IRoomsData) {
  // got the top level content/rooms
  // now let's drill down and filter
  const recurringRooms = props.rooms.filter(
    (room) => room.type == RoomType.recurring
  );

  const scheduledRooms = props.rooms.filter(
    (room) => room.type == RoomType.scheduled
  );

  const nowRooms = props.rooms.filter(
    (room) => room.type == RoomType.scheduled
  );

  return;
  // return props.rooms.map((room) => {
  //   // if the room is
  //   return (
  //     <RoomCard
  //       key={room.id}
  //       room={room}
  //       updateRoomHandler={handleUpdateRoom}
  //     />
  //   );
  // })
}

// simple table for the archived rooms
export function ArchivedRoomsTable(props: IRoomsData) {}
