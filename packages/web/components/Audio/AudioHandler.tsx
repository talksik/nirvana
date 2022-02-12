import { useEffect, useState } from "react";
import { configure, GlobalHotKeys, KeyMap } from "react-hotkeys";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allRelevantConversationsAtom,
  audioQueueAtom,
  hasMicPermissionsAtom,
  isRecordingAtom,
  priorityConvosSelector,
  selectedConvoAtom,
} from "../../recoil/main";
import MicRecorder from "mic-recorder-to-mp3";
import AudioPlayer from "react-h5-audio-player";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { conversationService } from "@nirvana/common/services";
import { useAuth } from "../../contexts/authContext";
import { useRouter } from "next/router";
import { AudioClip } from "@nirvana/common/models/conversation";
import "react-h5-audio-player/lib/styles.css";

// New instance
const recorder = new MicRecorder({
  bitRate: 128,
});

const MAX_SHORTCUT_MAPPINGS_PRIORITY = 8;

export default function AudioHandler() {
  const { currUser } = useAuth();
  const router = useRouter();

  const { convoId } = router.query;

  const priorityConvos = useRecoilValue(priorityConvosSelector);
  const mapAllConvos = useRecoilValue(allRelevantConversationsAtom);

  const [mapShortcutsToConvoId, setmapShortcutsToConvoId] = useState<
    Map<string, string>
  >(new Map<string, string>());

  const [selectedConvoId, setSelectedConversationId] =
    useRecoilState(selectedConvoAtom);

  const [audioQueue, setAudioQueue] = useRecoilState(audioQueueAtom);

  function onEndedPlaying(e) {
    // remove from queue and the queue manager will handle the rest
    setAudioQueue((prevQueue) => {
      const newQueue: AudioClip[] = [...prevQueue];
      newQueue.shift();
      return newQueue;
    });
  }

  useEffect(() => {
    if (audioQueue.length > 0 && audioQueue[0].audioDataUrl) {
      console.log("Adding clip to Queue");

      // edge case, if it's the same link again, then still play it somehow
      if (playerSrc == audioQueue[0].audioDataUrl) {
        // play empty one and then add the next audio file
        setPlayerSrc("");

        setTimeout(() => {
          setPlayerSrc(audioQueue[0].audioDataUrl || null);
        }, 1000);
      } else {
        setPlayerSrc(audioQueue[0].audioDataUrl);
      }
    }

    if (!audioQueue || audioQueue.length == 0) {
      console.log("clearing player");
      setPlayerSrc(null);
    }
  }, [audioQueue]);

  const [hasMicPermissions, sethasMicPermissions] = useRecoilState(
    hasMicPermissionsAtom
  );

  useEffect(() => {
    try {
      // checking for permissions for recording
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

  // configure({
  //   ignoreTags: ["input", "select", "textarea"],
  // });

  const [recordingToastId, setRecordingToastId] = useState<string>("");
  const [isRecording, setIsRecording] = useRecoilState(isRecordingAtom);

  const [playerSrc, setPlayerSrc] = useState<string | null>(null);

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

    const toastId = toast.loading("recording");
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
    if (audioQueue.length > 0) {
      setAudioQueue([]);
      return;
    }

    if (!selectedConvoId) {
      toast.error("select a conversation before playing");
      return;
    }

    const currConvo = mapAllConvos.get(selectedConvoId);

    if (!currConvo?.cachedAudioClip) {
      toast.error("nothing to play");
      return;
    }

    setAudioQueue((prevQueue) => {
      return [...prevQueue, currConvo.cachedAudioClip!];
    });
  };

  const selectingPriorityConvoHandler = (event) => {
    const key = event.key;

    // STOP if we are in a convo detail page, as we want to talk in this channel, if so
    if (convoId) {
      toast.error("Cannot select a priority convo from here!");
      return;
    }

    // select the convo based on the shortcut

    if (!mapShortcutsToConvoId.has(key)) {
      toast.error("Not a valid conversation selected");
      return;
    }

    const selectedConvoId = mapShortcutsToConvoId.get(key);

    if (selectedConvoId) {
      setSelectedConversationId(selectedConvoId);
    }
  };

  const keyMap: KeyMap = {
    SELECT_PRIORITY_CONVO: ["1", "2", "3", "4", "5", "6", "7", "8"], // todo dynamically map
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
    <>
      {playerSrc && (
        <AudioPlayer
          autoPlay
          src={playerSrc}
          onPlay={(e) => console.log("onPlay")}
          showSkipControls={true}
          onEnded={onEndedPlaying}
          className="w-screen flex flex-row fixed bottom-0"
        />
      )}

      <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges={true} />
    </>
  );
}
