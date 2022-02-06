import { LinkType } from "@nirvana/common/models/link";
import { UserStatus } from "@nirvana/common/models/user";
import { Tooltip } from "antd";
import { duration } from "moment";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaEdit,
  FaExternalLinkAlt,
  FaGithub,
  FaImages,
  FaMicrophone,
  FaPlay,
  FaRegClock,
  FaRocket,
  FaStream,
} from "react-icons/fa";
import LinkIcon from "../Drawer/LinkIcon";
import UserAvatar, { UserAvatarSizes } from "../UserDetails/UserAvatar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  allRelevantConversationsAtom,
  selectedConvoAtom,
  userConvoAssociationSelector,
} from "../../recoil/main";
import { useRouter } from "next/router";
import Conversation, {
  AudioClip,
  ConversationMemberState,
} from "@nirvana/common/models/conversation";
import { useAuth } from "../../contexts/authContext";
import { QueryRoutes, Routes } from "@nirvana/common/helpers/routes";
import { MasterAvatarGroupWithUserFetch } from "../UserDetails/MasterAvatarGroup";
import { conversationService } from "@nirvana/common/services";
import ConversationMemberStateIcon from "../Conversations/ConversationMemberStateIcon";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { firestoreDb as db } from "../../services/firebaseService";
import Collections from "@nirvana/common/services/collections";
import TimelineAudioClip from "../Conversations/TimelineAudioClip";

const testDrawerItems: {
  linkType: LinkType;
  linkName: string;
  relativeSentTime: string;
}[] = [
  {
    linkType: LinkType.googleMeet,
    linkName: "Gmeet - Meeting Link",
    relativeSentTime: "5 seconds ago",
  },
  {
    linkType: LinkType.atlassian,
    linkName: "Jira Ticket - Ecommerce Plugin",
    relativeSentTime: "20 minutes ago",
  },
  {
    linkType: LinkType.github,
    linkName: "React library for hotkeys",
    relativeSentTime: "2 hours ago",
  },
  {
    linkType: LinkType.googleDrive,
    linkName: "Engineering - Team Drive Folder",
    relativeSentTime: "last week",
  },
];

const AUDIO_CLIP_FETCH_LIMIT = 50;

