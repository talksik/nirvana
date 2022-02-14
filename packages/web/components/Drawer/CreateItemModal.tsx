import { Link } from "@nirvana/common/models/conversation";
import { conversationService } from "@nirvana/common/services";
import Modal from "antd/lib/modal/Modal";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { useAuth } from "../../contexts/authContext";
import { selectedConvoAtom } from "../../recoil/main";
import LinkIcon, { getFavicon } from "./LinkIcon";

export default function CreateItemModal(props: {
  pastedLink: string;
  show: boolean;
  handleClose: () => void;
}) {
  const { currUser } = useAuth();

  const [linkVal, setLinkVal] = useState<string>("");
  const [linkDesc, setLinkDesc] = useState<string>("");
  const linkInput = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const selectedConvoId = useRecoilValue(selectedConvoAtom);

  useEffect(() => {
    if (props.pastedLink) {
      setLinkVal(props.pastedLink);
    }
  }, [props.pastedLink]);

  useEffect(() => {
    linkInput.current?.focus();
  }, [props.show]);

  const handleCreate = async () => {
    if (loading) {
      toast("in the process of sharing...");
      return;
    }

    setLoading(true);

    try {
      // validations
      if (!linkVal) {
        toast.error("must put a link");
        setLoading(false);
        return;
      }
      if (!linkDesc) {
        toast.error("must put a name of some sort");
        setLoading(false);
        return;
      }

      // service to add link to the collection
      // change the cacheddraweritem on the convo doc
      const newLink = new Link(linkDesc, linkVal, currUser!.uid);

      await conversationService.shareLink(
        currUser!.uid,
        newLink,
        selectedConvoId!
      );

      toast.success("shared");
    } catch (error) {
      console.error(error);
      toast.error("problem in sharing link");
    }

    setLoading(false);
    resetForm();
    props.handleClose();
  };

  const resetForm = () => {
    setLinkDesc("");
    setLinkVal("");
  };

  const handleCancel = () => {
    console.log("closing");
    props.handleClose();
  };

  const handleChangeLinkInput = (e) => {
    setLinkVal(e.target.value);

    // todo: find the tab name of the url
  };

  function addDefaultSrc(ev) {
    ev.target.src = getFavicon("www.com");
  }

  return (
    <Modal
      title="Share"
      onOk={handleCreate}
      onCancel={handleCancel}
      footer={
        <span className="flex flex-row justify-end space-x-2">
          <button
            onClick={handleCancel}
            className="rounded-lg p-2 border space-x-2
             text-slate-400 text-xs hover:bg-slate-50"
          >
            <span>Cancel</span>
          </button>

          <button
            onClick={handleCreate}
            type="submit"
            className="rounded-lg font-semibold bg-teal-600 p-2 text-white shadow-lg"
          >
            <span>Share</span>
          </button>
        </span>
      }
      visible={props.show}
      {...props}
    >
      <form onSubmit={handleCreate} className="flex flex-col space-y-5">
        <span className="flex flex-col items-start">
          <span className="text-lg font-semibold">Link</span>
          <span className="text-gray-300 text-sm mb-2">
            Please make sure this is valid for others to access.
          </span>
          {/* icon and link input */}
          <span className="flex flex-row items-center space-x-2 w-full">
            {linkVal && (
              <img
                height="30"
                width="30"
                src={getFavicon(linkVal)}
                onError={addDefaultSrc}
              />
            )}

            <input
              ref={linkInput}
              autoFocus
              className="flex-1 rounded-lg bg-gray-50 p-3"
              value={linkVal}
              placeholder="https://jira.atlassian.com/team/xxx"
              onChange={handleChangeLinkInput}
            />
          </span>
        </span>

        <span className="flex flex-col">
          <span className="text-lg font-semibold">Title</span>
          <span className="text-gray-300 text-sm mb-2">
            Be clear and concise.
          </span>
          <input
            autoFocus
            className="flex-1 rounded-lg bg-gray-50 p-3"
            value={linkDesc}
            placeholder="ex. User Story - Customer Creating Orders"
            onChange={(e) => setLinkDesc(e.target.value)}
          />
        </span>
      </form>
    </Modal>
  );
}
