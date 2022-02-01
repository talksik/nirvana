import { Select, Tag } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useEffect, useRef } from "react";
import { FaRegTimesCircle } from "react-icons/fa";

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
    <div className="mx-auto my-auto w-96">
      <Select
        placeholder={"Look up email addresses, names, etc."}
        tagRender={tagRender}
        style={{ width: "100%" }}
        options={options}
        size="large"
        mode="multiple"
        allowClear
        // defaultValue={['a10', 'c12']}
        ref={input}
      />

      {/* list of selected people who are nirvana users */}
      <span className="flex flex-row flex-wrap mt-10">
        <span className="flex flex-row items-center py-1 px-3 space-x-2 bg-sky-200 rounded-full">
          <Avatar
            src={"https://joeschmoe.io/api/v1/random"}
            shape="square"
            size={"small"}
          />

          <span className="text-sky-500 font-bold">{"Joe Smoe"}</span>

          <button className="p-2 rounded-full hover:cursor-pointer text-sky-300">
            <FaRegTimesCircle className="ml-auto text-lg" />
          </button>
        </span>
      </span>
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
