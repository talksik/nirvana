import React, { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { KeyCode } from "../globals/keycode";
import MicRecorder from "mic-recorder-to-mp3";
import { v4 as uuidv4 } from "uuid";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import CloudStorageService from "../services/cloudStorageService";

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

function stopBothVideoAndAudio(stream) {
  stream.getTracks().forEach(function (track) {
    if (track.readyState == "live") {
      track.stop();

      console.log("stopped playing anything");
    }
  });
}

const cloudStorageService = new CloudStorageService();

export default function AudioContextProvider({ children }) {
  // SECTION: set up for shortcuts and recording and such
  const [selectedTeammate, setSelectedTeamMember] = useState<string>(null); // id of selected teammate
  const [isRecording, setIsRecording] = useState<Boolean>(false);
  const [hasRecPermit, setHasRecPermit] = useState<Boolean>(false);

  const [teamShortcutMappings, setTeamShortcutMappings] = useState<{}>({});
  const [audioInputDeviceId, setAudioInputDevice] = useState<string>(null); // device id
  const [audioOutputDeviceId, setAudioOutputDevice] = useState<string>(null); // device id

  const [inputDevices, setInputDevices] = useState<MediaDeviceInfo[]>([]);
  const [outputDevices, setOutputDevices] = useState<MediaDeviceInfo[]>([]);

  const [isMuted, setIsMuted] = useState<Boolean>(false);
  const [isSilenceMode, setIseSilenceMode] = useState<Boolean>(false);

  const [recorder, setRecorder] = useState<MicRecorder>(
    new MicRecorder({ bitRate: 128 })
  );

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
    toast.success(isMuted ? "Unmuted" : "Muted");

    setIsMuted((prevVal) => !prevVal);
  }

  function silenceOrLivenMode() {
    toast.success(isSilenceMode ? "Unsilenced" : "Auto listen mode disabled");

    setIseSilenceMode((prevVal) => !prevVal);
  }

  function selectAudioOutput(deviceId: string) {
    toast.success("Changed output device");
    setAudioOutputDevice(deviceId);
  }

  function selectAudioInput(deviceId: string) {
    toast.success("Changed input device");
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
      } catch (e) {
        console.log(e);
        toast.error("Problem in setting up audio devices");
      }
    })();
  }, [hasRecPermit]);

  // first load just force check if permissions enabled
  // through fake stream
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
        toast.error(
          "Please make sure that you have connected a microphone and given permissions."
        );
        setHasRecPermit(false);
      });
  }, []);

  // set recording device
  useEffect(() => {
    setRecorder(
      new MicRecorder({ bitRate: 128, deviceId: audioInputDeviceId })
    );
  }, [audioInputDeviceId]); // change it everytime we change the input device

  // SECTION: recording
  async function startRecording() {
    recorder
      .start()
      .then(() => {
        toast.success("started recording");
      })
      .catch((e) =>
        toast.error("there was a problem in starting your recording")
      );
  }

  async function stopRecording(): Promise<File> {
    return new Promise((resolve, reject) => {
      recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const blobURL = URL.createObjectURL(blob);

          const file = new File(buffer, uuidv4() + ".mp3", {
            type: blob.type,
            lastModified: Date.now(),
          });

          const player = new Audio(URL.createObjectURL(file));
          player.onended = onEndedPlaying;
          player.play();

          resolve(file);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  }

  function onEndedPlaying(e) {
    toast.success("finished playing");

    setStartPlaying(false);
  }

  // todo usecallback hook

  const handleKeyUp = useCallback(
    (event) => {
      console.log("on key up");

      // if was recording and released R, then stop recording
      if (event.keyCode == KeyCode.R && selectedTeammate && isRecording) {
        console.log("stopped recording");
        setIsRecording(false);

        stopRecording()
          .then((file) => {
            console.log(file);

            // upload to cloud storage
            return cloudStorageService.uploadMessageAudioFile(file);
          })
          .then((downloadUrl) => {
            console.log("file is stored: " + downloadUrl);

            // send message to firestore

            return;
          })
          .then(() => {})
          .catch((error) => {
            toast.error("Problem in sending clip");
          });

        console.log("sending message to " + selectedTeammate);

        setSelectedTeamMember(null);
      }
    },
    [isRecording, selectedTeammate]
  );

  const testAudioClip =
    "https://firebasestorage.googleapis.com/v0/b/nirvana-ccf04.appspot.com/o/messages%2F0E248EA9-AABC-4921-A06B-F1330DFBEE4A.m4a?alt=media&token=9cc81944-96a8-449f-a08f-50925d776565";

  const handleKeyboardShortcut = useCallback(
    (event) => {
      if (event.repeat) {
        return;
      }

      console.log(event.keyCode);
      console.log(selectedTeammate);

      // recording
      if (event.keyCode == KeyCode.R) {
        if (!audioInputDeviceId) {
          toast.error("No microphone selected");
        } else if (!hasRecPermit) {
          toast.error("You did not allow recording permission!");
        } else if (!selectedTeammate) {
          toast.error("Please select a team member or announcements first");
        } else if (isMuted) {
          toast.error("You are muted!");
        } else {
          // alright now you are good to go
          console.log("started recording");
          setIsRecording(true);
          startRecording();
        }
      }
      // if we have a valid user for such a shortcut, then go ahead...otherwise
      else if (teamShortcutMappings[event.keyCode]) {
        setSelectedTeamMember(teamShortcutMappings[event.keyCode]);
      } else if (event.keyCode == KeyCode.Escape) {
        setSelectedTeamMember(null);
      } else if (event.keyCode == KeyCode.Space) {
        if (isSilenceMode) {
          toast.error("you are in silence mode, please disable it first");
        } else {
          // alright now you are good to play messages
          setStartPlaying(true);
        }
      } else {
        toast("Invalid keyboard shortcut.");
      }

      // todo play message if pressing space

      // todo if we press the same shortcut twice, deactive selected user
    },
    [
      selectedTeammate,
      audioInputDeviceId,
      hasRecPermit,
      isMuted,
      teamShortcutMappings,
    ]
  );

  // IMPORTANT: shortcut handlers need to be updated as the function has to have the fresh state
  useEffect(() => {
    console.log("updating event listeners");
    document.addEventListener("keydown", handleKeyboardShortcut);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyboardShortcut);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyboardShortcut, handleKeyUp]);

  function addTeamShortcutBinding(keyCode: number, userId: string) {
    setTeamShortcutMappings((prevMap) => ({ ...prevMap, [keyCode]: userId }));
  }

  function selectTeamMember(userId: string) {
    setSelectedTeamMember(userId);
  }

  const [startPlaying, setStartPlaying] = useState<Boolean>(false);

  return (
    <AudioContext.Provider value={value}>
      {children}
      {/* player for audio messages */}

      {startPlaying ? (
        <AudioPlayer
          autoPlay
          src={testAudioClip}
          onPlay={(e) => console.log("onPlay")}
          showSkipControls={true}
          onEnded={onEndedPlaying}
          className="w-screen flex flex-row"
        />
      ) : (
        <></>
      )}
    </AudioContext.Provider>
  );
}

export function useAudioContext() {
  return useContext(AudioContext);
}
