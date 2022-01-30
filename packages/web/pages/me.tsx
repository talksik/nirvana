import { Avatar, Divider, Dropdown, Menu, Switch } from "antd";
import { useRouter } from "next/router";
import { useRef } from "react";
import { GlobalHotKeys, KeyMap } from "react-hotkeys";
import {
  FaCheck,
  FaHeadphones,
  FaImages,
  FaLayerGroup,
  FaMicrophoneAlt,
  FaMoon,
  FaPlus,
  FaRegClock,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import MainLogo from "../components/MainLogo";
import UserStatusBubble from "../components/UserStatusBubble";
import { UserStatus } from "../models/user";

export default function Me() {
  return (
    <div className="flex flex-col">
      <Header />

      <div className="flex-1 flex flex-row items-baseline">
        <Sidebar />
      </div>
    </div>
  );
}

function Header() {
  const router = useRouter();

  const UserMenu = (
    <Menu title="user menu">
      <Menu.Item
        key={2}
        onClick={() => router.push("/teams/profile")}
        icon={<FaUser />}
      >
        <button>Profile</button>
      </Menu.Item>

      <Menu.Item
        onClick={() => window.open("/teams", "_self")}
        key={"team hub"}
        icon={<FaLayerGroup />}
      >
        <button>Team Hub</button>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item danger key={3} onClick={() => console.log("sign out")}>
        <button>Sign Out</button>
      </Menu.Item>
    </Menu>
  );

  const inputRef = useRef<HTMLInputElement>();
  const selectSearch = () => {
    inputRef.current.focus();
  };

  const keyMap: KeyMap = {
    SELECT_SEARCH: {
      name: "select search to start searching",
      sequence: "/",
      action: "keyup",
    },
  };
  const handlers = {
    SELECT_SEARCH: selectSearch,
  };

  return (
    <div className="flex flex-row justify-start items-center py-5 px-10">
      <GlobalHotKeys handlers={handlers} keyMap={keyMap} />

      <MainLogo className="text-3xl" />

      {/* search bar */}
      <div className="mx-auto flex flex-row items-center space-x-2">
        <FaSearch className="text-lg text-slate-300" />
        <input
          placeholder="Type / to search"
          className="bg-transparent placeholder-slate-300"
          ref={inputRef}
        />
      </div>

      {/* controls */}
      <div className="flex flex-row items-center space-x-5 px-5">
        <FaHeadphones className="text-xl text-teal-600 hover:cursor-pointer hover:scale-110 trasition-all animate-pulse" />
        <FaMicrophoneAlt className="text-xl text-teal-600 hover:cursor-pointer hover:scale-110 trasition-all animate-pulse" />
      </div>

      {/* profile section */}
      <Dropdown
        overlay={UserMenu}
        trigger={["click"]}
        className="ml-2 shrink-0"
      >
        <span className="relative flex hover:cursor-pointer">
          <span className="bg-gray-200 bg-opacity-30 rounded-full shadow-md absolute w-full h-full"></span>
          <UserStatusBubble status={UserStatus.online} />
          <Avatar
            src={"https://avatars.githubusercontent.com/u/19339529?s=40&v=4"}
            size={"large"}
          />
        </span>
      </Dropdown>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="flex flex-col justify-start items-start min-w-[20rem]">
      {/* new button */}
      <button className="rounded-full flex flex-row items-center px-5 py-2 ml-8 shadow-lg bg-white space-x-2">
        <FaPlus className="text-teal-600 text-lg" />
        <span className="text-slate-500 font-semibold">New</span>
      </button>

      {/* navigation items */}
      <div className="flex flex-col my-5 space-y-5 w-full">
        <span className="flex flex-row items-center hover:cursor-pointer transition-all">
          <span className="w-5 h-5 -translate-x-4 rounded bg-teal-600"></span>
          <FaLayerGroup className="ml-8 mr-2 text-teal-600 text-lg" />
          <span className="text-md text-slate-500 font-semibold">Convos</span>
        </span>

        <span className="flex flex-row items-center hover:cursor-pointer transition-all">
          <span className="w-5 h-5 -translate-x-4 rounded bg-teal-600 bg-transparent"></span>
          <FaRegClock className="ml-8 mr-2 text-slate-400 text-lg" />
          <span className="text-md text-slate-400 font-semibold">Snooze</span>
        </span>

        <span className="flex flex-row items-center hover:cursor-pointer transition-all">
          <span className="w-5 h-5 -translate-x-4 rounded bg-teal-600 bg-transparent"></span>
          <FaCheck className="ml-8 mr-2 text-slate-400 text-lg" />
          <span className="text-md text-slate-400 font-semibold">Done</span>
        </span>

        <Divider />

        <span className="flex flex-row items-center hover:cursor-pointer transition-all">
          <span className="w-5 h-5 -translate-x-4 rounded bg-teal-600 bg-transparent"></span>
          <FaImages className="ml-8 mr-2 text-slate-400 text-lg" />
          <span className="text-md text-slate-400 font-semibold">Drawer</span>
        </span>
      </div>

      {/* Live Rooms */}
      <div className="px-5 mt-10">
        {/* section title */}
        <span className="text-md tracking-widest font-semibold text-slate-400 uppercase">
          Live
        </span>
      </div>
    </div>
  );
}
