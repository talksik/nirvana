import { Modal } from "antd";
import { useKeyboardContext } from "../../contexts/keyboardContext";

export default function CreateRoom() {
  const { createRoom } = useKeyboardContext();

  console.log(createRoom);

  return (
    <Modal
      title="Create Room"
      centered
      visible={createRoom.showModal}
      // onOk={() => this.setModal2Visible(false)}
      // onCancel={() => this.setModal2Visible(false)}
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  );
}
