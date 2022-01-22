import { BsThreeDots } from "react-icons/bs";
import {
  FaArchive,
  FaBell,
  FaCalendarDay,
  FaClock,
  FaLink,
  FaPlus,
} from "react-icons/fa";
import { IoTimer } from "react-icons/io5";
import Room, { RoomStatus, RoomType } from "../models/room";
import RoomTypeTag from "./RoomTypeTag";
import Image from "next/image";
import { useAuth } from "../contexts/authContext";
import { Avatar, Divider, Dropdown, Menu, Popover, Tooltip } from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import { useTeamDashboardContext } from "../contexts/teamDashboardContext";
import { User, UserStatus } from "../models/user";
import RoomService from "../services/roomService";
import toast from "react-hot-toast";
import { useState } from "react";
import SkeletonLoader from "./Loading/skeletonLoader";
import { useKeyboardContext } from "../contexts/keyboardContext";
import UserService from "../services/userService";
import Moment from "react-moment";
import moment from "moment";

interface IRoomCardProps {
  room: Room;
  updateRoomHandler: Function;
}

const roomService = new RoomService();
const userService = new UserService();

const today = new Date();

export default function RoomCard(props: IRoomCardProps) {
  const { currUser } = useAuth();
  const { teamUsersMap, user } = useTeamDashboardContext();
  const [loading, setLoading] = useState<boolean>(false);

  var isUserInRoom: boolean;
  if (props.room.membersInRoom?.includes(currUser.uid)) {
    isUserInRoom = true;
  }

  // first array of all members invited
  var allMembersInvited = props.room.members?.reduce((results, userId) => {
    if (userId in teamUsersMap) {
      results.push(teamUsersMap[userId]);
    }

    if (userId == currUser.uid) {
      results.push(user);
    }

    return results;
  }, [] as User[]);

  // second array of all members in room
  var allMembersInRoom = props.room.membersInRoom?.reduce((results, userId) => {
    if (userId in teamUsersMap) {
      results.push(teamUsersMap[userId]);
    }

    if (userId == currUser.uid) {
      results.push(user);
    }

    return results;
  }, [] as User[]);

  // third array all members invited and not in the array of users in room
  const allMembersInvitedButNotInRoom = allMembersInvited.filter(
    (invitedMember) => {
      if (allMembersInRoom.some((user) => user.id === invitedMember.id)) {
        /* vendors contains the element we're looking for */
        return false;
      }

      return true;
    }
  );

  // show members who are in the invite list but not already in the room
  const membersInvited = () => {
    if (allMembersInvited?.length == 0) {
      return;
    }

    const listOfNames = allMembersInvited
      .map((user) => user.nickName)
      .join(", ");

    return (
      <Tooltip title={listOfNames}>
        <span className="inline-flex flex-row-reverse items-center shrink-0 mr-1">
          <Avatar.Group>
            {allMembersInvitedButNotInRoom.map((user, i) => {
              return (
                <Avatar
                  key={user.id}
                  src={user.avatarUrl}
                  className="shadow-xl"
                />
              );
            })}
          </Avatar.Group>
        </span>
      </Tooltip>
    );
  };

  const membersInRoom = () => {
    if (allMembersInRoom?.length == 0) {
      return;
    }

    const listOfNames = allMembersInRoom
      .map((user) => user.nickName)
      .join(", ");

    return (
      <Tooltip title={listOfNames}>
        <span className="inline-flex flex-row-reverse items-center shrink-0 mr-auto">
          <Avatar.Group>
            {allMembersInRoom.map((user, i) => {
              return (
                <Avatar
                  key={user.id}
                  src={user.avatarUrl}
                  className="shadow-xl"
                />
              );
            })}
          </Avatar.Group>
        </span>
      </Tooltip>
    );
  };

  async function handleLeavingRoom() {
    setLoading(true);

    try {
      // filter current membersInRoom and return new array
      const newMembersInRoom = props.room.membersInRoom.filter(
        (memberId) => memberId != currUser.uid
      );

      // update the room with room id to have a new array of userIds
      await roomService.updateMembersInRoom(props.room.id, newMembersInRoom);

      // change curr user status to free now
      await userService.updateUserStatus(currUser.uid, UserStatus.online);
    } catch (error) {
      console.error(error);

      toast.error("unable to leave room...something went wrong");
    }

    setLoading(false);
  }

  async function handleJoiningRoom() {
    setLoading(true);

    try {
      // update members in room
      const newMembersInRoom = [...props.room.membersInRoom, currUser.uid];

      // update the room with room id to have a new array of userIds
      await roomService.updateMembersInRoom(props.room.id, newMembersInRoom);

      // change curr user status to free now
      await userService.updateUserStatus(currUser.uid, UserStatus.busy);

      // then window.open to room's link
      window.open(props.room.link, "_blank");
    } catch (error) {
      console.error(error);

      toast.error("unable to leave room...something went wrong");
    }

    setLoading(false);
  }

  async function handleArchivingRoom() {
    if (
      confirm(
        "Are you sure you want to archive room? It will be added to the archived tab."
      )
    ) {
      console.log("archiving room");

      try {
        const newRoom: Room = { ...props.room };

        newRoom.status = RoomStatus.archived;
        newRoom.membersInRoom = [];
        await roomService.updateRoom(newRoom);
      } catch (error) {}
    }
  }

  if (loading) {
    return <SkeletonLoader />;
  }

  async function handleUpdateRoom() {
    props.updateRoomHandler(props.room.id);
  }

  const RoomOptionsMenu = (
    <Menu>
      <Menu.Item key={1}>
        <button onClick={handleUpdateRoom}>Edit Room Details</button>
      </Menu.Item>
      <Menu.Item key={2} danger onClick={handleArchivingRoom}>
        Archive Room
      </Menu.Item>
    </Menu>
  );

  const AgendaContent = (
    <div>
      <span className="text-sm whitespace-pre-line">
        {props.room.description}
      </span>
    </div>
  );

  // handle specifics for a scheduled room
  var dateTimeScheduled = null;
  var isPastRoom = false; // signal user to archive this room if it's past
  if (props.room.type == RoomType.scheduled) {
    dateTimeScheduled = props.room.scheduledDateTime.toDate();

    // check if the moment date scheduled is future or past

    if (moment(today).diff(moment(dateTimeScheduled)) > 0) {
      isPastRoom = true;
    }
  }

  function renderTopRightCardInfo() {
    if (props.room.type == RoomType.scheduled && props.room.scheduledDateTime) {
      return (
        <>
          <span className="text-sky-700 bg-sky-200 p-1 rounded-md text-xs font-bold flex flex-row items-center space-x-1">
            <FaCalendarDay />
            <Moment date={dateTimeScheduled} format="ddd Do" />
          </span>

          <span className="text-emerald-700 bg-emerald-200 p-1 rounded-md text-xs font-bold mt-2 flex flex-row items-center space-x-1">
            <FaClock />
            <Moment date={dateTimeScheduled} format="h:mm a" />
          </span>
        </>
      );
    }
  }

  return (
    <span
      className={`flex flex-col ${
        isUserInRoom ? " bg-white bg-opacity-80" : "bg-gray-300 bg-opacity-25"
      }  rounded-lg justify-between w-96 m-2 shrink-0 h-[14rem]`}
    >
      {/* header */}
      <span className="flex flex-row justify-between items-start space-x-1 p-5 h-full">
        {/* meeting details */}
        <span className="flex flex-col items-baseline justify-start max-w-xs h-full">
          <span
            className={`${
              isUserInRoom ? " text-gray-500" : "text-white"
            } font-semibold`}
          >
            {props.room.name}
          </span>
          <Popover content={AgendaContent} title="Agenda">
            <span
              className={`${
                isUserInRoom ? "text-gray-400" : "text-gray-200"
              } text-xs mb-auto text-ellipsis whitespace-pre-line max-h-[3rem] overflow-hidden`}
            >
              {props.room.description}
            </span>
          </Popover>

          {/* badges and tags */}
          {/* <span className="flex flex-row flex-wrap space-x-2">
            <span className="text-xs my-3 text-white bg-cyan-400 p-1 rounded-md font-bold flex flex-row space-x-2 items-center">
              <span>scrum</span>
            </span>
          </span> */}

          {/* all invited members who are not in the room already */}
          {membersInvited()}
        </span>

        {/* room status and link(s) */}
        <span className="flex flex-col items-end justify-between h-full w-fit">
          <RoomTypeTag
            roomStatus={props.room.status}
            roomType={props.room.type}
          />

          {renderTopRightCardInfo()}

          <span
            className={`${
              isUserInRoom ? "text-gray-400" : "text-gray-200"
            } text-xs text-right mb-auto`}
          >
            {props.room.approximateDateTime}
          </span>

          {/* room attachments */}
          <span className="flex flex-row space-x-2">
            {props.room.attachments && props.room.attachments.length > 0 ? (
              <button
                onClick={() => window.open(props.room.attachments[0], "_blank")}
                className={`${
                  isUserInRoom
                    ? " bg-gray-400 bg-opacity-25 text-gray-400"
                    : "bg-gray-300 bg-opacity-25 text-white"
                }  bg-gray-400 bg-opacity-25 p-2 ml-auto rounded hover:bg-opacity-40`}
              >
                <FaLink className="text-sm" />
              </button>
            ) : (
              <button
                onClick={handleUpdateRoom}
                className={`${
                  isUserInRoom
                    ? " bg-gray-400 bg-opacity-25 text-gray-400"
                    : "bg-gray-300 bg-opacity-25 text-white"
                }   bg-gray-400 bg-opacity-25 p-2 ml-auto rounded hover:bg-opacity-40`}
              >
                <FaPlus className="text-sm" />
              </button>
            )}
          </span>
        </span>
      </span>

      {/* footer */}
      <span className="flex flex-row justify-end items-center bg-gray-400 bg-opacity-30 p-3 rounded-lg">
        {membersInRoom()}

        {/* tell them to archive if it's past */}
        {isPastRoom ? (
          <Tooltip title={"please archive this meeting, it is over"}>
            <button
              onClick={handleArchivingRoom}
              className="flex flex-row items-center space-x-2 text-sm mx-2 text-orange-500 font-semibold py-1 px-4 bg-gray-200 rounded"
            >
              <FaArchive /> <span>Archive</span>
            </button>
          </Tooltip>
        ) : (
          <></>
        )}

        {isUserInRoom ? (
          <button
            onClick={handleLeavingRoom}
            className="text-sm text-orange-500 font-semibold py-1 px-4 bg-gray-200 rounded"
          >
            👋 Leave
          </button>
        ) : (
          <button
            onClick={handleJoiningRoom}
            className="text-sm font-semibold py-1 px-4 rounded bg-gray-200 text-green-500"
          >
            Join
          </button>
        )}

        <Dropdown overlay={RoomOptionsMenu} trigger={["click"]}>
          <BsThreeDots className="text-white ml-2 hover:cursor-pointer" />
        </Dropdown>
      </span>
    </span>
  );
}
