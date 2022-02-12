import { Link } from "@nirvana/common/models/conversation";
import Modal from "antd/lib/modal/Modal";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import LinkIcon from "./LinkIcon";

export default function CreateItemModal(props: {
  pastedLink: string;
  show: boolean;
  handleClose: () => void;
}) {
  const [linkVal, setLinkVal] = useState<string>("");
  const [linkDesc, setLinkDesc] = useState<string>("");

  useEffect(() => {
    if (props.pastedLink) {
      setLinkVal(props.pastedLink);
    }
  }, [props.pastedLink]);

  const handleCreate = () => {
    console.log("added drawer item");
    toast.success("added drawer item to conversation");
  };

  const handleCancel = () => {
    console.log("closing");
    props.handleClose();
  };

  return (
    <Modal
      title="Share"
      onOk={handleCreate}
      onCancel={handleCancel}
      visible={props.show}
      {...props}
    >
      <span className="flex flex-col space-y-5">
        <span className="flex flex-col items-start">
          <span className="text-lg font-semibold">Link</span>
          <span className="text-gray-300 text-sm mb-2">
            Please make sure this is valid for others to access.
          </span>
          {/* icon and link input */}
          <span className="flex flex-row items-center space-x-2 w-full">
            <LinkIcon
              className="text-3xl"
              linkType={Link.getLinkType(linkVal)}
            />

            <input
              autoFocus
              className="flex-1 rounded-lg bg-gray-50 p-3"
              value={linkVal}
              placeholder="https://jira.atlassian.com/team/xxx"
              onChange={(e) => setLinkVal(e.target.value)}
            />
          </span>
        </span>

        <span className="flex flex-col">
          <span className="text-lg font-semibold">Title</span>
          <span className="text-gray-300 text-sm mb-2">
            Make sure this makes sense to everyone.
          </span>
          <input
            autoFocus
            className="flex-1 rounded-lg bg-gray-50 p-3"
            value={linkDesc}
            placeholder="ex. User Story - Customer Creating Orders"
            onChange={(e) => setLinkDesc(e.target.value)}
          />
        </span>
      </span>
    </Modal>
  );
}
