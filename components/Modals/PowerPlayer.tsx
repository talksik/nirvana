import { Modal, Tooltip } from "antd";
import { Message } from "../../models/message";
import { FaBackward } from "react-icons/fa";

export default function PowerPlayer(props: { messages: Message[] }) {
  // two arrays:
  // 1. all of my messages in order date desc => top
  // 2. all of incoming messages in order date desc => bottom

  return (
    <Modal title="Basic Modal" visible={false}>
      <div className="flex flex-col p-10 overflow-x-scroll">
        {/* top incoming messages */}
        <div className="flex flex-row">
          <span className="border-r-2 border-r-orange-400 h-10 pl-1">
            <Tooltip title={"Heran: 2 minutes ago"}>
              <img
                src="https://lh3.googleusercontent.com/a-/AOh14GhTB6LbOqohOA3csckho3OA976yp3lMEtl2MDzbgX0=s96-c"
                alt="asdf"
                className="rounded-full w-10 translate-x-2/4 -translate-y-2/4"
              />
            </Tooltip>
          </span>

          <span className="border-r-2 border-r-orange-400 h-10 pl-2">
            <Tooltip title={"Heran: 5 minutes ago"}>
              <img
                src="https://lh3.googleusercontent.com/a-/AOh14GhTB6LbOqohOA3csckho3OA976yp3lMEtl2MDzbgX0=s96-c"
                alt="asdf"
                className="rounded-full w-10 translate-x-2/4 -translate-y-2/4"
              />
            </Tooltip>
          </span>

          <span className="border-r-2 border-r-orange-400 h-10 pl-10">
            <Tooltip title={"Kam: 2 hours ago"}>
              <img
                src="https://lh3.googleusercontent.com/a/AATXAJzgek1jh-qtptTj_VT_9QkCWlv9r02riUptU0Hk=s96-c"
                alt="asdf"
                className="rounded-full w-10 translate-x-2/4 -translate-y-2/4"
              />
            </Tooltip>
          </span>
        </div>

        {/* middle line */}
        <div className="border border-b-2 border-b-black flex-1"></div>

        {/* bottom outgoing messages */}
        <div className="flex flex-row">
          <span className="border-r-2 border-r-orange-4 h-5 pl-5">
            <Tooltip title={"you: 22 minutes ago"}>
              <div className="rounded-full  w-5 h-5 translate-x-2/4 translate-y-2/4 bg-teal-500"></div>
            </Tooltip>
          </span>

          <span className="border-r-2 border-r-orange-4 h-5 pl-0">
            <Tooltip title={"you: 22 minutes ago"}>
              <div className="rounded-full  w-5 h-5 translate-x-2/4 translate-y-2/4 bg-teal-500"></div>
            </Tooltip>
          </span>

          <span className="border-r-2 border-r-orange-4 h-5 pl-5">
            <Tooltip title={"you: 22 minutes ago"}>
              <div className="rounded-full  w-5 h-5 translate-x-2/4 translate-y-2/4 bg-teal-500"></div>
            </Tooltip>
          </span>
        </div>
      </div>
    </Modal>
  );
}