export default function ViewConvo(props: { conversationId: string }) {
  const { currUser } = useAuth();

  const allConvosMap = useRecoilValue(allRelevantConversationsAtom);

  const endOfTimeline = useRef<HTMLSpanElement>();

  const router = useRouter();

  useEffect(() => {
    endOfTimeline.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // auth if do not have this conversation in react cache, then we are not authorized
  // if somehow it's still cached but we were removed,
  // then authenticate by checking if we are in the array of users for the conversation

  const convo: Conversation | undefined = allConvosMap.get(
    props.conversationId
  );

  const userConvoAssoc = useRecoilValue(
    userConvoAssociationSelector(props.conversationId)
  );

  const [audioClips, setAudioClips] = useState<AudioClip[]>([] as AudioClip[]);

  const setSelectedConvoId = useSetRecoilState(selectedConvoAtom);

  useEffect(() => {
    // should have this convo, otherwise unauthorized
    if (!convo || !convo.activeMembers.includes(currUser!.uid)) {
      toast.error("Not authorized for this conversation");

      router.push({
        pathname: Routes.home,
        query: { page: QueryRoutes.convos },
      });

      return;
    }

    // set the selected convo as this one as we are now on this page
    setSelectedConvoId(props.conversationId);

    // subscribe to the data for the conversation such that we can render the timeline
    // get all audioClips for this conversation realtime listener so that when I speak it's also put on the timeline
    // any new message is seamlessly added to the timeline
    const audioClipsQuery = query(
      collection(
        db,
        Collections.conversations,
        props.conversationId,
        Collections.conversationAudioClips
      ),
      orderBy("createdDate", "desc"),
      limit(AUDIO_CLIP_FETCH_LIMIT)
    );
    const unsubscribe = onSnapshot(audioClipsQuery, (querySnapshot) => {
      const audioClips: AudioClip[] = [] as AudioClip[];

      querySnapshot.forEach((doc) => {
        const audClip = doc.data() as AudioClip;
        audClip.id = doc.id;

        // appending all messages in sort order
        audioClips.push(audClip);
      });

      setAudioClips(audioClips.reverse());
      console.log(audioClips);
    });

    return unsubscribe;
  }, []);

  const handleOrganizeConversation = async (
    toState: ConversationMemberState
  ) => {
    try {
      // use service to make change in database which will change local data
      await conversationService.updateUserConvoRelationship(
        currUser!.uid,
        props.conversationId,
        toState
      );

      toast.success("Moved conversation to " + toState);
    } catch (error) {
      console.error(error);
      toast.error("Problem in moving conversation");
    }
  };

  return (
    <>
      <div className="flex flex-col items-stretch mt-5 space-y-10">
        {/* main timeline view with action buttons on top */}
        <div className="flex-1 flex flex-col overflow-auto">
          {/* header */}
          <span className="flex flex-row justify-between items-center mb-5">
            <span className="flex flex-col">
              <span className="flex flex-row items-center group">
                <span
                  className="text-lg tracking-widest font-semibold 
                  text-slate-500 uppercase mr-2"
                >
                  {convo?.name}
                </span>

                <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200 group-hover:visible invisible">
                  <FaEdit className="ml-auto text-md text-slate-400" />
                </span>
              </span>

              <span className="flex flex-row items-center space-x-2 hover:cursor-pointer group">
                {convo?.activeMembers && (
                  <MasterAvatarGroupWithUserFetch
                    listOfUserIds={convo.activeMembers}
                    showCurrUser={true}
                    maxUserCount={10}
                    size={UserAvatarSizes.small}
                  />
                )}

                <span className="text-xs text-slate-300 hover:decoration-slate-400 group-hover:underline ">
                  {convo?.activeMembers.length} members
                </span>
              </span>
            </span>

            <span className="flex flex-row items-center space-x-3">
              {userConvoAssoc?.state && (
                <ConversationMemberStateIcon
                  convoUserAssocState={userConvoAssoc.state}
                />
              )}

              {userConvoAssoc?.state != ConversationMemberState.default && (
                <button
                  onClick={() =>
                    handleOrganizeConversation(ConversationMemberState.default)
                  }
                  className="rounded-lg p-2 border flex flex-row items-center space-x-2
           text-slate-400 text-xs hover:bg-slate-50"
                >
                  <FaStream />
                  <span>Inbox</span>
                </button>
              )}

              {userConvoAssoc?.state != ConversationMemberState.later && (
                <button
                  onClick={() =>
                    handleOrganizeConversation(ConversationMemberState.later)
                  }
                  className="rounded-lg p-2 border flex flex-row items-center space-x-2
             text-slate-400 text-xs hover:bg-slate-50"
                >
                  <FaRegClock />
                  <span>Later</span>
                </button>
              )}

              {userConvoAssoc?.state != ConversationMemberState.priority && (
                <button
                  onClick={() =>
                    handleOrganizeConversation(ConversationMemberState.priority)
                  }
                  className="rounded-lg p-2 border flex flex-row items-center space-x-2
             text-slate-400 text-xs hover:bg-slate-50"
                >
                  <FaRocket />
                  <span>Priority</span>
                </button>
              )}

              {userConvoAssoc?.state != ConversationMemberState.done && (
                <button
                  onClick={() =>
                    handleOrganizeConversation(ConversationMemberState.done)
                  }
                  className="rounded-lg p-2 border flex flex-row items-center space-x-2
             text-slate-400 text-xs hover:bg-slate-50"
                >
                  <FaCheck />
                  <span>Done</span>
                </button>
              )}
            </span>
          </span>

          {convo?.tldr && (
            <span className="max-w-md text-lg text-teal-800 mb-2">
              tldr: {convo?.tldr}
            </span>
          )}

          {/* have one row, but just translate it along y downward to put it in it's own place */}
          <span className="flex flex-row flex-nowrap pb-[10rem] py-[5rem] overflow-auto min-h-max">
            {audioClips.reverse().map((audClip, index) => {
              return (
                <TimelineAudioClip
                  key={audClip.id}
                  index={index}
                  audioClip={audClip}
                  convoId={props.conversationId}
                />
              );
            })}

            <span ref={endOfTimeline}></span>
          </span>

          {/* stuff for recording and playing action */}
          <span className="mx-auto flex flex-row py-10 space-x-5">
            <Tooltip title={"Press and hold R to send a voice clip."}>
              <span
                className="ml-auto shadow-lg flex flex-row items-center p-5 
            justify-center rounded-lg bg-slate-50 font-bold hover:cursor-pointer"
              >
                <FaMicrophone className="text-xl text-orange-700" />
              </span>
            </Tooltip>

            <Tooltip title={"SPACE to play last conversation chunk."}>
              <span
                className="shadow-lg flex flex-row items-center p-5 justify-center 
          rounded-lg bg-slate-50 font-bold"
              >
                <FaPlay className="text-teal-600 text-xl" />
              </span>
            </Tooltip>
          </span>
        </div>

        {/* drawer items */}
        <div className="flex-1 flex flex-col">
          <span className="text-md tracking-widest font-semibold text-slate-300 uppercase mb-2">
            Shared
          </span>

          {/* row of cards drawer items  */}
          <span className="flex flex-row items-stretch gap-5 overflow-auto w-full pb-10">
            {testDrawerItems.map((link) => (
              <span
                key={link.linkName}
                className="group flex flex-row items-center border rounded 
                p-2 hover:bg-slate-50 transition-all shrink-0 w-[15rem] bg-slate-50 text-ellipsis"
              >
                {/* <span className="rounded-lg bg-slate-200 p-2 hover:cursor-pointer"></span> */}

                <LinkIcon
                  linkType={link.linkType}
                  className="text-3xl shrink-0"
                />

                <span className="flex flex-col ml-2">
                  <span className="text-slate-400 text-sm">
                    {link.linkName}
                  </span>
                  <span className="text-slate-300 text-xs">
                    {link.relativeSentTime}
                  </span>
                </span>

                <span className="flex flex-row ml-auto space-x-1 group-hover:visible invisible">
                  <Tooltip title={"Add to personal drawer."}>
                    <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200 ">
                      <FaImages className="text-xl text-slate-400" />
                    </span>
                  </Tooltip>

                  <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200 ">
                    <FaExternalLinkAlt className="text-lg text-slate-400" />
                  </span>
                </span>
              </span>
            ))}
          </span>
        </div>
      </div>
    </>
  );
}
