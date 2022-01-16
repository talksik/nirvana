import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { KeyCode } from "../globals/keycode";

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
}

const AudioContext = React.createContext<AudioContextInterface | null>(null);

export default function AudioContextProvider({ children }) {
  // SECTION: set up for shortcuts and recording and such
  const [selectedTeammate, setSelectedTeamMember] = useState<string>(null); // id of selected teammate
  const [isRecording, setIsRecording] = useState<Boolean>(false);

  const [teamShortcutMappings, setTeamShortcutMappings] = useState<{}>({});

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardShortcut);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyboardShortcut);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  function handleKeyUp(event) {
    console.log("on key up");

    // if was recording and released R, then stop recording
    if (event.keyCode == KeyCode.R) {
      console.log("stopped recording");
      setIsRecording(false);
      setSelectedTeamMember(null);
    }
  }

  function handleKeyboardShortcut(event) {
    if (event.repeat) {
      return;
    }

    console.log(event.keyCode);

    // recording
    if (event.keyCode == KeyCode.R) {
      console.log("started recording");
      setIsRecording(true);
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
    setTeamShortcutMappings((prevMap) => ({ ...prevMap, [keyCode]: [userId] }));
  }

  const value: AudioContextInterface = {
    selectedTeammate,
    setSelectedTeamMember,
    addTeamShortcutBinding,
    isRecording,
    teamShortcutMappings,
    isMuted: false,
    isSilenceMode: false,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

export function useAudioContext() {
  return useContext(AudioContext);
}
