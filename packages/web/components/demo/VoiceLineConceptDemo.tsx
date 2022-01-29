import { Tooltip } from "antd";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import Announcements from "./Announcements";
import TeamVoiceLine from "./TeamVoiceLine";

export enum DemoStep {
  playDemo = "play demo",
  playIncomingMessage = "play incoming message",
  sendReply = "send reply",
  hearReply = "hear reply",
  playAnnouncement = "play announcement",
  doneDemo = "done with demo",
}

export interface IVoiceDemoProps {
  demoStep: DemoStep;

  handleChangeDemoStep: Function;
}

export default function VoiceLineConceptDemo() {
  const [demoStep, setDemoStep] = useState<DemoStep>(DemoStep.playDemo);

  function handleChangeStep(newStep: DemoStep) {
    setDemoStep(newStep);
  }

  return (
    <>
      <TeamVoiceLine
        demoStep={demoStep}
        handleChangeDemoStep={handleChangeStep}
      />

      <Announcements
        demoStep={demoStep}
        handleChangeDemoStep={handleChangeStep}
      />

      {demoStep == DemoStep.playDemo ? (
        <Tooltip title={"Make sure to have your speakers on!"}>
          <button
            onClick={() => setDemoStep(DemoStep.playIncomingMessage)}
            className="absolute mx-auto my-auto left-1/2 top-1/2 
      bg-gray-200 py-2 px-2 rounded font-semibold inline-flex items-center text-teal-600
      space-x-2 animate-bounce z-50"
          >
            <FaPlay /> <span>Play Demo</span>
          </button>
        </Tooltip>
      ) : (
        <button
          onClick={() => setDemoStep(DemoStep.playDemo)}
          className="absolute right-0 bottom-0
      bg-gray-200 bg-opacity-30 py-2 px-2 rounded inline-flex items-center text-teal-600
      space-x-2"
        >
          <span>Reset Demo</span>
        </button>
      )}
    </>
  );
}
