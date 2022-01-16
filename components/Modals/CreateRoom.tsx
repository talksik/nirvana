import { Modal } from "antd";

export default function CreateRoom({ show }) {
  return (
    <Modal
      title="Create Room"
      centered
      visible={show}
      // onOk={() => this.setModal2Visible(false)}
      // onCancel={() => this.setModal2Visible(false)}
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  );
}
