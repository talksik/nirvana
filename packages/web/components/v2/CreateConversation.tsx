import { Select, Tag } from "antd";
import { useEffect, useRef } from "react";

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

      {/* list of existing conversations with these people */}
      <span className="flex flex-col">
        <span className="flex flex-row items-center p-5">
          <span>Engineering</span>
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
