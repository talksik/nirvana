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

export default function Conversations() {
  const router = useRouter();

  const liveRooms = useRecoilValue(liveRoomsSelector);
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
      {/*  live */}
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
              <LiveRoom key={lRoom.id} conversation={lRoom} />
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
              <ConversationFullRow key={tRoom.id} conversation={tRoom} />
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
              <ConversationFullRow key={tRoom.id} conversation={tRoom} />
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
              <ConversationFullRow key={tRoom.id} conversation={tRoom} />
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
              <ConversationFullRow key={tRoom.id} conversation={tRoom} />
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
