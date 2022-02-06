import { useEffect, useState } from "react";
import { configure, GlobalHotKeys, KeyMap } from "react-hotkeys";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  hasMicPermissionsAtom,
  isRecordingAtom,
  priorityConvosSelector,
  selectedPriorityConvoAtom,
} from "../../recoil/main";
import MicRecorder from "mic-recorder-to-mp3";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { conversationService } from "@nirvana/common/services";
import { useAuth } from "../../contexts/authContext";

// New instance
const recorder = new MicRecorder({
  bitRate: 128,
});

const MAX_SHORTCUT_MAPPINGS_PRIORITY = 8;

export default function AudioHandler() {
  const { currUser } = useAuth();

  const priorityConvos = useRecoilValue(priorityConvosSelector);
  const [mapShortcutsToConvoId, setmapShortcutsToConvoId] = useState<
    Map<string, string>
  >(new Map<string, string>());

  const [selectedConvoId, setSelectedConversationId] = useRecoilState(
    selectedPriorityConvoAtom
  );

  const [hasMicPermissions, sethasMicPermissions] = useRecoilState(
    hasMicPermissionsAtom
  );

  // set keyboard shortcuts for 1->8, but only if this component is shown, and not in stuff like
  // convo view
  useEffect(() => {
    // reset entire map of shortcuts now with new list of priority convos

    const newMap = new Map<string, string>();

    priorityConvos.map((convo, i) => {
      if (i < MAX_SHORTCUT_MAPPINGS_PRIORITY) {
        const shortcut = (i + 1).toString();
        newMap.set(shortcut, convo.id);
      }
    });
    setmapShortcutsToConvoId(newMap);
  }, [priorityConvos]);

  const selectingPriorityConvoHandler = (event) => {
    const key = event.key;

    // select the convo based on the right convo

    if (!mapShortcutsToConvoId.has(key)) {
      toast.error("Not a valid conversation selected");
      return;
    }

    const selectedConvoId = mapShortcutsToConvoId.get(key);

    if (selectedConvoId) {
      setSelectedConversationId(selectedConvoId);
    }
  };

  // set keyboard shortcuts for 1->8, but only if this component is shown, and not in stuff like
  // convo view
  useEffect(() => {
    // reset entire map of shortcuts now with new list of priority convos

    const newMap = new Map<string, string>();

    priorityConvos.map((convo, i) => {
      if (i < MAX_SHORTCUT_MAPPINGS_PRIORITY) {
        const shortcut = (i + 1).toString();
        newMap.set(shortcut, convo.id);
      }
    });
    setmapShortcutsToConvoId(newMap);
  }, [priorityConvos]);

  // checking for permissions for recording
  useEffect(() => {
    try {
      // won't work in https!!!
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          // stop playing anything
          // stopBothVideoAndAudio(stream);

          console.log("Permission Granted");
          sethasMicPermissions(true);
        })
        .catch((e) => {
          console.log("Permission Denied");
          toast.error(
            "Please make sure that you have connected a microphone and given permissions."
          );
          sethasMicPermissions(false);
        });
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }, []);

  configure({
    ignoreTags: ["input", "select", "textarea"],
  });

  const [recordingToastId, setRecordingToastId] = useState<string>("");
  const [isRecording, setIsRecording] = useRecoilState(isRecordingAtom);

  const startRecording = () => {
    // check if there is a person selected
    if (!selectedConvoId) {
      toast.error("You must select a person first!");
      return;
    }

    // check that we have mic permissions
    if (!hasMicPermissions) {
      toast.error(
        "Please make sure that you have connected a microphone and given permissions."
      );

      return;
    }

    // check that we are not in flow state

    // start recording
    recorder
      .start()
      .then(() => {
        // toast.success("started recording");
        console.log("recording started");

        setIsRecording(true);
      })
      .catch((e) =>
        toast.error("there was a problem in starting your recording")
      );

    const toastId = toast.loading("speaking to Patels");
    setRecordingToastId(toastId);
  };

  const stopRecording = () => {
    console.log("stop recording");
    toast.remove(recordingToastId);

    if (!isRecording) {
      return;
    }

    setIsRecording(false);

    if (!selectedConvoId) {
      toast.error("problem in sending clip");
      return;
    }

    recorder
      .stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);

        const file = new File(buffer, uuidv4() + ".mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });

        const player = new Audio(URL.createObjectURL(file));
        // player.onended = onEndedPlaying;
        player.play();

        // send to service which handles the upload to blob and also the conversation database
        await conversationService.sendAudioClip(
          currUser!.uid,
          file,
          selectedConvoId
        );

        console.log("successfully sent audio clip");
        toast.success("successfully sent audio clip");
      })
      .catch((error) => {
        console.log(error);
        toast.error("problem in sending audio clip");
      });
  };

  const playLastClip = () => {
    if (!selectedConvoId) {
      toast.error("select a conversation before playing");
      return;
    }

    const currConvo = priorityConvos.find(
      (convo) => convo.id == selectedConvoId
    );

    if (!currConvo?.cachedAudioClip) {
      toast.error("nothing to play");
      return;
    }

    const audio = new Audio(currConvo?.cachedAudioClip.audioDataUrl);
    audio.play();
  };

  const keyMap: KeyMap = {
    SELECT_PRIORITY_CONVO: ["1", "2", "3", "4", "5", "6", "7", "8"],
    START_RECORDING: {
      name: "START RECORDING",
      sequence: "r",
      action: "keydown",
    },
    STOP_RECORDING: {
      name: "STOP RECORDING",
      sequence: "r",
      action: "keyup",
    },
    PLAY_LAST_CLIP: "space",
  };

  const handlers = {
    SELECT_PRIORITY_CONVO: selectingPriorityConvoHandler,
    START_RECORDING: startRecording,
    STOP_RECORDING: stopRecording,
    PLAY_LAST_CLIP: playLastClip,
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges={true} />
  );
}
