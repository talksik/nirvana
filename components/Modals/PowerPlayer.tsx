import { Modal, Tooltip } from "antd";
import { Message } from "../../models/message";
import { FaBackward } from "react-icons/fa";
import { useTeamDashboardContext } from "../../contexts/teamDashboardContext";
import { useAuth } from "../../contexts/authContext";
import { useKeyboardContext } from "../../contexts/keyboardContext";

export default function PowerPlayer(props: {
  show: boolean;
  handleCloseModal: Function;
}) {
  const { currUser } = useAuth();
  const { allMessages, teamUsersMap } = useTeamDashboardContext();
  const { handleAddAudioToQueue } = useKeyboardContext();
  // two arrays:
  // 1. all of my messages in order date desc => top
  // const sentMessages = allMessages.filter(msg => msg.senderUserId == currUser.uid)

  // // 2. all of incoming messages in order date desc => bottom
  // const receivedMessages = allMessages.filter(msg => msg.receiverUserId == currUser.uid)

  const messageRangeHalfToPlay = 2;
  function handlePlayAudio(url: string) {
    // todo play like 2 indexes lower to 2 indexes higher instead of
    const indexOfMessage = 5;

    var startPlay = indexOfMessage - messageRangeHalfToPlay;
    if (startPlay < 0) {
      startPlay = 0;
    }

    var endPlay = indexOfMessage + messageRangeHalfToPlay;
    if (endPlay > allMessages.length) {
      endPlay = allMessages.length;
    }

    // loop through start to end and add to queue

    console.log(url);

    handleAddAudioToQueue([url]);
  }

  return (
    <Modal title="Power Playback " visible={props.show}>
      <span className="flex flex-col items-start">
        <span>One timeline to listen to the past 24 hours.</span>

        <span className="text-sm text-gray-400">
          The bottom are your messages. The top are incoming messages. Click on
          the bubbles to listen to conversations during that period.
        </span>
      </span>

      <div className="flex flex-col py-20 overflow-x-scroll">
        {/* top incoming messages */}
        <div className="flex flex-row">
          {allMessages.map((msg, i) => {
            if (msg.senderUserId == currUser.uid) {
              return (
                <span
                  key={i}
                  onClick={() => handlePlayAudio(msg.audioDataUrl)}
                  className="border-r-2 border-r-sky-400 translate-y-10 min-w-max hover:cursor-pointer"
                >
                  <Tooltip title={"you: 22 minutes ago"}>
                    <div className="rounded-full w-5 h-5 translate-x-2/4 translate-y-full bg-teal-500"></div>
                  </Tooltip>
                </span>
              );
            }

            const sender = teamUsersMap[msg.senderUserId];

            // incoming messages
            return (
              <span
                key={i}
                onClick={() => handlePlayAudio(msg.audioDataUrl)}
                className="border-r-2 border-r-orange-400 min-w-max hover:cursor-pointer"
              >
                <Tooltip title={sender.firstName + ": " + "2 minutes ago"}>
                  <img
                    src={sender ? sender.avatarUrl : "K"}
                    alt="K"
                    className="rounded-full w-10 h-10 translate-x-2/4 -translate-y-2/4"
                  />
                </Tooltip>
              </span>
            );
          })}
        </div>

        {/* middle line */}
        <div className="border border-b-2 border-b-black flex-1 w-full"></div>
      </div>
    </Modal>
  );
}
