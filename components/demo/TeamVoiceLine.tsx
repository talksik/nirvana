import { FaArrowCircleDown, FaPlus } from "react-icons/fa";
import { UserStatus } from "../../models/user";

import Image from "next/image";
import { IoPulseOutline, IoRemoveOutline } from "react-icons/io5";
import { DemoStep, IVoiceDemoProps } from "./VoiceLineConceptDemo";
import { Popover, Tooltip } from "antd";
import { useCallback, useEffect, useState } from "react";
import { KeyCode } from "../../globals/keycode";
import toast from "react-hot-toast";

import { GlobalHotKeys, HotKeys, KeySequence, KeyMap } from "react-hotkeys";

let testFriends = [
  {
    name: "Harold",
    role: "engineer",
    systemAvatar: "29",
    status: UserStatus.online,
  },
  {
    name: "Emily",
    role: "engineer",
    systemAvatar: "02",
    status: UserStatus.online,
  },
  {
    name: "Paul",
    role: "architect",
    systemAvatar: "43",
    status: UserStatus.online,
  },
  {
    name: "Mark",
    role: "designer",
    systemAvatar: "04",
    status: UserStatus.busy,
  },
];

function statusBubble(status: UserStatus) {
  switch (status) {
    case UserStatus.online:
      return (
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></span>
      );
    case UserStatus.busy:
      return (
        <span className="absolute top-0 right-0 w-3 h-3 bg-orange-400 rounded-full"></span>
      );
    case UserStatus.offline:
      return (
        <span className="absolute top-0 right-0 w-3 h-3 bg-gray-400 rounded-full"></span>
      );
    default:
      return (
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></span>
      );
  }
}

function renderPulse(status: UserStatus) {
  switch (status) {
    case UserStatus.online:
      return (
        <IoPulseOutline className="text-green-500 text-2xl animate-pulse mx-2 ml-auto" />
      );
    case UserStatus.busy:
      return (
        <IoPulseOutline className="text-orange-400 text-2xl animate-pulse mx-2 ml-auto" />
      );
    case UserStatus.offline:
      return (
        <IoRemoveOutline className="text-gray-400 text-2xl mx-2 ml-auto" />
      );
    default:
      return (
        <IoPulseOutline className="text-green-400 text-2xl animate-pulse mx-2 ml-auto" />
      );
  }
}

