import { yesterday } from "@nirvana/common/helpers/dateTime";
import { AudioClip } from "@nirvana/common/models/conversation";
import moment from "moment";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import {
  allRelevantContactsAtom,
  allUsersConversationsAtom,
} from "../../recoil/main";
import { MasterAvatarGroupWithUserFetch } from "../UserDetails/MasterAvatarGroup";
import { useState } from "react";

export default function TimelineAudioClip(props: {
  index: number;
  audioClip: AudioClip;
  convoId: string;
}) {
  const relContactsMap = useRecoilValue(allRelevantContactsAtom);
  const userConvosMap = useRecoilValue(allUsersConversationsAtom);

  const audioClipUser = relContactsMap.get(props.audioClip.senderUserId);
  const userConvoAssoc = userConvosMap.get(props.convoId);

  const [audioDuration, setAudioDuration] = useState<number>();

  const loadedMetadata = (data) => {
    console.log(data);

    // set duration
  };

  const audio = new Audio(props.audioClip.audioDataUrl);
  // audio.onloadedmetadata = loadedMetadata;

  const playAudioClip = () => {
    toast(`${audioClipUser?.firstName} speaking...`);

    audio.play();
  };

  return (
    <span
      onClick={playAudioClip}
      key={props.index}
      className={`hover:cursor-pointer flex flex-row items-center 
                  p-5 h-[5rem] shadow shrink-0 last:animate-pulse last:bg-orange-200
                 ${
                   props.index % 2 == 1 &&
                   "translate-y-[4.75rem] border-t-4 border-t-teal-600"
                 } ${props.index % 2 == 0 && "border-b-4 border-b-teal-600"} ${
        props.audioClip.createdDate <
        (userConvoAssoc?.lastInteractionDate || yesterday)
          ? "bg-slate-100 border"
          : "bg-sky-100 "
      }`}
      style={{
        minWidth: "max-content",
        width: `100px`,
      }}
    >
      <MasterAvatarGroupWithUserFetch
        showCurrUser={true}
        listOfUserIds={audioClipUser?.id ? [audioClipUser?.id] : []}
      />

      <span className="flex flex-col ml-2">
        <span className="text-slate-500 font-semibold">
          {audioClipUser?.firstName + " " + audioClipUser?.lastName}
        </span>
        <span className="text-slate-400 text-xs">
          {moment(props.audioClip.createdDate.toDate()).fromNow()}
        </span>
      </span>
    </span>
  );
}
