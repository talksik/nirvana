import {
  DatePicker,
  Divider,
  Modal,
  Radio,
  Select,
  Switch,
  TimePicker,
  Tooltip,
} from "antd";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/authContext";
import {
  ShowModalType,
  useKeyboardContext,
} from "../../contexts/keyboardContext";
import { useTeamDashboardContext } from "../../contexts/teamDashboardContext";
import Room, { RoomStatus, RoomType } from "../../models/room";
import { User } from "../../models/user";
import RoomService from "../../services/roomService";

const { Option } = Select;

const roomService = new RoomService();

interface IModalProps {
  show: boolean;
  updateRoom: Room;
  handleClose: Function;
}

export default function CreateOrUpdateRoomModal(props: IModalProps) {
  const { currUser } = useAuth();
  const { teamUsers, team, user } = useTeamDashboardContext();
  const { pastedLink, handleModalType, showModalType } = useKeyboardContext();

  // handle when we want to update a room and props changes
  // prefill with existing stuff
  useEffect(() => {
    console.log("change in props");

    if (props.updateRoom) {
      setRoomLink(props.updateRoom.link);
      setRoomName(props.updateRoom.name);
      setRoomDescription(props.updateRoom.description);
      if (props.updateRoom.attachments && props.updateRoom.attachments[0]) {
        setRoomAttachment(props.updateRoom.attachments[0]);
      }
      setMembersSelected(props.updateRoom.members);
      setRoomType(props.updateRoom.type);
      setRoomAppxDateTime(props.updateRoom.approximateDateTime);

      if (props.updateRoom.scheduledDateTime) {
        const convertedToMoment = moment(
          props.updateRoom.scheduledDateTime.toDate()
        );
        setDateTimePicker(convertedToMoment);
      }
    } else {
      // update state when user does ctrl + v
      resetForm();
    }
  }, [props.updateRoom]);

  // update state when user does ctrl + v
  useEffect(() => {
    // todo: check if link is valid google meet link? again?
    console.log("updated link!!!!!");
    setRoomLink(pastedLink);
  }, [pastedLink]);

  const handleCloseModal = () => {
    resetForm();

    props.handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // make sure link, room, and type are selected
    if (!roomLink || !roomName) {
      toast.error("Please fill in room link and name.");
      return;
    }

    try {
      const newRoom = new Room();

      if (roomAttachment) {
        newRoom.attachments = [roomAttachment];
      }

      if (roomType == RoomType.now) {
        // make sure approximate time isn't selected
        newRoom.approximateDateTime = null;
        newRoom.status = RoomStatus.live;

        // automatically add me to the room
        newRoom.membersInRoom = [currUser.uid];

        // navigate to the new room automatically
        window.open(roomLink, "_blank");
      } else if (roomType == RoomType.scheduled) {
        // make sure that either appx or time picker is selected, not both
        if (!dateTimePicker) {
          toast.error("Please select a date and time!");
          return;
        }

        newRoom.approximateDateTime = null;

        newRoom.scheduledDateTime = Timestamp.fromDate(dateTimePicker.toDate());
      } else if (roomType == RoomType.recurring) {
        // clear the field for the time picker if they ever selected that
        newRoom.scheduledDateTime = null;

        newRoom.approximateDateTime = roomAppxDateTime;
      }

      newRoom.link = roomLink;
      newRoom.members = [...membersSelected]; // add currUser to the list of "people"
      newRoom.type = roomType;
      newRoom.description = roomDescription;
      newRoom.name = roomName;
      newRoom.createdByUserId = currUser.uid;
      newRoom.teamId = team.id;

      if (props.updateRoom) {
        newRoom.id = props.updateRoom.id;
        newRoom.membersInRoom = props.updateRoom.membersInRoom;
      }

      console.log(newRoom);

      handleModalType(ShowModalType.na);

      await roomService.createOrUpdateRoom(newRoom);

      resetForm();

      toast.success("done");
    } catch (error) {
      toast.error("problem creating room");
      console.log(error);
    }
  };

  function resetForm() {
    setRoomLink("");
    setRoomName("");
    setRoomDescription("");
    setMembersSelected([currUser.uid] as string[]);
    setRoomAttachment("");
    setRoomAppxDateTime("");
    setRoomType(RoomType.now);

    setDateTimePicker(null);

    setShowMoreDetails(false);
  }

  const [roomLink, setRoomLink] = useState<string>(pastedLink ?? "");
  const [roomName, setRoomName] = useState<string>("");
  const [roomDescription, setRoomDescription] = useState<string>("");

  const [roomAttachment, setRoomAttachment] = useState<string>("");
  const [membersSelected, setMembersSelected] = useState<string[]>([
    currUser.uid,
  ]);

  const [roomType, setRoomType] = useState<RoomType>(RoomType.now);
  const [roomAppxDateTime, setRoomAppxDateTime] = useState<string>(""); // for certain room types
  const [dateTimePicker, setDateTimePicker] = useState(null);

  const [showMoreDetails, setShowMoreDetails] = useState<boolean>(false);

  function handleSelectMember(value) {
    // passed in array of selections...userIds

    setMembersSelected(value);

    console.log(value);
  }

  function handleDateTimePickerChange(time) {
    console.log(time);

    setRoomAppxDateTime("");

    setDateTimePicker(time);
  }

  const allUsersForSelection: User[] = [...teamUsers, user];

  const MemberSelection = () => {
    return (
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select team members"
        onChange={handleSelectMember}
        value={membersSelected}
        optionLabelProp="label"
        filterOption={(input, option) =>
          option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {allUsersForSelection.map((tu) => {
          return (
            <Option key={tu.id} label={tu.firstName}>
              {tu.firstName} {tu.lastName}
            </Option>
          );
        })}
      </Select>
    );
  };

  return (
    <Modal
      title="Room Details"
      centered
      visible={props.show}
      onOk={handleSubmit}
      onCancel={handleCloseModal}
    >
      <div className="flex flex-col">
        <span className="flex flex-col items-start">
          <span className="text-lg">Link</span>
          {roomLink ? (
            <span className="text-gray-300 text-xs mb-2">
              Please make sure this is valid so that your team can join
              properly.
            </span>
          ) : (
            <span className="text-xs mb-2">
              <a
                href="https://meet.google.com"
                target={"_blank"}
                rel={"noreferrer"}
                className=""
              >
                Click here to create one
              </a>{" "}
              and then come back and paste the link for your team.
            </span>
          )}

          <input
            autoFocus
            className="w-full rounded-lg bg-gray-50 p-3"
            value={roomLink}
            placeholder="https://meet.google.com/xxx-xxxx"
            onChange={(e) => setRoomLink(e.target.value)}
          />
        </span>

        <span className="flex flex-col items-start flex-1 mt-4 ">
          <span className="text-lg">Room Name</span>
          <span className="text-gray-300 text-xs mb-2 flex-1">
            Be specific enough, everyone down the hall will see this.
          </span>
          <input
            placeholder="ex. Design - Ecommerce Figma"
            className="w-full rounded-lg bg-gray-50 p-3"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </span>

        {/* room type selection */}
        <span className="flex flex-col items-start flex-1 mt-4 ">
          <span className="text-lg">Type</span>
          <span className="text-gray-300 text-xs mb-2 flex-1"></span>
          <Radio.Group
            value={roomType}
            onChange={(event) => setRoomType(event.target.value)}
          >
            <Radio.Button value={RoomType.now}>{RoomType.now}</Radio.Button>
            <Radio.Button value={RoomType.scheduled}>
              {RoomType.scheduled}
            </Radio.Button>
            <Radio.Button value={RoomType.recurring}>
              {RoomType.recurring}
            </Radio.Button>
          </Radio.Group>

          {roomType == RoomType.recurring ? (
            <Tooltip
              title={`Put things like "ping me when ready" or "sometime this afternoon"`}
            >
              <span className="flex flex-col items-stretch flex-1 mt-4">
                <span className="text-md">Approximate Slot</span>
                <span className="text-gray-300 text-xs mb-2 flex-1">
                  Sometimes you don&#39;t have a specific time or want to
                  propose a rough period.
                </span>
                <input
                  placeholder="ex. 2pm-ish...after lunch...every evening"
                  className="w-full rounded-lg bg-gray-50 p-3"
                  value={roomAppxDateTime}
                  onChange={(e) => setRoomAppxDateTime(e.target.value)}
                />
              </span>
            </Tooltip>
          ) : (
            <></>
          )}

          {roomType == RoomType.scheduled ? (
            <span className="flex flex-col items-start flex-1 mt-4">
              <span className="text-md">Specific Time</span>
              {/* <TimePicker
                      minuteStep={15}
                      use12Hours
                      format="h:mm a"
                      value={timePicker}
                      defaultValue={moment(new Date())}
                      onChange={handleTimePickerChange}
                    /> */}

              <DatePicker
                minuteStep={15}
                use12Hours
                format="YYYY-MM-DD h:mm a"
                value={dateTimePicker}
                onChange={handleDateTimePickerChange}
              />
            </span>
          ) : (
            <></>
          )}
        </span>

        {showMoreDetails ? (
          <>
            <Divider />

            <button
              className="text-sm text-gray-300 text-left underline decoration-gray-300"
              onClick={() => setShowMoreDetails(false)}
            >
              Hide details...
            </button>

            <span className="flex flex-col items-start flex-1 mt-4">
              <span className="text-md">People</span>

              {/* team or personal */}
              <Tooltip
                title={
                  "Private mode coming soon, but keep it collaborative for now."
                }
                className="flex flex-col"
              >
                <Switch disabled={true} defaultChecked />
              </Tooltip>
              <span className="text-gray-300 text-xs mb-2 flex-1">
                Whole team sees this room.
              </span>

              <span className="text-gray-300 text-xs mb-2 flex-1">
                Optional - Add any mandatory attendees you want or just tell
                them later and they will see it in the team rooms.
              </span>
              {MemberSelection()}
            </span>

            <span className="flex flex-col items-start flex-1 mt-4">
              <span className="text-md">Agenda</span>
              <span className="text-gray-300 text-xs mb-2 flex-1">
                Optional
              </span>
              <textarea
                placeholder="ex. Let's discuss ways to..."
                className="w-full rounded-lg bg-gray-50 p-3"
                value={roomDescription}
                onChange={(e) => setRoomDescription(e.target.value)}
              />
            </span>

            <span className="flex flex-col items-start flex-1 mt-4">
              <span className="text-md">Attachment</span>
              <span className="text-gray-300 text-xs mb-2">
                Optional - ppt, meeting notes...
              </span>
              <span className="text-gray-300 text-xs mb-2">
                have multiple? just post it in the team attachments
              </span>
              <input
                placeholder="https://"
                className="w-full rounded-lg bg-gray-50 p-3"
                value={roomAttachment}
                onChange={(e) => setRoomAttachment(e.target.value)}
              />
            </span>
          </>
        ) : (
          <button
            className="text-sm text-gray-300 text-left underline decoration-gray-300 mt-5"
            onClick={() => setShowMoreDetails(true)}
          >
            Click to show more details...
          </button>
        )}
      </div>
    </Modal>
  );
}
