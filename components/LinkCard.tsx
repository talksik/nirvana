import {
  FaAngleDoubleRight,
  FaArchive,
  FaExternalLinkAlt,
  FaFilePdf,
  FaTrash,
} from "react-icons/fa";
import Link, { LinkState, LinkType } from "../models/link";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import LinkIcon from "./LinkIcon";
import { useTeamDashboardContext } from "../contexts/teamDashboardContext";
import { useAuth } from "../contexts/authContext";
import { User } from "../models/user";
import { Avatar, Dropdown, Menu, Tooltip } from "antd";
import { useState } from "react";
import SkeletonLoader from "./Loading/skeletonLoader";
import moment from "moment";
import { LinkService } from "../services/linkService";

interface ILinkCardProps {
  link: Link;
}

const linkService = new LinkService();

export default function LinkCard(props: ILinkCardProps) {
  const { currUser } = useAuth();
  const { teamUsersMap, user } = useTeamDashboardContext();
  const [loading, setLoading] = useState<boolean>(false);

  var sender: User;

  if (props.link.createdByUserId == currUser.uid) {
    sender = user;
  } else {
    sender = teamUsersMap[props.link.createdByUserId];
  }

  var receivers: User[] = props.link.recipients?.reduce((results, userId) => {
    if (userId in teamUsersMap) {
      results.push(teamUsersMap[userId]);
    }

    // if I am the receiver still add me to the receivers
    if (userId == currUser.uid) {
      results.push(user);
    }

    return results;
  }, [] as User[]);

  async function handleDeleteLink() {
    setLoading(true);
    if (
      confirm(
        "Are you sure you want to delete link? It will disappear for all recipients."
      )
    ) {
      console.log("deleting link");

      await linkService.updateLinkState(props.link.id, LinkState.deleted);

      try {
      } catch (error) {}
    }

    setLoading(false);
  }

  async function handleArchivingLink() {
    setLoading(true);

    if (
      confirm(
        "Are you sure you want to archive link? It will  be in the archive tab."
      )
    ) {
      await linkService.updateLinkState(props.link.id, LinkState.archived);
      try {
      } catch (error) {}
    }

    setLoading(false);
  }

  if (loading) {
    return <SkeletonLoader />;
  }

  const LinkOptionsMenu = (
    <Menu>
      <Menu.Item
        key={2}
        danger
        onClick={handleArchivingLink}
        icon={<FaArchive />}
      >
        <button>Archive Link</button>
      </Menu.Item>
      <Menu.Item
        key={3}
        danger
        onClick={handleArchivingLink}
        icon={<FaTrash />}
      >
        <button>Delete Link</button>
      </Menu.Item>
    </Menu>
  );

  const relativeDateTime: string = moment(
    props.link.createdDate.toDate()
  ).fromNow();

  var receiversNames = "team";
  if (receivers) {
    receiversNames = receivers.map((receiver) => receiver.firstName).join(", ");
  }

  console.log(receiversNames);

  return (
    <span className="flex flex-col rounded-lg w-72 max-h-60 overflow-clip shrink-0">
      {/* attmnt header */}
      <Tooltip title={props.link.link}>
        <span
          onClick={() => window.open(props.link.link, "_blank")}
          className="flex flex-row bg-gray-300 bg-opacity-25 py-5 px-3 items-center justify-start hover:cursor-pointer h-full"
        >
          <LinkIcon
            className="text-4xl mr-2 shrink-0"
            linkType={props.link.type}
          />

          <span className="flex flex-col items-baseline mr-10 space-y-1">
            <span className="text-md font-bold text-white text-ellipsis overflow-hidden">
              {props.link.name}
            </span>

            <span
              className={`text-gray-200 text-xs mb-auto text-ellipsis whitespace-pre-line max-h-10 overflow-hidden`}
            >
              {props.link.description}
            </span>
          </span>

          {/* attachment actions */}
          <button
            onClick={() => window.open(props.link.link, "_blank")}
            className="bg-gray-300 bg-opacity-25 p-2 ml-auto rounded hover:bg-opacity-40"
          >
            <FaExternalLinkAlt className="text-sm text-white" />
          </button>
        </span>
      </Tooltip>

      {/* attmnt footer */}
      <Tooltip
        title={
          sender.nickName + " -> " + receiversNames + ": " + relativeDateTime
        }
      >
        <span className="flex flex-row items-center bg-gray-400 bg-opacity-30 p-3">
          <Avatar src={sender.avatarUrl} className="shadow-xl" />

          <FaAngleDoubleRight className="text-orange-500 text-2xl mx-2" />

          <Avatar.Group>
            {receivers ? (
              receivers.map((receiverUser, i) => {
                return (
                  <Avatar
                    key={receiverUser.id}
                    src={receiverUser.avatarUrl}
                    className="shadow-xl"
                  />
                );
              })
            ) : (
              <span className="text-xs text-white bg-emerald-400 p-1 rounded-md font-bold flex flex-row space-x-2 items-center">
                <span>team</span>
              </span>
            )}
          </Avatar.Group>

          <span className="ml-auto">
            <Dropdown
              className="ml-auto"
              overlay={LinkOptionsMenu}
              trigger={["click"]}
            >
              <BsThreeDots className="text-white ml-2 hover:cursor-pointer" />
            </Dropdown>
          </span>
        </span>
      </Tooltip>
    </span>
  );
}
