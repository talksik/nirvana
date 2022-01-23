import {
  ClientConfig,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
  createMicrophoneAudioTrack,
} from "agora-rtc-react";

const config: ClientConfig = {
  mode: "rtc",
  codec: "vp8",
};
const useClient = createClient(config);
const useMicrophoneTracks = createMicrophoneAudioTrack();

// TODO: move this to env file
const appId: string = "c8dfd65deb5c4741bd564085627139d0"; //ENTER APP ID HERE
