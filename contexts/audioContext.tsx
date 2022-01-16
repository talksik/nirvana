import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { KeyCode } from "../globals/keycode";
import MicRecorder from "mic-recorder-to-mp3";

interface AudioContextInterface {
  selectedTeammate: string; // can only have one selected
  selectTeamMember: Function;

  teamShortcutMappings: {};
  addTeamShortcutBinding: Function;

  isRecording: Boolean; // can only record if someone is selected or maybe for an announcement

  // inputDevice: string;

  // outputDevice: string;

  isMuted: Boolean;
  isSilenceMode: Boolean; // won't automatically listen to notifications or sounds
  muteOrUnmute: Function;
  silenceOrLivenMode: Function;

  hasRecPermit: Boolean; // permission to record or not

  audioInputDeviceId: string;
  audioOutputDeviceId: string;

  selectAudioOutput: Function;
  selectAudioInput: Function;

  inputDevices: MediaDeviceInfo[];
  outputDevices: MediaDeviceInfo[];
}

const AudioContext = React.createContext<AudioContextInterface | null>(null);

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

function stopBothVideoAndAudio(stream) {
  stream.getTracks().forEach(function (track) {
    if (track.readyState == "live") {
      track.stop();

      console.log("stopped playing anything");
    }
  });
}

export default function AudioContextProvider({ children }) {
  // SECTION: set up for shortcuts and recording and such
  const [selectedTeammate, setSelectedTeamMember] = useState<string>(null); // id of selected teammate
  const [isRecording, setIsRecording] = useState<Boolean>(false);
  const [hasRecPermit, setHasRecPermit] = useState<Boolean>(false);

  const [teamShortcutMappings, setTeamShortcutMappings] = useState<{}>(null);
  const [audioInputDeviceId, setAudioInputDevice] = useState<string>(null); // device id
  const [audioOutputDeviceId, setAudioOutputDevice] = useState<string>(null); // device id

  const [inputDevices, setInputDevices] = useState<MediaDeviceInfo[]>([]);
  const [outputDevices, setOutputDevices] = useState<MediaDeviceInfo[]>([]);

  const [isMuted, setIsMuted] = useState<Boolean>(false);
  const [isSilenceMode, setIseSilenceMode] = useState<Boolean>(false);

  const value: AudioContextInterface = {
    selectedTeammate,
    selectTeamMember,
    addTeamShortcutBinding,
    isRecording,
    teamShortcutMappings,

    isMuted,
    isSilenceMode,
    muteOrUnmute,
    silenceOrLivenMode,

    hasRecPermit,

    audioInputDeviceId,
    audioOutputDeviceId,
    selectAudioOutput,
    selectAudioInput,

    inputDevices,
    outputDevices,
  };

  function muteOrUnmute() {
    setIsMuted((prevVal) => !prevVal);
  }

  function silenceOrLivenMode() {
    setIseSilenceMode((prevVal) => !prevVal);
  }

  function selectAudioOutput(deviceId: string) {
    setAudioOutputDevice(deviceId);
  }

  function selectAudioInput(deviceId: string) {
    setAudioInputDevice(deviceId);
  }

  // set up audio
  useEffect(() => {
    (async function () {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();

        const inputDevices: MediaDeviceInfo[] = devices.filter(
          (d) => d.kind == "audioinput"
        );

        setAudioInputDevice(inputDevices ? inputDevices[0].deviceId : null);
        setInputDevices(inputDevices);

        const outputDevices: MediaDeviceInfo[] = devices.filter(
          (d) => d.kind == "audiooutput"
        );

        setAudioOutputDevice(outputDevices ? outputDevices[0].deviceId : null);
        setOutputDevices(outputDevices);
        console.log(devices);
      } catch (e) {
        console.log(e);
        toast.error("Problem in setting up audio devices");
      }
    })();
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: { deviceId: audioInputDeviceId } })
      .then((stream) => {
        // stop playing anything
        stopBothVideoAndAudio(stream);

        console.log("Permission Granted");
        setHasRecPermit(true);
      })
      .catch((e) => {
        console.log("Permission Denied");
        toast.error("Please make sure that you have connected a microphone.");
        setHasRecPermit(false);
      });
  }, [audioInputDeviceId]); // change it everytime we change the input device

  // shortcut handlers need to be updated as the function has to have the fresh state
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardShortcut);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyboardShortcut);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [teamShortcutMappings, selectedTeammate]);

  // SECTION: recording
  async function startRecording() {
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
  async function stopRecording() {
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

    console.log(selectedTeammate); // use this to send the message to the right person

    // if was recording and released R, then stop recording
    if (event.keyCode == KeyCode.R && selectedTeammate) {
      console.log("stopped recording");
      setIsRecording(false);
      setSelectedTeamMember(null);

      stopRecording();
    }
  }

  function handleKeyboardShortcut(event) {
    if (event.repeat) {
      return;
    }

    console.log(event.keyCode);
    console.log(selectedTeammate);

    // recording
    if (event.keyCode == KeyCode.R && selectedTeammate) {
      if (!audioInputDeviceId) {
        toast.error("No microphone selected");
      }

      console.log("started recording");
      setIsRecording(true);
      startRecording();
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

  function selectTeamMember(userId: string) {
    setSelectedTeamMember(userId);
  }

  console.log(value);

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

export function useAudioContext() {
  return useContext(AudioContext);
}
