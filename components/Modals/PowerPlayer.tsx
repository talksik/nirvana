import { Avatar, Modal, Tooltip } from "antd";
import { Message } from "../../models/message";
import { FaBackward } from "react-icons/fa";
import { useTeamDashboardContext } from "../../contexts/teamDashboardContext";
import { useAuth } from "../../contexts/authContext";
import { useKeyboardContext } from "../../contexts/keyboardContext";
import moment from "moment";

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
    // const indexOfMessage = 5;

    // var startPlay = indexOfMessage - messageRangeHalfToPlay;
    // if (startPlay < 0) {
    //   startPlay = 0;
    // }

    // var endPlay = indexOfMessage + messageRangeHalfToPlay;
    // if (endPlay > allMessages.length) {
    //   endPlay = allMessages.length;
    // }

    // // loop through start to end and add to queue
    // var convoChunk: string[] = []

    handleAddAudioToQueue([url]);
  }

  function handleClose(e) {
    props.handleCloseModal();
  }

  return (
    <Modal
      title="Power Playback "
      visible={props.show}
      onCancel={handleClose}
      footer={
        <button
          onClick={handleClose}
          className="ml-auto text-sm text-orange-500 font-semibold py-1 px-4 bg-gray-200 rounded"
        >
          👋 Close
        </button>
      }
    >
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
            const relativeDateTime: string = moment(
              msg.createdDate.toDate()
            ).fromNow();

            if (msg.senderUserId == currUser.uid) {
              // if I am the sender
              const receiverUser = teamUsersMap[msg.receiverUserId];

              if (!receiverUser) {
                return;
              }

              return (
                <Tooltip
                  title={
                    "you -> " + receiverUser.nickName + ": " + relativeDateTime
                  }
                >
                  <span
                    key={i}
                    onClick={() => handlePlayAudio(msg.audioDataUrl)}
                    className="border-r-2 border-r-sky-400 translate-y-10 min-w-max hover:cursor-pointer border-t-2 border-t-black"
                  >
                    <Avatar.Group className="translate-x-8 pl-2 translate-y-10">
                      <Avatar src={receiverUser.avatarUrl} />
                      {/* <Avatar src={currUser.photoURL} /> */}
                      <div className="rounded-full w-8 h-8 -translate-x-2 bg-teal-500"></div>
                    </Avatar.Group>
                  </span>
                </Tooltip>
              );
            }

            const sender = teamUsersMap[msg.senderUserId];

            // incoming messages
            return (
              <span
                key={i}
                onClick={() => handlePlayAudio(msg.audioDataUrl)}
                className="border-r-2 border-r-orange-400 min-w-max hover:cursor-pointer border-b-2 border-b-black"
              >
                <Tooltip title={sender?.firstName + ": " + relativeDateTime}>
                  <img
                    src={sender ? sender?.avatarUrl : "K"}
                    alt="K"
                    className="rounded-full w-10 h-10 translate-x-2/4 -translate-y-2/4"
                  />
                </Tooltip>
              </span>
            );
          })}
        </div>

        {/* middle line */}
        {/* <div className="border border-b-2 border-b-black flex-1 w-full"></div> */}
      </div>
    </Modal>
  );
}