function TeamVoiceLine(props: IVoiceDemoProps) {
  const isVoiceLineTurn =
    props.demoStep == DemoStep.playIncomingMessage ||
    props.demoStep == DemoStep.hearReply ||
    props.demoStep == DemoStep.sendReply ||
    props.demoStep == DemoStep.doneDemo;

  useEffect(() => {
    if (props.demoStep == DemoStep.playIncomingMessage) {
      // play audio of paul talking

      var audio = new Audio(
        "https://firebasestorage.googleapis.com/v0/b/nirvana-for-business.appspot.com/o/messages%2F62ca7369-7c0c-4b3e-a382-12d4a237d1af.mp3?alt=media&token=b6d4acb0-afc9-4a9f-8c58-cf60a6079003"
      );
      audio.play();

      setTimeout(function () {
        props.handleChangeDemoStep(DemoStep.sendReply);
      }, 10000);
    } else if (props.demoStep == DemoStep.sendReply) {
    } else if (props.demoStep == DemoStep.hearReply) {
      var audio = new Audio(
        "https://firebasestorage.googleapis.com/v0/b/nirvana-for-business.appspot.com/o/deep%20fakes%2Fvocodes_728915c1-eb1f-4f16-8f70-c7b0c2235b3e.wav?alt=media&token=76afd74c-7499-4bd8-9c10-dd6ff4f81c48"
      );
      audio.play();

      setTimeout(function () {
        props.handleChangeDemoStep(DemoStep.playAnnouncement);
      }, 6000);
    }
  }, [props.demoStep]);

  const [isRecording, setIsRecording] = useState<boolean>(false);

  function startRecord(event) {
    setIsRecording(true);
  }

  function endRecording(event) {
    toast.success("Paul heard it live!");

    setIsRecording(false);

    setTimeout(function () {
      toast.success("Mark is talking...");

      props.handleChangeDemoStep(DemoStep.hearReply);
    }, 3000);
  }

  const keyMap: KeyMap = {
    RECORD: "r",
    STOP_RECORDING: {
      name: "Stop recording",
      sequence: "r",
      action: "keyup",
    },
  };
  const handlers = { RECORD: startRecord, STOP_RECORDING: endRecording };

  return (
    <section
      className={`p-5 flex w-80 flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-2xl z-10 translate-y-24 translate-x-20 backdrop-blur-xl transition-all duration-300 ${
        !isVoiceLineTurn ? "blur-sm" : ""
      } ${props.demoStep == DemoStep.doneDemo ? "z-30" : ""}`}
    >
      {/* keyboard shortcut handler */}
      <GlobalHotKeys keyMap={keyMap} handlers={handlers} />

      <span className="flex flex-row justify-start items-center pb-5">
        <span className="flex flex-col">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            TEAM
          </span>
        </span>

        <Tooltip title="You will be able to add team members to your voice line.">
          <button className="bg-gray-400 bg-opacity-25 p-2 ml-auto rounded hover:bg-opacity-40">
            <FaPlus className="text-lg text-gray-500" />
          </button>
        </Tooltip>
      </span>

      {/* list of team members */}
      {testFriends.map((friend, i) => {
        return (
          <span
            key={i}
            className={`flex flex-row items-center py-2 px-2 justify-items-start ease-in-out duration-300 rounded-lg ${
              (friend.name == "Paul" &&
                props.demoStep == DemoStep.playIncomingMessage) ||
              (friend.name == "Mark" && props.demoStep == DemoStep.hearReply)
                ? "bg-orange-500 bg-opacity-20"
                : ""
            }`}
          >
            <span
              className={`relative flex mr-2 shrink-0 ${
                (friend.name == "Paul" &&
                  props.demoStep == DemoStep.playIncomingMessage) ||
                (friend.name == "Mark" && props.demoStep == DemoStep.hearReply)
                  ? "animate-pulse"
                  : ""
              }`}
            >
              <span className="bg-gray-200 bg-opacity-30 rounded-full shadow-md absolute w-full h-full"></span>

              {statusBubble(friend.status)}

              <Image
                src={
                  "/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-" +
                  friend.systemAvatar +
                  ".svg"
                }
                alt="profile"
                width={50}
                height={50}
              />
            </span>

            <span className="flex flex-col mr-10">
              <span className="flex flex-row items-center space-x-2">
                <span className="text-sm text-gray-600 font-semibold">
                  {friend.name}{" "}
                </span>

                {(friend.name == "Paul" &&
                  props.demoStep == DemoStep.playIncomingMessage) ||
                (friend.name == "Mark" &&
                  props.demoStep == DemoStep.hearReply) ? (
                  <FaArrowCircleDown className="text-orange-500 text-xl animate-bounce" />
                ) : (
                  <></>
                )}

                {friend.name == "Paul" &&
                props.demoStep == DemoStep.sendReply ? (
                  <Tooltip
                    title={
                      "PRESS AND HOLD R (on your keyboard) to record a message and send"
                    }
                    visible={!isRecording}
                  >
                    <button
                      className={`rounded-lg py-1 px-2 shadow-lg 
                                text-center text-sm font-bold ranimate-bounce ${
                                  isRecording
                                    ? "bg-orange-500 text-white"
                                    : "text-orange-500"
                                }`}
                    >
                      R
                    </button>
                  </Tooltip>
                ) : (
                  <button
                    className={`rounded-lg py-1 px-2 shadow-lg 
                                text-center text-sm font-bold ${
                                  friend.name == "Paul"
                                    ? "text-orange-500"
                                    : "text-gray-200 "
                                }`}
                  >
                    {i}
                  </button>
                )}
              </span>

              <span className={"text-xs span-sans text-gray-400"}>
                {friend.role}
              </span>
            </span>

            {renderPulse(friend.status)}
          </span>
        );
      })}
    </section>
  );
}

export default TeamVoiceLine;
