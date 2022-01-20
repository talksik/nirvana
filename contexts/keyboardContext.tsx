import React, { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { KeyCode } from "../globals/keycode";
import MicRecorder from "mic-recorder-to-mp3";
import { v4 as uuidv4 } from "uuid";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import CloudStorageService from "../services/cloudStorageService";
import { Message } from "../models/message";
import { useAuth } from "./authContext";
import { SendService } from "../services/sendService";
import { useTeamDashboardContext } from "./teamDashboardContext";
import isValidHttpUrl from "../helpers/urlHelper";

interface KeyboardContextInterface {
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

  ctrlDown: boolean;

  showModalType: ShowModalType;
  handleModalType: Function;
  pastedLink: string;

  handleAddAudioToQueue: Function;
}

export enum ShowModalType {
  createLink = "link",
  createRoom = "room",
  powerPlayer = "powerPlayer",
  na = "none",
}

const KeyboardContext = React.createContext<KeyboardContextInterface | null>(
  null
);

function stopBothVideoAndAudio(stream) {
  stream.getTracks().forEach(function (track) {
    if (track.readyState == "live") {
      track.stop();

      console.log("stopped playing anything");
    }
  });
}

const cloudStorageService = new CloudStorageService();
const sendService = new SendService();

export default function KeyboardContextProvider({ children }) {
  const { currUser } = useAuth();

  // SECTION: set up for shortcuts and recording and such
  const [selectedTeammate, setSelectedTeamMember] = useState<string>(null); // id of selected teammate
  const [isRecording, setIsRecording] = useState<Boolean>(false);
  const [hasRecPermit, setHasRecPermit] = useState<Boolean>(false);

  const [ctrlDown, setCtrlDown] = useState<boolean>(false);

  const [teamShortcutMappings, setTeamShortcutMappings] = useState<{}>({});
  const [audioInputDeviceId, setAudioInputDevice] = useState<string>(null); // device id
  const [audioOutputDeviceId, setAudioOutputDevice] = useState<string>(null); // device id

  const [inputDevices, setInputDevices] = useState<MediaDeviceInfo[]>([]);
  const [outputDevices, setOutputDevices] = useState<MediaDeviceInfo[]>([]);

  const [isMuted, setIsMuted] = useState<Boolean>(false);
  const [isSilenceMode, setIseSilenceMode] = useState<Boolean>(false);

  const [pastedLink, setPastedLink] = useState<string>(null);
  const [showModalType, setShowModalType] = useState<ShowModalType>(
    ShowModalType.na
  );

  const handleModalType = (modalType: ShowModalType) => {
    handleResetView();
    setShowModalType(modalType);
  };

  const [recorder, setRecorder] = useState<MicRecorder>(
    new MicRecorder({ bitRate: 128 })
  );

  const [audioQueue, setAudioQueue] = useState<string[]>([]); // queue for the player to keep playing

  // playing incoming messages
  const { allMessages, messagesByTeamMate } = useTeamDashboardContext();

  useEffect(() => {
    if (!allMessages.length) {
      toast("no message to play");
      return;
    }

    // only play if it's incoming, as I listened to my message before sending it
    if (allMessages[0].receiverUserId == currUser.uid) {
      console.log("playing message");
      console.log(allMessages[0]);

      // select the user
      setSelectedTeamMember(allMessages[0].senderUserId);

      // start player on the bottom
      // autoplay message
      // add to the queue
      handleAddAudioToQueue([allMessages[0].audioDataUrl]);
    }
  }, [allMessages]);

  // manage audio queue
  useEffect(() => {
    // every time queue changes,
    // setPlayerSrc as the next item if there is any

    if (audioQueue && audioQueue.length > 0) {
      toast("Adding Message to Queue");
      setPlayerSrc(audioQueue[0]);
    }
  }, [audioQueue]);

  const value: KeyboardContextInterface = {
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

    ctrlDown,

    pastedLink,
    handleModalType,
    showModalType,

    handleAddAudioToQueue,
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
  // todo: only call this when starting to record and do it with a usecallback
  useEffect(() => {
    try {
      // won't work in https!!!
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
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
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
    // toast.success("finished playing");

    // remove from queue and the queue manager will handle the rest
    setAudioQueue((prevQueue) => {
      let newQueue: string[] = [...prevQueue];
      newQueue.shift();
      return newQueue;
    });
  }

  const handleKeyUp = useCallback(
    (event) => {
      console.log("on key up");
      console.log(event.keyCode);

      // if was recording and released R, then stop recording and send message
      if (event.keyCode == KeyCode.R && selectedTeammate && isRecording) {
        console.log("stopped recording");
        setIsRecording(false);

        const currReceiverUserId = selectedTeammate;

        stopRecording()
          .then((file) => {
            console.log(file);

            // upload to cloud storage
            return cloudStorageService.uploadMessageAudioFile(file);
          })
          .then((downloadUrl) => {
            console.log("file is stored: " + downloadUrl);

            // send message to firestore
            const message = new Message();
            message.audioDataUrl = downloadUrl;
            message.senderUserId = currUser.uid;
            message.receiverUserId = currReceiverUserId;

            return sendService.sendMessage(message);
          })
          .then(() => {
            toast.success("clip sent");
          })
          .catch((error) => {
            toast.error("Problem in sending clip");
          });

        console.log("sending message to " + selectedTeammate);

        handleResetView();
      } else if (event.keyCode == KeyCode.Ctrl) {
        setCtrlDown(false);
      }
    },
    [isRecording, selectedTeammate]
  );

  const handleKeyboardShortcut = useCallback(
    (event) => {
      // no need to monitor repeats
      if (event.repeat) {
        return;
      }

      // handle for when in modals, don't want any of this crap
      if (showModalType != ShowModalType.na) {
        return;
      }

      console.log(event.keyCode);

      // recording
      if (event.keyCode == KeyCode.R && !ctrlDown) {
        if (!audioInputDeviceId) {
          toast.error("No microphone selected");
        } else if (!hasRecPermit) {
          toast.error(
            "You did not allow microphone permissions in your browser!"
          );
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
        handleResetView();
      } else if (event.keyCode == KeyCode.Space) {
        // listen to last message in convo
        if (isSilenceMode) {
          toast.error("you are in silence mode, please disable it first");
        } else if (!selectedTeammate) {
          toast.error("select a team member first to play");
        } else {
          // alright now you are good to play last message chunk in conversation with selected user

          const arrayMessagesforUser: Message[] =
            messagesByTeamMate.get(selectedTeammate);
          if (
            messagesByTeamMate.has(selectedTeammate) &&
            arrayMessagesforUser &&
            arrayMessagesforUser.length > 0
          ) {
            var convoChunk: string[] = [];
            console.log("playing from this cache");

            // wait for x changes, and then break adding to the queue...I want to hear the past loop of conversation maybe
            const maxConvoChanges: number = 2;
            var convoChangeCount: number = 0;

            var currTalkerId = arrayMessagesforUser[0].senderUserId;
            for (const audioMessage of arrayMessagesforUser) {
              if (audioMessage.senderUserId != currTalkerId) {
                convoChangeCount += 1;
              }

              // heard enough of this convo
              if (convoChangeCount == maxConvoChanges) {
                break;
              }

              convoChunk.push(audioMessage.audioDataUrl);
              currTalkerId = audioMessage.senderUserId;
            }

            // reverse the chunk so that I listen to the messages in order
            convoChunk.reverse();

            // add convo chunk to the queue player
            handleAddAudioToQueue(convoChunk);
          } else {
            toast("nothing to play");
          }
        }
      } else if (event.keyCode == KeyCode.Ctrl) {
        handleResetView();

        setCtrlDown(true);
      } else if (event.keyCode == KeyCode.Q && ctrlDown) {
        toast("navigating to create google meet");

        window.open(new URL("https://meet.google.com/"), "_blank");
      } else if (event.keyCode == KeyCode.V && ctrlDown) {
        toast("pasting link");

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

            // see which modal to go to based on room vs. attachment
            // https://meet.google.com/soc-ebwc-rkt
            if (text.includes("meet.google.com")) {
              setShowModalType(ShowModalType.createRoom);
            } else {
              setShowModalType(ShowModalType.createLink);
            }
          })
          .catch((err) => {
            console.error("Failed to read clipboard contents: ", err);
            toast.error("Please enable permissions for clipboard");
          });
      } else {
        // toast("Invalid keyboard shortcut.");
        console.log("no shortcut logged");
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
      ctrlDown,
      showModalType,
    ]
  );

  function handleResetView() {
    setSelectedTeamMember(null);
    setShowModalType(ShowModalType.na);
    setPlayerSrc(null);
  }

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

  const [playerSrc, setPlayerSrc] = useState<string>(null);

  function handleAddAudioToQueue(urls: string[]) {
    setAudioQueue((prevQueue) => [...prevQueue, ...urls]);
  }

  return (
    <KeyboardContext.Provider value={value}>
      {children}

      {/* player for audio messages */}
      {playerSrc && (
        <AudioPlayer
          autoPlay
          src={playerSrc}
          onPlay={(e) => console.log("onPlay")}
          showSkipControls={true}
          onEnded={onEndedPlaying}
          className="w-screen flex flex-row"
        />
      )}
    </KeyboardContext.Provider>
  );
}

export function useKeyboardContext() {
  return useContext(KeyboardContext);
}
