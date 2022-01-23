import {
  ClientConfig,
  IAgoraRTC,
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";
import { Tooltip } from "antd";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/authContext";
import { useTeamDashboardContext } from "../../contexts/teamDashboardContext";
import OfficeRoom from "../../models/officeRoom";
import { appId } from "../../services/agoraService";
import { Collections } from "../../services/collections";
import OfficeRoomService from "../../services/officeRoomService";
import OfficeCard from "../OfficeCard";

const db = getFirestore();

const officeRoomService = new OfficeRoomService();

const config: ClientConfig = {
  mode: "rtc",
  codec: "vp8",
};

export default function Office() {
  const { currUser } = useAuth();
  const { team } = useTeamDashboardContext();
  const [agoraRtc, setAgoraRtc] = useState<IAgoraRTC>(null);
  const [agoraRtcClient, setAgoraRtcClient] = useState<IAgoraRTCClient>(null);
  const [localAudioTrack, setLocalAudioTrack] =
    useState<IMicrophoneAudioTrack>(null);

  const [officeRoomsMap, setOfficeRoomsMap] = useState<Map<string, OfficeRoom>>(
    new Map<string, OfficeRoom>()
  );

  // get all offices for this team : realtime
  useEffect(() => {
    /**
     * QUERY:
     * all offices for this team
     *
     */
    const q = query(
      collection(db, Collections.officeRooms),
      where("teamId", "==", team.id)
    );

    // return unsubscribe
    return onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        // seed data and create the initial rooms
        console.log("seeding office rooms for this team");
        officeRoomService.createInitialOfficeRooms(currUser.uid, team.id);
        return;
      }

      snapshot.docChanges().forEach((change) => {
        let updatedOfficeRoom = change.doc.data() as OfficeRoom;
        updatedOfficeRoom.id = change.doc.id;

        if (change.type === "added" || change.type === "modified") {
          // update office rooms map on change of the room
          setOfficeRoomsMap((prevMap) => {
            return new Map(
              prevMap.set(updatedOfficeRoom.id, updatedOfficeRoom)
            );
          });
        }
        if (change.type === "removed") {
          console.log("Removed office room: ", updatedOfficeRoom);
        }
      });
    });
  }, []);

  // set up agora stuff
  useEffect(() => {
    (async function () {
      // dynamic import as the server side import doesn't work
      const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
      const agoraClient = AgoraRTC.createClient(config);

      setAgoraRtcClient(agoraClient);
      setAgoraRtc(AgoraRTC);
    })();
  }, []);

  async function handleJoinChannel(channelName: string, agoraToken: string) {
    const localTrack: IMicrophoneAudioTrack =
      await agoraRtc.createMicrophoneAudioTrack();

    setLocalAudioTrack(localTrack);

    let init = async (chanName: string) => {
      agoraRtcClient.on("user-published", async (user, mediaType) => {
        await agoraRtcClient.subscribe(user, mediaType);
        console.log("subscribe success");

        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      agoraRtcClient.on("user-unpublished", async (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }

        await agoraRtcClient.unsubscribe(user);
      });

      agoraRtcClient.on("user-left", (user) => {
        console.log("user left", user);
      });

      await agoraRtcClient.join(appId, chanName, agoraToken, null);
      if (localTrack) await agoraRtcClient.publish(localTrack);
    };

    if (localTrack) {
      console.log("init ready");
      init(channelName);
    } else {
      toast.error("Not ready for joining call");
      return;
    }
  }

  async function handleLeaveChannel() {
    // destroy local track
    localAudioTrack?.close();

    // leave all channels
    await agoraRtcClient.leave();
  }

  const allOfficeRooms = Array.from(officeRoomsMap.values());

  allOfficeRooms.sort((a, b) => {
    if (a.name < b.name) {
      return 1;
    }

    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  // if there are none, then show user button to create initial office rooms and then create them

  return (
    <section className="p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md w-96 shrink-0 flex-1 overflow-auto">
      <Tooltip
        title={
          "Tell teammates above to chat in the 'kitchen' or other places in the office."
        }
      >
        <span className="flex flex-row justify-start items-center pb-5">
          <span className="flex flex-col">
            <span className="text-white uppercase">Office</span>
          </span>
        </span>
      </Tooltip>

      {/* all office rooms  */}
      <span className="flex flex-col overflow-auto pr-2 space-y-2">
        {allOfficeRooms.map((officeRoom) => (
          <OfficeCard
            key={officeRoom.id}
            officeRoom={officeRoom}
            handleJoinChannel={handleJoinChannel}
            handleLeaveChannel={handleLeaveChannel}
          />
        ))}
        {/* <OfficeCard /> */}
      </span>
    </section>
  );
}
