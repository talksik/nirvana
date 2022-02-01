import { User, UserStatus } from "@nirvana/common/models/user";
import { Select, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import SimpleUserDetailsRow from "../UserDetails/SimpleUserDetailsRow";

export default function CreateConversation() {
  const input = useRef<HTMLInputElement>();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([] as User[]);

  // recommendations list: algolio results + cached "relevant users" from all cached conversations currently
  // options for the select
  // have a list of 10 max?
  const [recommendedUsers, setRecommendedUsers] = useState<User[]>(
    [] as User[]
  );

  const options = recommendedUsers.map((recUser) => {
    value: recUser.firstName + " " + recUser.lastName;
  });

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

        <button className="ml-auto text-slate-300 text-xs">clear</button>
      </span>

      {/* list of selected people who are nirvana users */}

      <span className="flex flex-col">
        <SimpleUserDetailsRow
          user={
            new User(
              undefined,
              "johnny.Smith@microsoft.com",
              "Johnny",
              "Smith",
              "https://joeschmoe.io/api/v1/random",
              UserStatus.online
            )
          }
        />
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
          className="p-3 rounded mt-2 bg-slate-50 border placeholder-slate-300"
          placeholder="coding and chilling room, birthdays, sprint 7"
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
