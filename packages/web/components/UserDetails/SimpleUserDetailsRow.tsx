import { Avatar } from "antd";
import { FaPaperPlane, FaRegTimesCircle } from "react-icons/fa";
import User from "@nirvana/common/models/user";

export default function SelectedUserRow(props: { user: User }) {
  console.log(props);
  return (
    <>
      <span className="flex flex-row items-center py-1 border-t">
        <Avatar shape="square" size={"small"}>
          A
        </Avatar>

        <span className="flex flex-col ml-2">
          <span className="text-slate-400 text-xs">
            {"ariel@microsoft.com"}
          </span>
          <span className="text-orange-500 text-xs">
            Not a valid Nirvana user.
          </span>
        </span>

        <button className="p-2 rounded-full hover:cursor-pointer text-sky-500 ml-auto">
          <FaPaperPlane className="ml-auto text-lg" />
        </button>
      </span>
      <span className="flex flex-row items-center py-1 border-t">
        <Avatar
          src={"https://joeschmoe.io/api/v1/random"}
          shape="square"
          size={"small"}
        />

        <span className="flex flex-col ml-2">
          <span className="text-teal-500 font-bold">{"Joe Smoe"}</span>
          <span className="text-slate-400 text-xs">{"joe@microsoft.com"}</span>
        </span>

        <button className="p-2 rounded-full hover:cursor-pointer text-orange-500 ml-auto">
          <FaRegTimesCircle className="ml-auto text-lg" />
        </button>
      </span>
      <span className="flex flex-row items-center py-1 border-t">
        <Avatar
          src={"https://joeschmoe.io/api/v1/2"}
          shape="square"
          size={"small"}
        />

        <span className="flex flex-col ml-2">
          <span className="text-teal-500 font-bold">{"Elon Musk"}</span>
          <span className="text-slate-400 text-xs">{"musk@tesla.com"}</span>
        </span>

        <button className="p-2 rounded-full hover:cursor-pointer text-orange-500 ml-auto">
          <FaRegTimesCircle className="ml-auto text-lg" />
        </button>
      </span>
    </>
  );
}
