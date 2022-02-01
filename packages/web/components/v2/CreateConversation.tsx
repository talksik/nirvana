import { Select, Tag } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useEffect, useRef } from "react";
import { FaPaperPlane, FaRegTimesCircle } from "react-icons/fa";

const options = [
  { value: "gold" },
  { value: "lime" },
  { value: "green" },
  { value: "cyan" },
];

export default function CreateConversation() {
  const input = useRef<HTMLInputElement>();

  useEffect(() => {
    input.current?.focus();
  }, []);

  // as people are selected, add a list of users
  // if it's an email of a non-nirvana user, then hit invite button to email them with a voice clip along with it
  // if it's an existing user, then show a nice chip of that user's profile picture and their name

  return (
    <div className="mx-auto my-auto w-96 flex flex-col">
      <Select
        placeholder={"Look up emails, names, etc."}
        tagRender={tagRender}
        style={{ width: "100%" }}
        options={options}
        size="large"
        mode="multiple"
        allowClear
        // defaultValue={['a10', 'c12']}
        ref={input}
      />

      <span className="flex flex-row items-center mt-10 mb-2">
        <span className="uppercase tracking-widest text-slate-400 font-semibold">
          Selected
        </span>
        <button className="ml-auto text-slate-400">clear</button>
      </span>

      {/* list of selected people who are nirvana users */}

      <span className="flex flex-col">
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
            <span className="text-slate-400 text-xs">
              {"joe@microsoft.com"}
            </span>
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
      </span>

      <span className="flex flex-col mt-10">
        <span className="uppercase tracking-widest text-slate-400 font-semibold">
          Name
        </span>
        <span className="text-slate-300 text-xs">
          Name this conversation: engineering, hangout, lunch time, or leave it
          as is.
        </span>

        <input
          className="p-3 rounded mt-2 bg-slate-50 border"
          placeholder="engineering, hangout, kitchen..."
        />
      </span>

      <button
        className="rounded p-2 border flex flex-row items-center space-x-2
            text-white font-semibold text-xs ml-auto mt-5 bg-teal-600 hover:scale-110 transition-all"
      >
        <span>Create</span>
      </button>

      {/* if it's a one on one, and i already have a conversation with them, then block creating a new one? */}
    </div>
  );
}

function tagRender(props) {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
}
