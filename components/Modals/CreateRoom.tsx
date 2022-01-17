import { Divider, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  ShowModalType,
  useKeyboardContext,
} from "../../contexts/keyboardContext";

const { Option } = Select;

const thisModalType = ShowModalType.createRoom;

export default function CreateRoomModal() {
  const { pastedLink, handleModalType, showModalType } = useKeyboardContext();

  useEffect(() => {
    // todo: check if link is valid google meet link? again?
    setRoomLink(pastedLink);
  }, [pastedLink]);

  const handleCloseModal = () => {
    handleModalType(ShowModalType.na);
  };

  const handleSubmit = () => {};

  const [roomLink, setRoomLink] = useState<string>(pastedLink);
  const [membersSelected, setMembersSelected] = useState<string[]>([]);

  function handleSelectMember(value) {
    // setMemberSelection()
    console.log(value);
  }

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  const MemberSelection = () => {
    return (
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        defaultValue={["a10", "c12"]}
        onChange={handleSelectMember}
      >
        {children}
      </Select>
    );
  };

  return (
    <Modal
      title="Create Room"
      centered
      visible={showModalType == thisModalType ? true : false}
      onOk={handleSubmit}
      onCancel={handleCloseModal}
    >
      <div className="flex flex-col">
        <span className="flex flex-col items-start">
          <span className="text-md">Link</span>
          <span className="text-gray-300 text-xs mb-2">
            Please make sure this is valid so that your team can join properly.
          </span>
          <input
            className="w-full rounded-lg bg-gray-50 p-3"
            value={roomLink}
            onChange={(e) => setRoomLink(e.target.value)}
          />
        </span>

        <div className="flex flex-row justify-between space-x-3 mt-4">
          <span className="flex flex-col items-start flex-1 ">
            <span className="text-md">Room Name</span>
            <span className="text-gray-300 text-xs mb-2 flex-1">
              Be specific enough, everyone down the hall will see this.
            </span>
            <input
              placeholder="ex. Design - Ecommerce Figma"
              className="w-full rounded-lg bg-gray-50 p-3"
              value={""}
              onChange={(e) => setRoomLink(e.target.value)}
            />
          </span>
        </div>

        <Divider />

        <span className="flex flex-col items-start flex-1 mt-4">
          <span className="text-md">People</span>
          <span className="text-gray-300 text-xs mb-2 flex-1">
            Optional - Add anyone you want or just tell them later.
          </span>
          {MemberSelection()}
        </span>

        <span className="flex flex-col items-start flex-1 mt-4">
          <span className="text-md">Subtitle</span>
          <span className="text-gray-300 text-xs mb-2 flex-1">Optional</span>
          <input
            placeholder="ex. Looking for feedback if..."
            className="w-full rounded-lg bg-gray-50 p-3"
            value={""}
            onChange={(e) => setRoomLink(e.target.value)}
          />
        </span>

        <span className="flex flex-col items-start flex-1 mt-4">
          <span className="text-md">Attachment</span>
          <span className="text-gray-300 text-xs mb-2">
            Optional - add a ppt or meeting notes for people to follow along
          </span>
          <input
            placeholder="https://"
            className="w-full rounded-lg bg-gray-50 p-3"
            value={""}
            onChange={(e) => setRoomLink(e.target.value)}
          />
        </span>
      </div>
    </Modal>
  );
}
