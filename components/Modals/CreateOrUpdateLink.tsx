import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import {
  ShowModalType,
  useKeyboardContext,
} from "../../contexts/keyboardContext";

export default function CreateOrUpdateLink() {
  const { handleModalType, showModalType } = useKeyboardContext();

  function closeModal() {
    handleModalType(ShowModalType.na);
  }

  const [link, setLink] = useState<string>("");

  return (
    <Modal
      title="Link Details"
      visible={showModalType == ShowModalType.createLink}
      onCancel={closeModal}
      onOk={closeModal}
    >
      <div className="flex flex-col">
        <span className="flex flex-col items-start">
          <span className="text-lg">Link</span>
          <span className="text-gray-300 text-xs mb-2">
            Please make sure this is valid for others to access.
          </span>

          <input
            className="w-full rounded-lg bg-gray-50 p-3"
            value={link}
            placeholder="https://drive.google.com/xxx"
            onChange={(e) => setLink(e.target.value)}
          />
        </span>
      </div>
    </Modal>
  );
}
