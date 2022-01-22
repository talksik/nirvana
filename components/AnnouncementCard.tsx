import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaPlay } from "react-icons/fa";
import { useAuth } from "../contexts/authContext";
import { useKeyboardContext } from "../contexts/keyboardContext";
import { useTeamDashboardContext } from "../contexts/teamDashboardContext";
import Announcement, { AnnouncementState } from "../models/announcement";
import { User } from "../models/user";
import { AnnouncementService } from "../services/announcementService";
import SkeletonLoader from "./Loading/skeletonLoader";

interface IAnnouncementCardProps {
  announcement: Announcement;
}

const announcementService = new AnnouncementService();

export default function AnnouncementCard(props: IAnnouncementCardProps) {
  const { currUser } = useAuth();
  const { teamUsersMap, user } = useTeamDashboardContext();
  const { handleAddAudioToQueue } = useKeyboardContext();
  const [loading, setLoading] = useState<boolean>(false);

  function playAnnouncement() {
    handleAddAudioToQueue([props.announcement.audioDataUrl]);
  }

  async function resolveAnnouncement() {
    setLoading(true);

    try {
      await announcementService.updateAnnouncementState(
        props.announcement.id,
        AnnouncementState.resolved
      );
    } catch (error) {
      toast.error("unable to resolve announcement");
    }

    setLoading(false);
  }

  async function deleteAnnouncement() {
    try {
      await announcementService.updateAnnouncementState(
        props.announcement.id,
        AnnouncementState.deleted
      );
    } catch (error) {
      toast.error("unable to resolve announcement");
    }
  }

  var announcementUser: User = null;
  if (props.announcement.createdByUserId in teamUsersMap) {
    announcementUser = teamUsersMap[props.announcement.createdByUserId];
  } else if (currUser.uid == props.announcement.createdByUserId) {
    announcementUser = user;
  }

  const relativeCreatedDate = moment(
    props.announcement.createdDate.toDate()
  ).fromNow();

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <span className="flex flex-row p-3 bg-gray-300 bg-opacity-25 rounded-lg items-center shrink-0">
      <span className="relative mr-2 grid items-center justify-items-center">
        <span className="bg-gray-200 bg-opacity-20 rounded-full shadow-md absolute w-full h-full"></span>

        <Image
          src={"/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-22.svg"}
          alt="profile"
          width={50}
          height={50}
        />
      </span>

      <span className="flex flex-col items-baseline mr-5">
        <span className="text-md font-bold text-white">
          {announcementUser?.nickName}
        </span>
        <span className="text-xs text-gray-200">{relativeCreatedDate}</span>
      </span>

      {props.announcement.state == AnnouncementState.active && (
        <button
          onClick={resolveAnnouncement}
          className="bg-gray-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40"
        >
          <FaCheck className="text-lg text-white" />
        </button>
      )}

      <button
        onClick={playAnnouncement}
        className="bg-gray-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40"
      >
        <FaPlay className="text-lg text-white" />
      </button>
    </span>
  );
}
