import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { KeyCode } from "../globals/keycode";
import MicRecorder from "mic-recorder-to-mp3";

interface AudioContextInterface {
  selectedTeammate: string; // can only have one selected
  setSelectedTeamMember: Function;

  teamShortcutMappings: {};
  addTeamShortcutBinding: Function;

  isRecording: Boolean; // can only record if someone is selected or maybe for an announcement

  // inputDevice: string;

  // outputDevice: string;

  isMuted: Boolean;
  isSilenceMode: Boolean; // won't automatically listen to notifications or sounds

  hasRecPermit: Boolean; // permission to record or not
}

const AudioContext = React.createContext<AudioContextInterface | null>(null);

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function AudioContextProvider({ children }) {
  // SECTION: set up for shortcuts and recording and such
  const [selectedTeammate, setSelectedTeamMember] = useState<string>(null); // id of selected teammate
  const [isRecording, setIsRecording] = useState<Boolean>(false);
  const [hasRecPermit, setHasRecPermit] = useState<Boolean>(false);

  const [teamShortcutMappings, setTeamShortcutMappings] = useState<{}>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        console.log("Permission Granted");
        setHasRecPermit(true);
      })
      .catch(() => {
        console.log("Permission Denied");
        setHasRecPermit(false);
      });
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardShortcut);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyboardShortcut);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [teamShortcutMappings]);

  // SECTION: recording
  function startRecording() {
    if (!hasRecPermit) {
      toast.error("You did not allow recording permission!");
    } else {
      Mp3Recorder.start()
        .then(() => {
          toast.success("started recording");
        })
        .catch((e) =>
          toast.error("there was a problem in starting your recording")
        );
    }
  }

  // everything to do with audio file
  function stopRecording() {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);

        const file = new File(buffer, "me-at-thevoice.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });

        const player = new Audio(URL.createObjectURL(file));
        player.play();

        toast.success("Audio Clip Sent");
      })
      .catch((e) => toast.error("Problem in sending clip"));
  }

  function handleKeyUp(event) {
    console.log("on key up");

    // if was recording and released R, then stop recording
    if (event.keyCode == KeyCode.R && selectedTeammate) {
      console.log("stopped recording");
      setIsRecording(false);
      setSelectedTeamMember(null);

      // stopRecording();
    }
  }

  function handleKeyboardShortcut(event) {
    if (event.repeat) {
      return;
    }

    console.log(event.keyCode);
    console.log(selectedTeammate);
    console.log(teamShortcutMappings);

    // recording
    if (event.keyCode == KeyCode.R && selectedTeammate) {
      console.log("started recording");
      setIsRecording(true);
      // startRecording();
    }
    // if we have a valid user for such a shortcut, then go ahead...otherwise
    else if (teamShortcutMappings[event.keyCode]) {
      setSelectedTeamMember(teamShortcutMappings[event.keyCode]);
    } else if (event.keyCode == KeyCode.Escape) {
      setSelectedTeamMember(null);
    } else {
      toast("Invalid keyboard shortcut.");
    }

    // todo if we press the same shortcut twice, deactive selected user
  }

  function addTeamShortcutBinding(keyCode: number, userId: string) {
    setTeamShortcutMappings((prevMap) => ({ ...prevMap, [keyCode]: userId }));
  }

  const value: AudioContextInterface = {
    selectedTeammate,
    setSelectedTeamMember,
    addTeamShortcutBinding,
    isRecording,
    teamShortcutMappings,
    isMuted: false,
    isSilenceMode: false,
    hasRecPermit,
  };

  console.log(value);

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

export function useAudioContext() {
  return useContext(AudioContext);
}
