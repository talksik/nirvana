import {
  Avatar,
  Badge,
  Collapse,
  Divider,
  Dropdown,
  Menu,
  Tooltip,
} from "antd";
import { useRouter } from "next/router";
import { useRef } from "react";
import { GlobalHotKeys, KeyMap } from "react-hotkeys";
import {
  FaAngleDown,
  FaAngleRight,
  FaAtlassian,
  FaCheck,
  FaCheckDouble,
  FaCircle,
  FaCode,
  FaDotCircle,
  FaGithub,
  FaGlobe,
  FaGoogleDrive,
  FaGripHorizontal,
  FaHeadphones,
  FaImage,
  FaImages,
  FaLayerGroup,
  FaMicrophone,
  FaMicrophoneAlt,
  FaPhoneSlash,
  FaPlay,
  FaPlus,
  FaRegArrowAltCircleDown,
  FaRegClock,
  FaRocket,
  FaSearch,
  FaStream,
  FaThumbtack,
  FaUser,
  FaWalking,
} from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import MainLogo from "../components/MainLogo";
import UserStatusBubble from "../components/UserStatusBubble";
import { UserStatus } from "../models/user";

const { Panel } = Collapse;

export default function Me() {
  return (
    <div className="flex flex-col">
      <Header />

      <div className="flex-1 flex flex-row items-baseline">
        <Sidebar />

        <Convos />
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
    <div className="flex flex-row justify-start items-center py-3 px-10 bg-slate-50 border-b mb-10">
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
    <div className="flex flex-col justify-start items-baseline w-[20rem]">
      {/* new button */}
      <button className="rounded-full flex flex-row items-center px-5 py-2 ml-8 shadow-lg bg-white space-x-2">
        <FaPlus className="text-teal-600 text-lg" />
        <span className="text-slate-500 font-semibold">New</span>
      </button>

      {/* navigation items */}
      <div className="flex flex-col my-5 space-y-5 w-full">
        <span className="flex flex-row items-center hover:cursor-pointer transition-all">
          <span className="w-5 h-5 -translate-x-4 rounded bg-teal-600"></span>
          <FaStream className="ml-8 mr-2 text-teal-600 text-lg" />

          <span className="text-md text-slate-500 font-semibold">Todo</span>

          <span className="text-slate-300 text-md ml-auto">4</span>
        </span>

        <span className="flex flex-row items-center hover:cursor-pointer transition-all w-full">
          <span className="w-5 h-5 -translate-x-4 rounded bg-teal-600 bg-transparent"></span>
          <FaRocket className="ml-8 mr-2 text-slate-400 text-lg" />
          <span className="text-md text-slate-400 font-semibold">Priority</span>

          <span className="ml-2 text-emerald-700 bg-emerald-200 bg-opacity-20 p-1 rounded-md text-xs font-semibold flex items-center flex-row space-x-1">
            <HiSpeakerphone />
            <span>new</span>
          </span>

          <span className="text-slate-300 text-md ml-auto">3</span>
        </span>

        <span className="flex flex-row items-center hover:cursor-pointer transition-all">
          <span className="w-5 h-5 -translate-x-4 rounded bg-teal-600 bg-transparent"></span>
          <FaRegClock className="ml-8 mr-2 text-slate-400 text-lg" />
          <span className="text-md text-slate-400 font-semibold">Later</span>

          <span className="text-slate-300 text-md ml-auto">1</span>
        </span>

        <span className="flex flex-row items-center hover:cursor-pointer transition-all">
          <span className="w-5 h-5 -translate-x-4 rounded bg-teal-600 bg-transparent"></span>
          <FaCheck className="ml-8 mr-2 text-slate-400 text-lg" />
          <span className="text-md text-slate-400 font-semibold">Done</span>
        </span>

        <Divider />

        <span className="flex flex-row items-center hover:cursor-pointer transition-all w-full">
          <span className="w-5 h-5 -translate-x-4 rounded bg-teal-600 bg-transparent"></span>
          <FaImages className="ml-8 mr-2 text-slate-400 text-lg" />
          <span className="text-md text-slate-400 font-semibold">Drawer</span>

          <span className="ml-2 text-emerald-700 bg-emerald-200 bg-opacity-20 p-1 rounded-md text-xs font-semibold flex items-center flex-row space-x-1">
            <HiSpeakerphone />
            <span>new</span>
          </span>
        </span>

        <span className="flex flex-row items-center hover:cursor-pointer transition-all w-full">
          <span className="w-5 h-5 -translate-x-4 rounded bg-teal-600 bg-transparent"></span>
          <FaGripHorizontal className="ml-8 mr-2 text-slate-400 text-lg" />
          <span className="text-md text-slate-400 font-semibold">Rooms</span>

          <span className="ml-2 text-emerald-700 bg-emerald-200 bg-opacity-20 p-1 rounded-md text-xs font-semibold flex items-center flex-row space-x-1">
            <HiSpeakerphone />
            <span>new</span>
          </span>
        </span>
      </div>

      {/* Live Rooms */}
      <div className="flex flex-col items-start px-5 ml-8 py-5 space-y-2 w-full">
        {/* section title */}
        <span className="flex flex-row items-center ">
          <FaDotCircle className="text-orange-500 text-lg" />

          <span className="text-md tracking-widest font-semibold text-slate-300 uppercase ml-1">
            Live
          </span>
        </span>

        {/* list of current rooms */}
        <span className="flex flex-row items-center bg-teal-600 rounded-lg shadow-lg p-2 w-full">
          <Avatar.Group
            maxCount={2}
            size="large"
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
            <Avatar style={{ backgroundColor: "#87d068" }} icon={<FaUser />} />
            <Avatar style={{ backgroundColor: "#1890ff" }} icon={<FaUser />} />
          </Avatar.Group>

          <span className="text-white ml-2 font-semibold">Cafeteria</span>

          <FaPhoneSlash className="ml-auto text-red-500 text-2xl" />
        </span>

        <span className="group flex flex-row items-center bg-slate-50 rounded-lg shadow-lg p-2 w-full">
          <Avatar.Group
            maxCount={2}
            size="large"
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </Avatar.Group>

          <span className="text-slate-400 ml-2">Chillin and Coding</span>

          <span
            className="ml-auto invisible 
          group-hover:visible hover:cursor-pointer transition-all"
          >
            <FaWalking className="text-teal-600 text-2xl" />
          </span>
        </span>
      </div>

      {/* pinned items */}
      <div className="flex flex-col items-start px-5 ml-8 py-5 space-y-2 w-full">
        {/* section title */}
        <span className="flex flex-row items-center w-full">
          <FaThumbtack className="text-sky-400 text-lg mr-1" />

          <span className="text-md tracking-widest font-semibold text-slate-300 uppercase">
            Pinned
          </span>

          <FaPlus className="text-slate-400 text-lg shrink-0 ml-auto" />
        </span>

        {/* pinned drawer items */}
        <span className="flex flex-row items-center flex-wrap w-full gap-2">
          <span className="rounded-lg bg-slate-200 p-2 hover:cursor-pointer">
            <FaGithub className="text-slate-400 text-3xl shrink-0" />
          </span>

          <span className="rounded-lg bg-slate-200 p-2 hover:cursor-pointer">
            <FaAtlassian className="text-sky-400 text-3xl shrink-0" />
          </span>

          <span className="rounded-lg bg-slate-200 p-2 hover:cursor-pointer">
            <FaCode className="text-blue-400 text-3xl shrink-0" />
          </span>

          <span className="rounded-lg bg-slate-200 p-2 hover:cursor-pointer">
            <FaGlobe className="text-purple-400 text-3xl shrink-0" />
          </span>

          <span className="rounded-lg bg-slate-200 p-2 hover:cursor-pointer">
            <FaGoogleDrive className="text-emerald-400 text-3xl shrink-0" />
          </span>
        </span>

        <Divider />

        {/* list of pinned convos */}
        <span className="flex flex-row items-center bg-slate-50 rounded-lg shadow-lg p-2 w-full">
          <Avatar.Group
            maxCount={2}
            size="large"
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </Avatar.Group>

          <span className="flex flex-col items-start ml-2">
            <span className="text-slate-500 font-semibold">Josh</span>

            <span className="text-slate-300 text-xs">engineer</span>
          </span>

          <Tooltip title={"Press and hold R to send a voice clip."}>
            <span
              className="ml-auto shadow-lg flex flex-row items-center h-10 w-10 
            justify-center rounded-lg text-orange-700 bg-slate-100 text-lg font-bold hover:cursor-pointer"
            >
              <FaMicrophone />
            </span>
          </Tooltip>
          <span
            className="ml-2 shadow-lg flex flex-row items-center h-10 w-10 justify-center 
          rounded-lg text-teal-600 bg-slate-100 text-lg font-bold"
          >
            <FaPlay />
          </span>
        </span>

        <span className="group flex flex-row items-center rounded-lg p-2 w-full hover:cursor-pointer">
          <Avatar.Group
            maxCount={2}
            size="large"
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            <Avatar src="https://yt3.ggpht.com/ytc/AKedOLQDVVudyMlzgNrCzOfNkUKn0KGGwfHQ-PjU02p6PQ=s48-c-k-c0x00ffffff-no-rj" />
          </Avatar.Group>

          <span className="flex flex-col items-start ml-2">
            <span className="text-slate-400">Mark</span>

            <span className="text-slate-300 text-xs">architect</span>
          </span>

          <span
            className="ml-auto shadow-lg flex flex-row items-center h-10 w-10 
            justify-center rounded-lg text-slate-400  font-bold hover:cursor-pointer"
          >
            2
          </span>
        </span>

        <span className="group flex flex-row items-center rounded-lg p-2 w-full hover:cursor-pointer">
          <Avatar.Group
            maxCount={2}
            size="large"
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            <Badge dot color={"green"}>
              <Avatar shape="circle" src="https://picsum.photos/200/100" />
            </Badge>
          </Avatar.Group>

          <span className="flex flex-col items-start ml-2">
            <span className="flex flex-row space-x-2 items-center">
              <span className="text-slate-500 font-semibold">Sydney</span>
            </span>

            <span className="text-slate-300 text-xs">designer</span>
          </span>

          <FaCircle className="ml-auto text-orange-500 mr-2 animate-pulse text-[0.7em]" />

          <span
            className="ml-2 shadow-lg flex flex-row items-center h-10 w-10 
            justify-center rounded-lg text-slate-400  font-bold hover:cursor-pointer"
          >
            3
          </span>
        </span>

        <span className="group flex flex-row items-center rounded-lg p-2 w-full hover:cursor-pointer">
          <Avatar.Group
            maxCount={2}
            size="large"
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            <Badge dot color={"green"}>
              <Avatar shape="circle" src="https://picsum.photos/202/600" />
            </Badge>
          </Avatar.Group>

          <span className="flex flex-col items-start ml-2">
            <span className="text-slate-400">Jessica</span>

            <span className="text-slate-300 text-xs">recruiter</span>
          </span>

          <span
            className="ml-auto shadow-lg flex flex-row items-center h-10 w-10 
            justify-center rounded-lg text-slate-400  font-bold hover:cursor-pointer"
          >
            4
          </span>
        </span>

        <span className="group flex flex-row items-center rounded-lg p-2 w-full hover:cursor-pointer">
          <Avatar.Group
            maxCount={2}
            size="large"
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            <Avatar shape="circle" src="https://picsum.photos/200/300" />
            <Avatar shape="circle" src="https://picsum.photos/240/300" />
            <Avatar shape="circle" src="https://picsum.photos/240/300" />
            <Avatar shape="circle" src="https://picsum.photos/240/300" />
            <Avatar shape="circle" src="https://picsum.photos/240/300" />
            <Avatar shape="circle" src="https://picsum.photos/240/300" />
            <Avatar shape="circle" src="https://picsum.photos/240/300" />
            <Avatar shape="circle" src="https://picsum.photos/240/300" />
            <Avatar shape="circle" src="https://picsum.photos/240/300" />
            <Avatar shape="circle" src="https://picsum.photos/240/300" />
          </Avatar.Group>

          <span className="flex flex-col items-start ml-2">
            <span className="text-slate-400">General</span>
          </span>

          <span
            className="ml-auto shadow-lg flex flex-row items-center h-10 w-10 
            justify-center rounded-lg text-slate-400  font-bold hover:cursor-pointer"
          >
            5
          </span>
        </span>

        <span className="group flex flex-row items-center rounded-lg p-2 w-full hover:cursor-pointer">
          <Avatar.Group
            maxCount={2}
            size="large"
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
            <Avatar style={{ backgroundColor: "#87d068" }} icon={<FaUser />} />
            <Avatar style={{ backgroundColor: "#1890ff" }} icon={<FaUser />} />
            <Avatar style={{ backgroundColor: "#1890ff" }} icon={<FaUser />} />
            <Avatar style={{ backgroundColor: "#1890ff" }} icon={<FaUser />} />
          </Avatar.Group>

          <span className="flex flex-col items-start ml-2">
            <span className="text-slate-400">Engineering</span>
          </span>

          <span
            className="ml-auto shadow-lg flex flex-row items-center h-10 w-10 
            justify-center rounded-lg text-slate-400  font-bold hover:cursor-pointer"
          >
            5
          </span>
        </span>
      </div>
    </div>
  );
}

