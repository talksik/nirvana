import { Modal } from "antd";
import { useEffect } from "react";
import {
  ShowModalType,
  useKeyboardContext,
} from "../../contexts/keyboardContext";

const thisModalType = ShowModalType.createRoom;

export default function CreateRoomModal() {
  const { pastedLink, handleModalType, showModalType } = useKeyboardContext();

  useEffect(() => {
    // check if link is valid google meet link
  }, []);

  const handleCloseModal = () => {
    handleModalType(ShowModalType.na);
  };

  const handleSubmit = () => {};

  return (
    <Modal
      title="Create Room"
      centered
      visible={showModalType == thisModalType ? true : false}
      onOk={handleSubmit}
      onCancel={handleCloseModal}
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  );
}
