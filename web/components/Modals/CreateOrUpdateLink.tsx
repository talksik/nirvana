import { Divider, Select, Switch, Tooltip } from "antd";
const { Option } = Select;

import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/authContext";
import {
  ShowModalType,
  useKeyboardContext,
} from "../../contexts/keyboardContext";
import { useTeamDashboardContext } from "../../contexts/teamDashboardContext";
import Link, { LinkType } from "../../models/link";
import { SendService } from "../../services/sendService";
import LinkIcon from "../LinkIcon";

const sendService = new SendService();

export default function CreateOrUpdateLink() {
  const { currUser } = useAuth();
  const { pastedLink, handleModalType, showModalType } = useKeyboardContext();
  const { teamUsers, team } = useTeamDashboardContext();

  useEffect(() => {
    if (pastedLink) {
      setLink(pastedLink ?? "");
    }
  }, [pastedLink]);

  function closeModal() {
    handleModalType(ShowModalType.na);
  }

  function handleSelectRecipients(value) {
    // passed in array of selections...userIds

    setRecipientsSelected(value);

    console.log(value);
  }

  function handleSelectRecipientMode(isChecked) {
    // clear the list of recipients if team selected
    if (isChecked) {
      setRecipientsSelected([]);
      setIsTeamLink(true);
    } else {
      setRecipientsSelected([]);
      setIsTeamLink(false);
    }
  }

  async function handleSubmitLink() {
    if (!link || !name) {
      toast.error("Please add a valid link and name");
      return;
    }

    if (
      !isTeamLink &&
      (!recipientsSelected || recipientsSelected.length == 0)
    ) {
      toast.error(
        "Please select members or send it to the team with the toggle"
      );
      return;
    }

    // if it's a team link, make sure recipients is null ... but the model should handle this for us?

    try {
      const newLink = new Link(
        name,
        description,
        link,
        team.id,
        recipientsSelected,
        currUser.uid
      );

      handleModalType(ShowModalType.na);

      // send to database
      await sendService.sendLink(newLink);

      resetForm();

      toast.success("link sent");
    } catch (error) {
      toast.error("Something went wrong in sending the link.");
      console.log(error);
    }
  }

  function resetForm() {
    setLink("");
    setName("");
    setDescription("");
    setShowMoreDetails(false);
    setIsTeamLink(true);
    setRecipientsSelected([]);
  }

  const [link, setLink] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [showMoreDetails, setShowMoreDetails] = useState<boolean>(false);
  const [isTeamLink, setIsTeamLink] = useState<boolean>(true);
  const [recipientsSelected, setRecipientsSelected] = useState<string[]>([]);

  return (
    <Modal
      title="Link Details"
      visible={showModalType == ShowModalType.createLink}
      onCancel={closeModal}
      onOk={handleSubmitLink}
    >
      <div className="flex flex-col space-y-5">
        <span className="flex flex-col items-start">
          <span className="text-lg">Link</span>
          <span className="text-gray-300 text-xs mb-2">
            Please make sure this is valid for others to access.
          </span>
          {/* icon and link input */}
          <span className="flex flex-row items-center space-x-2 w-full">
            <LinkIcon className="text-3xl" linkType={Link.getLinkType(link)} />

            <input
              autoFocus
              className="flex-1 rounded-lg bg-gray-50 p-3"
              value={link}
              placeholder="https://jira.atlassian.com/team/xxx"
              onChange={(e) => setLink(e.target.value)}
            />
          </span>
        </span>

        <span className="flex flex-col items-start">
          <span className="text-lg">Name</span>
          <span className="text-gray-300 text-xs mb-2">
            Make sure this makes sense to who you are sending it to.
          </span>

          <input
            className="w-full rounded-lg bg-gray-50 p-3"
            value={name}
            placeholder="ex. User Story - Customer Creating Orders"
            onChange={(e) => setName(e.target.value)}
          />
        </span>

        <span className="flex flex-col items-start">
          <span className="text-lg">Recipients</span>
          <span className="text-gray-300 text-xs mb-2">
            Choose team or individual recipients
          </span>

          <span className="mb-2">
            <Switch
              defaultChecked
              onChange={handleSelectRecipientMode}
              checkedChildren={<span>Team</span>}
              unCheckedChildren={<span>Members</span>}
            />
          </span>

          {/* select team members to send to */}
          {!isTeamLink ? (
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select team members"
              onChange={handleSelectRecipients}
              value={recipientsSelected}
              optionLabelProp="label"
              filterOption={(input, option) =>
                option.props.label.toLowerCase().indexOf(input.toLowerCase()) >=
                0
              }
            >
              {teamUsers.map((tu) => {
                return (
                  <Option key={tu.id} label={tu.firstName}>
                    {tu.firstName} {tu.lastName}
                  </Option>
                );
              })}
            </Select>
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

            <span className="flex flex-col items-start">
              <span className="text-md">Description</span>
              <span className="text-gray-300 text-xs mb-2">
                Optional - Add any pointers about this file.
              </span>

              <input
                className="w-full rounded-lg bg-gray-50 p-3"
                value={description}
                placeholder="ex. Please review this and add feedback asap"
                onChange={(e) => setDescription(e.target.value)}
              />
            </span>
          </>
        ) : (
          <button
            className="text-sm text-gray-300 text-left underline decoration-gray-300"
            onClick={() => setShowMoreDetails(true)}
          >
            Click to show more details...
          </button>
        )}
      </div>
    </Modal>
  );
}
