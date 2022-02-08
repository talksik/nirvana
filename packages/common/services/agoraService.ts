import AgoraRTC, {
  ClientConfig,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";
// import {
//   AgoraVideoPlayer,
//   createClient,
//   createMicrophoneAndCameraTracks,
//   createMicrophoneAudioTrack,
// } from "agora-rtc-react";
import { getFunctions, httpsCallable } from "firebase/functions";
import toast from "react-hot-toast";

export const config: ClientConfig = {
  mode: "rtc",
  codec: "vp8",
};

// const useClient = createClient(config);
// const useMicrophoneTracks = createMicrophoneAudioTrack();

// TODO: move this to env file
export const appId: string = "c8dfd65deb5c4741bd564085627139d0"; //ENTER APP ID HERE

export default class AgoraService {
  private functions = getFunctions();
  // private rtcClient = useClient();

  async getAgoraToken(channelName: string): Promise<string> {
    const cfResult = httpsCallable(this.functions, "agoraToken");

    return await cfResult({ channelName })
      .then((result: { data: { token: string } }) => {
        const data = result.data;

        if (!data.token) {
          throw new Error("No token retrieved from agora");
        }

        return data.token;
      })
      .catch((error) => {
        // Getting the Error details.
        const code = error.code;
        const message = error.message;
        const details = error.details;
        throw error;
      });
  }

  // async handleJoinChannel(channelName: string, agoraToken: string) {
  //   const localTrack: IMicrophoneAudioTrack =
  //     await AgoraRTC.createMicrophoneAudioTrack();

  //   let init = async (name: string) => {
  //     this.rtcClient.on("user-published", async (user, mediaType) => {
  //       await this.rtcClient.subscribe(user, mediaType);
  //       console.log("subscribe success");

  //       if (mediaType === "audio") {
  //         user.audioTrack?.play();
  //       }
  //     });

  //     this.rtcClient.on("user-unpublished", async (user, type) => {
  //       console.log("unpublished", user, type);
  //       if (type === "audio") {
  //         user.audioTrack?.stop();
  //       }

  //       await this.rtcClient.unsubscribe(user);
  //     });

  //     this.rtcClient.on("user-left", (user) => {
  //       console.log("user left", user);
  //     });

  //     await this.rtcClient.join(appId, name, agoraToken, null);
  //     if (localTrack) await this.rtcClient.publish(localTrack);
  //   };

  //   if (localTrack) {
  //     console.log("init ready");
  //     init(channelName);
  //   } else {
  //     toast.error("Not ready for joining call");
  //     return;
  //   }
  // }
}