function Convos() {
  return (
    <div className="flex flex-col px-20 items-baseline flex-1 container mx-auto">
      {/* Today */}
      <span className="flex flex-row items-center mb-5 px-5 w-full">
        <span className="text-md tracking-widest font-semibold text-slate-300 uppercase">
          Today
        </span>

        <FaCheckDouble className="text-slate-300 ml-auto text-lg" />
      </span>

      <span className="flex flex-col w-full items-stretch">
        {/* engineering */}
        <span
          className="py-2 px-4 border-t border-t-slate-200 flex flex-row hover:bg-slate-50 transition-all
         items-center first:rounded-t-lg last:rounded-b-lg"
        >
          <FaCircle className="text-orange-500 mr-2 animate-pulse" />

          <span className="w-[15rem] flex flex-row items-center">
            <Avatar.Group
              maxCount={1}
              size="large"
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              className="w-[5rem]"
            >
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<FaUser />}
              />
              <Avatar
                style={{ backgroundColor: "#1890ff" }}
                icon={<FaUser />}
              />
              <Avatar
                style={{ backgroundColor: "#1890ff" }}
                icon={<FaUser />}
              />
              <Avatar
                style={{ backgroundColor: "#1890ff" }}
                icon={<FaUser />}
              />
            </Avatar.Group>

            <span className="text-slate-500 ml-2">Engineering</span>
          </span>

          <span className="text-slate-300 w-[20rem] truncate text-sm">
            {`Josh: "let's just figure out how to finish the rest of the "`}
          </span>

          <span className="ml-auto text-slate-300 text-sm group-hover:invisible">
            9:00am
          </span>

          {/* actions */}
          <span className="ml-auto flex flex-row items-center group-hover:visible invisible absolute right-5">
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRocket className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRegClock className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaCheck className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaAngleRight className="ml-auto text-lg" />
            </span>
          </span>
        </span>

        {/* general */}
        <span
          className="group relative border-t border-t-slate-200 hover:bg-slate-50 
        transition-all py-2 px-4 flex flex-row items-center first:rounded-t-lg last:rounded-b-lg"
        >
          <FaCircle className="text-slate-100 mr-2 animate-pulse" />

          <span className="w-[15rem] flex flex-row items-center">
            <Avatar.Group
              maxCount={1}
              size="large"
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              className="w-[5rem]"
            >
              <Avatar shape="circle" src="https://picsum.photos/200/300" />
              <Avatar shape="circle" src="https://picsum.photos/240/300" />
              <Avatar shape="circle" src="https://picsum.photos/240/300" />
              <Avatar shape="circle" src="https://picsum.photos/240/300" />
              <Avatar shape="circle" src="https://picsum.photos/240/300" />
              <Avatar shape="circle" src="https://picsum.photos/240/300" />
              <Avatar shape="circle" src="https://picsum.photos/240/300" />
              <Avatar shape="circle" src="https://picsum.photos/240/300" />
              <Avatar shape="circle" src="https://picsum.photos/240/300" />
              <Avatar shape="circle" src="https://picsum.photos/240/300" />
            </Avatar.Group>

            <span className="text-slate-600 ml-2">General</span>
          </span>

          <span className="text-slate-300 w-[10rem] truncate text-sm">
            You spoke 2 hours ago
          </span>

          <span className="ml-auto text-slate-300 text-sm group-hover:invisible">
            7:22am
          </span>

          {/* actions */}
          <span className="ml-auto flex flex-row items-center group-hover:visible invisible absolute right-5">
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRocket className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRegClock className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaCheck className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaAngleRight className="ml-auto text-lg" />
            </span>
          </span>
        </span>

        {/* one on one chat with sydney */}
        <span
          className="group py-2 border-t border-t-slate-200 last:border-b hover:bg-slate-50 transition-all
         relative px-4 flex flex-row items-center first:rounded-t-lg last:rounded-b-lg"
        >
          <FaCircle className="text-orange-500 mr-2 animate-pulse" />

          <span className="w-[15rem] flex flex-row items-center">
            <Avatar.Group
              maxCount={2}
              size="large"
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              className="w-[5rem]"
            >
              <Badge dot color={"green"}>
                <Avatar shape="circle" src="https://picsum.photos/200/100" />
              </Badge>
            </Avatar.Group>

            <span className="text-slate-600 ml-2">Sydney</span>
          </span>

          <span className="text-slate-300 w-[20rem] truncate text-sm">
            {`"Did you ever figure out that problem with the "`}
          </span>

          <span className="ml-auto text-slate-300 text-sm group-hover:invisible">
            6:50am
          </span>

          {/* actions */}
          <span className="ml-auto flex flex-row items-center group-hover:visible invisible absolute right-5">
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRocket className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRegClock className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaCheck className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaAngleRight className="ml-auto text-lg" />
            </span>
          </span>
        </span>
      </span>

      <span className="flex flex-row items-center mb-5 px-5 w-full mt-10">
        <span className="text-md tracking-widest font-semibold text-slate-300 uppercase">
          Last 7 Days
        </span>

        <FaCheckDouble className="text-slate-300 ml-auto text-lg" />
      </span>

      <span className="flex flex-col w-full items-stretch">
        <span
          className="group py-2 border-t border-t-slate-200 last:border-b hover:bg-slate-50 transition-all
         relative px-4 flex flex-row items-center first:rounded-t-lg last:rounded-b-lg"
        >
          <FaCircle className="text-orange-500 mr-2 animate-pulse" />

          <span className="w-[15rem] flex flex-row items-center">
            <Avatar.Group
              maxCount={2}
              size="large"
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              className="w-[5rem]"
            >
              <Badge dot color={"green"}>
                <Avatar shape="circle" src="https://picsum.photos/240/100" />
              </Badge>
            </Avatar.Group>

            <span className="text-slate-600 ml-2">Justin</span>
          </span>

          <span className="text-slate-300 w-[20rem] truncate text-sm">
            {`"Here's a quick github link for that library you were looking for"`}
          </span>

          <span className="flex flex-row items-center space-x-2 mx-auto">
            <span className="rounded-lg bg-slate-200 p-2 hover:cursor-pointer">
              <FaGithub className="text-slate-400 text-xl shrink-0" />
            </span>

            <span className="rounded-lg bg-slate-200 p-2 hover:cursor-pointer">
              <FaAtlassian className="text-sky-400 text-xl shrink-0" />
            </span>
          </span>

          <span className="ml-auto text-slate-300 text-sm group-hover:invisible">
            6:50am
          </span>

          {/* actions */}
          <span className="ml-auto flex flex-row items-center group-hover:visible invisible absolute right-5">
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRocket className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRegClock className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaCheck className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaAngleRight className="ml-auto text-lg" />
            </span>
          </span>
        </span>

        <span
          className="group py-2 border-t border-t-slate-200 last:border-b hover:bg-slate-50 transition-all
         relative px-4 flex flex-row items-center first:rounded-t-lg last:rounded-b-lg"
        >
          <FaCircle className="text-orange-500 mr-2 animate-pulse" />

          <span className="w-[15rem] flex flex-row items-center">
            <Avatar.Group
              maxCount={2}
              size="large"
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              className="w-[5rem]"
            >
              <Avatar shape="circle" src="https://picsum.photos/190/100" />
              <Avatar shape="circle" src="https://picsum.photos/192/100" />
            </Avatar.Group>

            <span className="text-slate-600 ml-2">Steph and Lee</span>
          </span>

          <span className="text-slate-300 w-[20rem] truncate text-sm">
            {`"Let's hop into a room to discuss this sometime this afternoon..."`}
          </span>

          <span className="ml-auto text-slate-300 text-sm group-hover:invisible">
            6:50am
          </span>

          {/* actions */}
          <span className="ml-auto flex flex-row items-center group-hover:visible invisible absolute right-5">
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRocket className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaRegClock className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaCheck className="ml-auto text-lg" />
            </span>
            <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200">
              <FaAngleRight className="ml-auto text-lg" />
            </span>
          </span>
        </span>
      </span>

      <span className="flex flex-row items-center mb-5 px-5 w-full mt-10">
        <span className="text-md tracking-widest font-semibold text-slate-300 uppercase">
          Earlier This Month
        </span>

        <FaCheckDouble className="text-slate-300 ml-auto text-lg" />
      </span>

      <span className="flex flex-row items-center mb-5 px-5 w-full mt-10">
        <span className="text-md tracking-widest font-semibold text-slate-300 uppercase">
          November 2021
        </span>

        <FaCheckDouble className="text-slate-300 ml-auto text-lg" />
      </span>

      <span className="mx-auto text-slate-300">{"That's all"}</span>
    </div>
  );
}
