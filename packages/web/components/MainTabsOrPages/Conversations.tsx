import { Avatar, Badge } from "antd";
import { useRouter } from "next/router";
import {
  FaDotCircle,
  FaWalking,
  FaRocket,
  FaCheckDouble,
  FaCircle,
  FaUser,
  FaRegClock,
  FaCheck,
  FaAngleRight,
  FaGithub,
  FaAtlassian,
} from "react-icons/fa";
import { Routes } from "@nirvana/common/helpers/routes";
import LiveRoom from "../Conversations/LiveRoom";
import Conversation from "@nirvana/common/models/conversation";
import { useRecoilValue } from "recoil";
import {
  countNavigationContentSelector,
  liveRoomsSelector,
  RelativeTimeConvosSections,
  RelativeTimeSeparatedConvosSelector,
} from "../../recoil/main";
import ConversationFullRow from "../Conversations/ConversationFullRow";
import LiveRooms from "../LiveRooms/LiveRoomsHandler";
import LiveRoomsHandler from "../LiveRooms/LiveRoomsHandler";
import {
  ClientConfig,
  IAgoraRTC,
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";
import { config, appId } from "@nirvana/common/services/agoraService";
import toast from "react-hot-toast";
import { agoraService, conversationService } from "@nirvana/common/services";
import { useAuth } from "../../contexts/authContext";

export default function Conversations() {
  const router = useRouter();

  const { currUser } = useAuth();

  const liveRooms = useRecoilValue(liveRoomsSelector);

  const [agoraRtc, setAgoraRtc] = useState<IAgoraRTC>();
  const [agoraRtcClient, setAgoraRtcClient] = useState<IAgoraRTCClient>();
  const [localAudioTrack, setLocalAudioTrack] =
    useState<IMicrophoneAudioTrack>();

  // set up agora stuff
  useEffect(() => {
    (async function () {
      // dynamic import as the server side import doesn't work
      const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
      const agoraClient = AgoraRTC.createClient(config);

      setAgoraRtcClient(agoraClient);
      setAgoraRtc(AgoraRTC);
    })();
  }, []);

  async function handleJoinChannel(channelName: string, agoraToken: string) {
    const localTrack: IMicrophoneAudioTrack =
      await agoraRtc!.createMicrophoneAudioTrack();

    setLocalAudioTrack(localTrack);

    const init = async (chanName: string) => {
      agoraRtcClient!.on("user-published", async (user, mediaType) => {
        await agoraRtcClient!.subscribe(user, mediaType);
        console.log("subscribe success");

        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      agoraRtcClient!.on("user-unpublished", async (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }

        await agoraRtcClient!.unsubscribe(user);
      });

      agoraRtcClient!.on("user-left", (user) => {
        console.log("user left", user);
      });

      await agoraRtcClient!.join(appId, chanName, agoraToken, null);
      if (localTrack) await agoraRtcClient!.publish(localTrack);
    };

    if (localTrack) {
      console.log("init ready");
      init(channelName);
    } else {
      toast.error("Not ready for joining call");
      return;
    }
  }

  async function handleLeaveChannel() {
    // destroy local track
    localAudioTrack?.close();

    // leave all channels
    await agoraRtcClient!.leave();
  }

  // click on join
  // add me to the active list of people in the call
  // update the conversation lastActivityDate as well

  const handleJoinLive = async (conversationId: string) => {
    const connectingToast = toast.loading("connecting");

    try {
      // agora token from CF
      const agoraToken = await agoraService.getAgoraToken(conversationId);

      console.log(agoraToken);

      await conversationService.joinLiveConversation(
        conversationId,
        currUser!.uid
      );
    } catch {
      toast.error("problem in joining");
    }

    toast.remove(connectingToast);
  };

  const handleLeaveLive = async (conversationId: string) => {
    const leavingToast = toast.loading("leaving");

    try {
      await conversationService.leaveLiveConversation(
        conversationId,
        currUser!.uid
      );
    } catch {
      toast.error("problem in joining");
    }

    toast.remove(leavingToast);
  };

  // agora start the call stream

  // leave the call on before unload if in a call

  // update the database to remove my userId from the list of people in the room

  const relativeConvoSections = useRecoilValue(
    RelativeTimeSeparatedConvosSelector
  );

  const todayConvos = relativeConvoSections.get(
    RelativeTimeConvosSections.today
  );
  const last7DaysConvos = relativeConvoSections.get(
    RelativeTimeConvosSections.last7Days
  );
  const earlierMonthConvos = relativeConvoSections.get(
    RelativeTimeConvosSections.earlierThisMonth
  );
  const oldJunkConvos = relativeConvoSections.get(
    RelativeTimeConvosSections.oldJunk
  );

  const navConvoCounts = useRecoilValue(countNavigationContentSelector);
  const isStaleState =
    navConvoCounts.liveCount == 0 && navConvoCounts.defaultCount == 0;

  if (isStaleState) {
    return (
      <div className="mx-auto my-auto flex flex-col">
        <img
          src="/illustrations/undraw_meditation_re_gll0.svg"
          className="h-[15rem] mx-auto my-auto"
        />

        <span></span>
        <span className="text-slate-400 text-center mt-5">
          {"Oh the sound of silence..."}
        </span>
      </div>
    );
  }

  return (
    <>
      {/* live rooms */}
      {liveRooms?.length > 0 && (
        <>
          <span className="flex flex-row items-center mb-5 px-5 w-full">
            <FaDotCircle className="text-orange-500 text-lg mr-1" />
            <span className="text-md tracking-widest font-semibold text-slate-300 uppercase">
              Live
            </span>
          </span>

          {/* row of live room cards */}
          <span className="flex flex-col w-full items-stretch">
            {liveRooms.map((lRoom) => (
              <LiveRoom
                key={lRoom.id}
                conversation={lRoom}
                handleJoinLive={handleJoinLive}
                handleLeaveLive={handleLeaveLive}
              />
            ))}
          </span>
        </>
      )}

      {/* Today */}
      {todayConvos && todayConvos?.length > 0 && (
        <>
          <span className="flex flex-row items-center mb-5 px-5 w-full mt-10">
            <span className="text-md tracking-widest font-semibold text-slate-300 uppercase">
              Today
            </span>
          </span>
          <span className="flex flex-col w-full items-stretch">
            {todayConvos.map((tRoom) => (
              <ConversationFullRow
                key={tRoom.id}
                conversation={tRoom}
                handleJoinLive={handleJoinLive}
                handleLeaveLive={handleLeaveLive}
              />
            ))}
          </span>
        </>
      )}

      {/*  last 7 days */}
      {last7DaysConvos && last7DaysConvos?.length > 0 && (
        <>
          <span className="flex flex-row items-center mb-5 px-5 w-full mt-10">
            <span className="text-md tracking-widest font-semibold text-slate-300 uppercase">
              Last 7 Days
            </span>
          </span>
          <span className="flex flex-col w-full items-stretch">
            {last7DaysConvos.map((tRoom) => (
              <ConversationFullRow
                key={tRoom.id}
                conversation={tRoom}
                handleJoinLive={handleJoinLive}
                handleLeaveLive={handleLeaveLive}
              />
            ))}
          </span>
        </>
      )}

      {/* earlier this month */}
      {earlierMonthConvos && earlierMonthConvos?.length > 0 && (
        <>
          <span className="flex flex-row items-center mb-5 px-5 w-full mt-10">
            <span className="text-md tracking-widest font-semibold text-slate-300 uppercase">
              Earlier This Month
            </span>
          </span>
          <span className="flex flex-col w-full items-stretch">
            {earlierMonthConvos.map((tRoom) => (
              <ConversationFullRow
                key={tRoom.id}
                conversation={tRoom}
                handleJoinLive={handleJoinLive}
                handleLeaveLive={handleLeaveLive}
              />
            ))}
          </span>
        </>
      )}

      {/* old junk */}
      {oldJunkConvos && oldJunkConvos?.length > 0 && (
        <>
          <span className="flex flex-row items-center mb-5 px-5 w-full mt-10">
            <span className="text-md tracking-widest font-semibold text-slate-300 uppercase">
              Older Junk
            </span>
          </span>
          <span className="flex flex-col w-full items-stretch">
            {oldJunkConvos.map((tRoom) => (
              <ConversationFullRow
                key={tRoom.id}
                conversation={tRoom}
                handleJoinLive={handleJoinLive}
                handleLeaveLive={handleLeaveLive}
              />
            ))}
          </span>
        </>
      )}

      <span className="mx-auto mt-5 text-slate-300 flex flex-col">
        <span className="">{"That's all"}</span>
      </span>
    </>
  );
}
