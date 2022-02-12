import { LinkType } from "@nirvana/common/models/conversation";
import { UserStatus } from "@nirvana/common/models/user";
import { Tooltip } from "antd";
import { duration } from "moment";
import {
  LegacyRef,
  useEffect,
  useRef,
  useState,
  MutableRefObject,
} from "react";
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
  audioQueueCurrentClipSelector,
  isRecordingAtom,
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
import Modal from "antd/lib/modal/Modal";
import { configure, GlobalHotKeys, KeyMap } from "react-hotkeys";
import CreateItemModal from "../Drawer/CreateItemModal";
import isValidHttpUrl from "../../helpers/urlHelper";

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

enum ConvoModal {
  na = "na",
  editTldr = "editTldr",
  adminEdit = "adminEdit",
}

export default function ViewConvo(props: { conversationId: string }) {
  const { currUser } = useAuth();

  const allConvosMap = useRecoilValue(allRelevantConversationsAtom);

  const endOfTimeline = useRef<HTMLSpanElement>(null);

  const [currentConvoModal, setCurrConvoModal] = useState<ConvoModal>(
    ConvoModal.na
  );

  const router = useRouter();

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
    endOfTimeline.current?.scrollIntoView({ behavior: "smooth" });
  }, [audioClips]);

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

  const handleCloseModal = () => {
    setCurrConvoModal(ConvoModal.na);
  };

  // to allow not having commands while editing the input
  configure({
    ignoreTags: ["input", "select", "textarea"],
  });

  const handleEditTldr = () => {
    console.log("updating tldr with modal");
  };

  const [editTldrMode, setEditTldrMode] = useState<boolean>(false);
  const [newTldr, setNewTldr] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const saveNewTldr = async (e) => {
    if (!newTldr) {
      toast.error("can't have a blank tldr!");
      return;
    }

    setIsSubmitting(true);

    try {
      await conversationService.updateTldr(
        props.conversationId,
        newTldr,
        currUser!.uid
      );

      toast.success("Updated TLDR;");

      setEditTldrMode(false);
    } catch (error) {
      toast.error("problem in updating tldr");
      console.error(error);
    }

    setIsSubmitting(false);
  };

  const handleAdminEdit = () => {
    toast("Coming soon!");
  };

  const isRecording = useRecoilValue(isRecordingAtom);
  const audioQueueCurrentItem = useRecoilValue(audioQueueCurrentClipSelector);

  const [showItemModal, setShowItemModal] = useState<boolean>(false);
  const [pastedLink, setPastedLink] = useState<string>("");

  const handleCloseDrawerItemModal = () => {
    setShowItemModal(false);
  };

  const handleOpenDrawerItemModal = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        console.log("Pasted content: ", text);

        // check that the link is valid
        if (!isValidHttpUrl(text)) {
          toast.error("Not a valid link");
          return;
        }

        // set it as we should show modal regardless now
        setPastedLink(text);

        setShowItemModal(true);
      })
      .catch((err) => {
        console.error("Failed to read clipboard contents: ", err);
        toast.error("Please enable permissions for clipboard");
      });
  };

  const keyMap: KeyMap = {
    PASTE_LINK: "ctrl+v",
  };

  const handlers = {
    PASTE_LINK: handleOpenDrawerItemModal,
  };

  return (
    <>
      <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
      <CreateItemModal
        handleClose={handleCloseDrawerItemModal}
        pastedLink={pastedLink}
        show={showItemModal}
      />

      <div className="flex flex-col items-stretch mt-5 space-y-10">
        {/* convo name and action buttons on top */}
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

                <span
                  onClick={handleAdminEdit}
                  className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200 group-hover:visible invisible"
                >
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

          {!editTldrMode ? (
            <>
              <span
                onClick={() => setEditTldrMode(true)}
                className="flex flex-row group items-center"
              >
                <span className="max-w-md text-md text-slate-400 uppercase cursor-pointer whitespace-pre-line">
                  tldr;
                </span>

                <span className="p-2 ml-2 rounded-full hover:cursor-pointer hover:bg-slate-200 group-hover:visible invisible">
                  <FaEdit className="ml-auto text-md text-slate-400" />
                </span>
              </span>

              <span className="max-w-md text-lg text-slate-600 cursor-pointer whitespace-pre-line">
                {convo?.tldr}
              </span>
            </>
          ) : (
            <span className="flex flex-row items-center space-x-2">
              <textarea
                autoFocus
                className="p-2 my-2 flex-1 rounded-md placeholder:text-slate-300 focus:outline-none"
                placeholder="update with a new tldr"
                value={newTldr}
                onChange={(e) => setNewTldr(e.target.value)}
              />

              <button
                onClick={() => setEditTldrMode(false)}
                className="rounded-lg p-2 border border-orange-500 flex flex-row items-center space-x-2
            text-xs hover:bg-orange-500 hover:text-white mx-2 text-orange-500"
              >
                <span>Cancel</span>
              </button>

              <button
                disabled={isSubmitting}
                onClick={saveNewTldr}
                className="rounded-lg p-2 border border-teal-500 flex flex-row items-center space-x-2
            text-xs bg-teal-500 hover:font-semibold mx-2 text-white"
              >
                <span>Save</span>
              </button>
            </span>
          )}

          {/* have one row, but just translate it along y downward to put it in it's own place */}

          <span
            className="flex flex-row flex-nowrap pb-[10rem] py-[5rem] 
          overflow-auto min-h-max shadow-xl bg-slate-50 rounded mt-5"
          >
            {audioClips?.length > 0 ? (
              audioClips.reverse().map((audClip, index) => {
                const restAudioClips = audioClips.slice(index);
                return (
                  <TimelineAudioClip
                    key={audClip.id}
                    index={index}
                    audioClip={audClip}
                    convoId={props.conversationId}
                    audioClipsToPlay={restAudioClips}
                  />
                );
              })
            ) : (
              <span className="text-slate-300 mx-auto my-auto text-center">
                Please get this conversation started <br></br> by pressing and
                holding{" "}
                <span className="text-orange-500 font-semibold">R.</span>
              </span>
            )}

            <span ref={endOfTimeline}></span>
          </span>

          {/* stuff for recording and playing action */}
          <span className="mx-auto flex flex-row py-10 space-x-5">
            <Tooltip title={"Press and hold R to send a voice clip."}>
              <span
                className={`ml-auto shadow-lg flex flex-row items-center p-5 
            justify-center rounded-lg font-bold hover:cursor-pointer ${
              isRecording
                ? "bg-orange-700 text-white"
                : "bg-slate-50 text-orange-700"
            }`}
              >
                <FaMicrophone className="text-xl " />
              </span>
            </Tooltip>

            <Tooltip title={"SPACE to play last conversation chunk."}>
              <span
                className={`shadow-lg flex flex-row items-center p-5 justify-center 
          rounded-lg font-bold ${
            !audioQueueCurrentItem
              ? "bg-slate-50 text-teal-600"
              : " bg-teal-600 text-white"
          }`}
              >
                <FaPlay className="text-xl" />
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
