import Image from "next/image";
import React, { useState } from "react";
import {
  FaMicrophoneAlt,
  FaHeadphonesAlt,
  FaTh,
  FaAngleDown,
  FaPlusSquare,
  FaBroom,
  FaBell,
  FaFilePdf,
  FaCopy,
  FaClock,
  FaPlay,
  FaPlus,
  FaCheck,
  FaCode,
  FaLink,
  FaExternalLinkAlt,
  FaArchive,
  FaAtlassian,
  FaSearch,
} from "react-icons/fa";
import { IoPulseOutline, IoRemoveOutline, IoTimer } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";

import { UserStatus, User } from "../../models/user";
import { KeyCode } from "../../globals/keycode";

import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAuth } from "../../contexts/authContext";

let testFriends = [
  {
    name: "Liam",
    role: "engineer",
    systemAvatar: "29",
    status: UserStatus.online,
  },
  {
    name: "Emily",
    role: "engineer",
    systemAvatar: "02",
    status: UserStatus.online,
  },
  {
    name: "Paul",
    role: "architect",
    systemAvatar: "43",
    status: UserStatus.online,
  },
  {
    name: "Mark",
    role: "engineer",
    systemAvatar: "04",
    status: UserStatus.busy,
  },
  {
    name: "Adriana",
    role: "design",
    systemAvatar: "06",
    status: UserStatus.busy,
  },
  {
    name: "Josh",
    role: "design",
    systemAvatar: "05",
    status: UserStatus.offline,
  },
];

export default function Dashboard() {
  const { currUser, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // if not authenticated, take user to the login
    if (!currUser) {
      console.log("not authenticated...routing from dashboard to teams home");
      router.push("/teams/login");
    }
  }, [currUser]);

  const [selectedChannel, setSelectedChannel] = useState(null);

  console.log("in dashboard " + currUser);

  async function handleSignOut() {
    console.log("clicked log out button");

    try {
      await logOut();

      router.push("/teams");
    } catch (error) {
      console.log(error);
    }
  }

  function statusBubble(status: UserStatus) {
    console.log(status);

    switch (status) {
      case UserStatus.online:
        return (
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></span>
        );
      case UserStatus.busy:
        return (
          <span className="absolute top-0 right-0 w-3 h-3 bg-orange-400 rounded-full"></span>
        );
      case UserStatus.offline:
        return (
          <span className="absolute top-0 right-0 w-3 h-3 bg-gray-400 rounded-full"></span>
        );
      default:
        return (
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></span>
        );
    }
  }

  function renderPulse(status: UserStatus) {
    switch (status) {
      case UserStatus.online:
        return (
          <IoPulseOutline className="text-green-500 text-2xl animate-pulse mx-2 ml-auto" />
        );
      case UserStatus.busy:
        return (
          <IoPulseOutline className="text-orange-400 text-2xl animate-pulse mx-2 ml-auto" />
        );
      case UserStatus.offline:
        return (
          <IoRemoveOutline className="text-gray-400 text-2xl mx-2 ml-auto" />
        );
      default:
        return (
          <IoPulseOutline className="text-green-400 text-2xl animate-pulse mx-2 ml-auto" />
        );
    }
  }

  function handleKeyboardShortcut(event) {
    console.log(event.keyCode);

    switch (event.keyCode) {
      case KeyCode.Escape:
        setSelectedChannel(null);
        break;
      case KeyCode.Zero:
        setSelectedChannel(0);
        break;
      case KeyCode.One:
        setSelectedChannel(1);
        break;
      case KeyCode.Two:
        setSelectedChannel(2);
        break;
      case KeyCode.Three:
        setSelectedChannel(3);
        break;
      case KeyCode.Four:
        setSelectedChannel(4);
        break;
      case KeyCode.Five:
        setSelectedChannel(5);
        break;
      default:
        return;
    }
  }

  return (
    <>
      <div className="container mx-auto max-w-screen-xl py-10 flex flex-col space-y-5">
        {/* header content */}
        <section className="flex-1 flex flex-row items-center justify-between py-5">
          {/* welcome message */}
          <span className="flex flex-col items-baseline">
            <span className="font-bold text-xl text-white">
              👋Hey Arjun, Good Afternoon!
            </span>

            {/* Date and time */}
            <span className="flex flex-row space-x-2">
              <span className="text-sky-700 bg-sky-200 p-1 rounded-md text-xs font-bold mt-2">
                Tues, Jan 11th
              </span>
              <span className="text-yellow-700 bg-yellow-200 p-1 rounded-md text-xs font-bold mt-2">
                1:34am
              </span>
            </span>
          </span>

          {/* header control section */}
          <span className="flex flex-row items-center space-x-5">
            <button
              onClick={handleSignOut}
              className="mt-10 text-sm text-orange-500 font-semibold py-1 px-4 bg-orange-200 rounded"
            >
              👋 Logout
            </button>
            {/* search bar */}
            <div className="pt-2 flex flex-row relative items-center">
              <button type="submit" className="absolute left-0 top-0 mt-5 ml-5">
                <FaSearch className="text-white" />
              </button>

              <input
                className=" bg-white bg-opacity-40 h-10 px-5 pl-10 pr-16 rounded-lg text-white text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
              />

              <button
                className="absolute right-1 rounded-lg py-1 px-2 ml-1 
                                    shadow-md text-center text-white text-sm font-bold"
              >
                CTRL + K
              </button>
            </div>

            <FaBell className="text-lg text-gray-400 hover:text-white ease-in-out duration-300 hover:scale-110 hover:cursor-pointer" />
            <FaHeadphonesAlt className="text-lg text-gray-400 hover:text-white ease-in-out duration-300 hover:scale-110 hover:cursor-pointer" />
            <FaMicrophoneAlt className="text-lg text-gray-400 hover:text-white ease-in-out duration-300 hover:scale-110 hover:cursor-pointer" />
            <FaTh className="text-lg text-gray-400 hover:text-white ease-in-out duration-300 hover:scale-110 hover:cursor-pointer" />

            {/* avatar */}
            <span className="relative flex">
              <span className="bg-gray-200 bg-opacity-30 rounded-full shadow-md absolute w-full h-full"></span>
              <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></span>
              <Image
                src="/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-22.svg"
                alt="profile"
                width={50}
                height={50}
              />
            </span>
          </span>
        </section>

        <div className="flex flex-row items-baseline space-x-5 space-y-5 flex-wrap">
          {/* personal line */}
          <section className="p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md">
            <span className="flex flex-row justify-start items-center pb-5">
              <span className="flex flex-col">
                <span className="text-white">TEAM</span>
              </span>

              <button className="bg-gray-300 bg-opacity-25 p-2 ml-auto rounded hover:bg-opacity-40">
                <FaPlus className="text-lg text-white" />
              </button>
            </span>

            {/* list of team members */}
            {testFriends.map((friend, i) => {
              return (
                <span
                  key={i}
                  className={
                    "flex flex-row items-center py-2 px-2 justify-items-start ease-in-out duration-300 " +
                    (selectedChannel == i
                      ? "bg-white bg-opacity-80 scale-105 shadow-2xl"
                      : " ")
                  }
                >
                  <span className="relative flex mr-2">
                    <span className="bg-gray-200 bg-opacity-30 rounded-full shadow-md absolute w-full h-full"></span>

                    {statusBubble(friend.status)}

                    <Image
                      src={
                        "/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-" +
                        friend.systemAvatar +
                        ".svg"
                      }
                      alt="profile"
                      width={50}
                      height={50}
                    />
                  </span>

                  <span className="flex flex-col mr-10">
                    <span className="flex flex-row items-center space-x-2">
                      <span className="text-sm text-white font-bold">
                        {friend.name}{" "}
                      </span>
                      {selectedChannel == i ? (
                        <>
                          <button
                            className="rounded-lg bg-gray-400 shadow-lg text-center 
                                                    text-white text-sm py-1 px-2 font-bold"
                          >
                            {i}
                          </button>
                        </>
                      ) : (
                        <button
                          className="rounded-lg border py-1 px-2 border-gray-100 shadow-md 
                                                text-center text-gray-200 text-smf font-bold"
                        >
                          {i}
                        </button>
                      )}
                    </span>

                    <span
                      className={
                        "text-xs span-sans text-gray-300" +
                        (selectedChannel == i ? "text-black" : " ")
                      }
                    >
                      {friend.role}
                    </span>
                  </span>

                  {renderPulse(friend.status)}
                </span>
              );
            })}
          </section>

          <div className="flex-1 flex flex-col space-y-5 items-baseline">
            {/* pinned */}
            <section className="p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md">
              <span className="flex flex-row justify-start items-center pb-5">
                <span className="flex flex-col mr-20">
                  <span className="text-white mr-auto">
                    ANNOUNCEMENTS
                    <button
                      className="right-1 rounded-lg py-1 px-2 ml-1 
                                        shadow-md text-center text-white text-sm font-bold"
                    >
                      CTRL + A
                    </button>
                  </span>
                  <span className="text-gray-300 text-xs">
                    updates, pep talks, blockers, reminders
                  </span>
                </span>

                {/* tab pane */}
                <span className="ml-auto flex flex-row space-x-5 uppercase mr-5">
                  <span className="underline underline-offset-8 decoration-white text-white hover:text-white hover:cursor-pointer">
                    Active
                  </span>

                  <span className="text-gray-300 hover:text-white hover:cursor-pointer">
                    Resolved
                  </span>
                </span>

                <span className="text-sm text-gray-300 flex flex-row items-center">
                  TODAY <FaAngleDown />
                </span>

                <button className="bg-gray-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
                  <FaMicrophoneAlt className="text-lg text-white" />
                </button>
                <button className="bg-gray-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
                  <FaPlay className="text-lg text-white" />
                </button>
              </span>

              <div className="flex flex-row overflow-auto whitespace-nowrap space-x-5 items-center">
                {/* adriana's announcement */}
                <span className="flex flex-row p-3 bg-gray-300 bg-opacity-25 rounded-lg items-center">
                  <span className="relative mr-2 grid items-center justify-items-center">
                    <span className="bg-gray-200 bg-opacity-20 rounded-full shadow-md absolute w-full h-full"></span>

                    {statusBubble(UserStatus.busy)}

                    <Image
                      src={
                        "/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-06.svg"
                      }
                      alt="profile"
                      width={50}
                      height={50}
                    />
                  </span>

                  <span className="flex flex-col items-baseline">
                    <span className="text-md font-bold text-white">
                      Adriana
                    </span>
                    <span className="text-xs text-gray-200">5 minutes ago</span>
                    <span className="text-xs text-white bg-red-400 p-1 rounded-md font-semibold flex flex-row items-center">
                      <span>blockers</span>
                    </span>
                  </span>
                </span>

                {/* arjun's announcement */}
                <span className="flex flex-row p-3 bg-gray-300 bg-opacity-25 rounded-lg items-center">
                  <span className="relative mr-2 grid items-center justify-items-center">
                    <span className="bg-gray-200 bg-opacity-20 rounded-full shadow-md absolute w-full h-full"></span>

                    {statusBubble(UserStatus.busy)}

                    <Image
                      src={
                        "/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-22.svg"
                      }
                      alt="profile"
                      width={50}
                      height={50}
                    />
                  </span>

                  <span className="flex flex-col items-baseline mr-5">
                    <span className="text-md font-bold text-white">Arjun</span>
                    <span className="text-xs text-gray-200">
                      30 minutes ago
                    </span>
                    <span className="text-xs text-white bg-indigo-400 p-1 rounded-md font-semibold flex flex-row items-center">
                      <span>engineering</span>
                    </span>
                  </span>

                  <button className="bg-gray-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
                    <FaCheck className="text-lg text-white" />
                  </button>
                </span>
              </div>
            </section>

            {/* rooms */}
            <section className="p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md">
              <span className="flex flex-row justify-end space-x-3 pb-5 items-center">
                <span className="text-white mr-auto">
                  ROOMS
                  <button
                    className="right-1 rounded-lg py-1 px-2 ml-1 
                                    shadow-md text-center text-white text-sm font-bold"
                  >
                    CTRL + R
                  </button>
                </span>

                {/* tab pane */}
                <span className="flex flex-row space-x-5 uppercase mr-5">
                  <span className="underline underline-offset-8 decoration-white text-white hover:text-white hover:cursor-pointer">
                    All
                  </span>

                  <span className="text-gray-300 hover:text-white hover:cursor-pointer">
                    Live
                  </span>

                  <span className="text-gray-300 hover:text-white hover:cursor-pointer">
                    Scheduled
                  </span>

                  <span className="text-gray-300 hover:text-white hover:cursor-pointer">
                    Recurring
                  </span>
                </span>

                <span className="text-sm text-gray-300 flex flex-row items-center uppercase">
                  Week <FaAngleDown />
                </span>

                <button className="bg-gray-300 bg-opacity-25 p-2 rounded hover:bg-opacity-40">
                  <FaPlus className="text-lg text-white" />
                </button>

                <BsThreeDots className="text-xl text-white" />
              </span>

              {/* all rooms */}
              <span className="flex flex-row flex-wrap">
                {/* spontaneous bugs room */}
                <span className="flex flex-col bg-white bg-opacity-80 rounded-lg justify-between w-96 max-w-screen-sm m-2 overflow-clip">
                  {/* header */}
                  <span className="flex flex-1 flex-row justify-between items-baseline space-x-1 p-5">
                    {/* meeting details */}
                    <span className="flex flex-col items-baseline max-w-xs pr-10">
                      <span className="text-gray-500 font-semibold mr-auto">
                        bug fixing
                      </span>
                      <span className="text-xs text-gray-400 overflow-wrap">
                        were just fixing that jsx bug thats a paiiinnnn
                      </span>

                      {/* badges and tags */}
                      <span className="flex flex-row flex-wrap">
                        <span className="text-xs m-1 text-white bg-red-400 p-1 rounded-md font-bold flex flex-row items-center">
                          <span>blockers</span>
                        </span>

                        <span className="text-xs m-1 text-white bg-indigo-400 p-1 rounded-md font-bold flex flex-row items-center">
                          <span>engineering</span>
                        </span>
                      </span>
                    </span>

                    {/* room status */}
                    <span className="flex flex-col items-end space-y-1 justify-between h-full">
                      <span
                        className="text-xs bg-red-500
                                        text-white font-bold p-1 rounded-md flex flex-row space-x-2 items-center"
                      >
                        <FaClock />
                        <span>live</span>
                      </span>

                      {/* room attachments */}
                      <span className="flex flex-row space-x-2">
                        <button className="bg-gray-400 bg-opacity-25 p-2 ml-auto rounded hover:bg-opacity-40">
                          <FaLink className="text-sm text-gray-400" />
                        </button>

                        <button className="bg-gray-400 bg-opacity-25 p-2 ml-auto rounded hover:bg-opacity-40">
                          <FaLink className="text-sm text-gray-400" />
                        </button>
                      </span>
                    </span>
                  </span>

                  {/* footer */}
                  <span className="flex flex-row items-center bg-gray-400 bg-opacity-30 p-3">
                    <span className="inline-flex flex-row-reverse items-center shrink-0 mr-1">
                      <span className="relative flex">
                        <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
                        <Image
                          className=""
                          src={
                            "/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-20.svg"
                          }
                          alt="profile"
                          width={30}
                          height={30}
                        />
                      </span>
                      <span className="-mr-4 relative flex">
                        <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
                        <Image
                          className=""
                          src={
                            "/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-22.svg"
                          }
                          alt="profile"
                          width={30}
                          height={30}
                        />
                      </span>
                    </span>
                    <span className="text-xs text-gray-400">
                      Arjun and Liam
                    </span>
                    <button className="ml-auto text-sm text-orange-500 font-semibold py-1 px-4 bg-gray-200 rounded">
                      👋 Leave
                    </button>
                    <BsThreeDots className="text-white ml-2 hover:cursor-pointer" />{" "}
                  </span>
                </span>

                {/* live room - design meeting */}
                <span className="flex flex-col bg-gray-300 bg-opacity-25 rounded-lg justify-between w-96 max-w-screen-sm m-2 overflow-clip">
                  {/* header */}
                  <span className="flex flex-row justify-between items-baseline space-x-1 p-5">
                    {/* meeting details */}
                    <span className="flex flex-col items-baseline max-w-xs pr-20">
                      <span className="text-white font-semibold mr-auto">
                        Shopping Cart Experience
                      </span>
                      <span className="text-xs text-gray-200 overflow-wrap">
                        lets finish the mockups @josh, @mark, and @arjun please
                        step in for feedback
                      </span>

                      {/* badges and tags */}
                      <span className="flex flex-row flex-wrap space-x-2">
                        <span className="text-xs my-3 text-white bg-purple-400 p-1 rounded-md font-bold flex flex-row space-x-2 items-center">
                          <span>design</span>
                        </span>
                      </span>
                    </span>

                    {/* room status */}
                    <span className="flex flex-col items-end justify-between h-full">
                      <span
                        className="text-xs bg-red-500
                                        text-white font-bold p-1 rounded-md flex flex-row space-x-2 items-center"
                      >
                        <FaClock />
                        <span>live</span>
                      </span>
                      <span className="text-gray-200 text-xs text-right mb-auto">
                        on and off all day
                      </span>

                      {/* room attachments */}
                      <span className="flex flex-row space-x-2">
                        <button className="bg-gray-300 bg-opacity-25 p-2 rounded hover:bg-opacity-40">
                          <FaLink className="text-sm text-white" />
                        </button>

                        <button className="bg-gray-300 bg-opacity-25 p-2 rounded hover:bg-opacity-40">
                          <FaLink className="text-sm text-white" />
                        </button>
                      </span>
                    </span>
                  </span>

                  {/* footer */}
                  <span className="flex flex-row items-center bg-gray-400 bg-opacity-30 p-3">
                    <span className="inline-flex flex-row-reverse items-center shrink-0 mr-1">
                      <span className="relative flex">
                        <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
                        <Image
                          className=""
                          src={
                            "/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-06.svg"
                          }
                          alt="profile"
                          width={30}
                          height={30}
                        />
                      </span>
                    </span>

                    <span className="text-xs text-white">Adriana</span>

                    <button className="ml-auto text-sm font-semibold py-1 px-4 rounded bg-gray-300 text-green-500">
                      Join
                    </button>

                    <BsThreeDots className="text-white ml-2 hover:cursor-pointer" />
                  </span>
                </span>

                {/* scheduled room - one on one */}
                <span className="flex flex-col bg-gray-300 bg-opacity-25 rounded-lg justify-between w-96 max-w-screen-sm m-2 overflow-clip">
                  {/* header */}
                  <span className="flex flex-row justify-between items-baseline space-x-1 p-5">
                    {/* meeting details */}
                    <span className="flex flex-col items-baseline max-w-xs pr-20">
                      <span className="text-white font-semibold mr-auto">
                        Arjun and Paul - One on one
                      </span>
                      <span className="text-xs text-gray-200 overflow-wrap">
                        performance review
                      </span>

                      {/* badges and tags */}
                      <span className="flex flex-row flex-wrap space-x-2">
                        <span className="text-xs my-3 text-white bg-gray-400 p-1 rounded-md font-bold flex flex-row space-x-2 items-center">
                          <span>private</span>
                        </span>
                      </span>
                    </span>

                    {/* room status */}
                    <span className="flex flex-col items-end">
                      <span className="text-blue-700 bg-blue-200 p-1 rounded-md text-xs font-bold flex flex-row items-center space-x-1">
                        <FaClock />
                        <span>scheduled</span>
                      </span>

                      <span className="text-gray-200 text-xs text-center">
                        3ish? Ill ping you Arjun
                      </span>
                    </span>
                  </span>

                  {/* footer */}
                  <span className="flex flex-row items-center bg-gray-400 bg-opacity-30 p-3">
                    <button className="ml-auto text-sm font-semibold py-1 px-4 rounded bg-gray-300 text-green-500">
                      Join
                    </button>
                    <BsThreeDots className="text-white ml-2 hover:cursor-pointer" />{" "}
                  </span>
                </span>

                {/* recurring room - dsu */}
                <span className="flex flex-col bg-gray-300 bg-opacity-25 rounded-lg justify-between w-96 max-w-screen-sm m-2 overflow-clip">
                  {/* header */}
                  <span className="flex flex-row justify-between items-baseline space-x-1 p-5">
                    {/* meeting details */}
                    <span className="flex flex-col items-baseline max-w-xs pr-20">
                      <span className="text-white font-semibold mr-auto">
                        Daily Standup
                      </span>
                      <span className="text-xs text-gray-200 overflow-wrap"></span>

                      {/* badges and tags */}
                      <span className="flex flex-row flex-wrap space-x-2">
                        <span className="text-xs my-3 text-white bg-cyan-400 p-1 rounded-md font-bold flex flex-row space-x-2 items-center">
                          <span>scrum</span>
                        </span>

                        <span className="text-xs my-3 text-white bg-indigo-400 p-1 rounded-md font-bold flex flex-row space-x-2 items-center">
                          <span>engineering</span>
                        </span>
                      </span>
                    </span>

                    {/* room status */}
                    <span className="flex flex-col items-center justify-start">
                      <span className="text-yellow-700 bg-yellow-200 p-1 rounded-md text-xs font-bold flex flex-row items-center space-x-1">
                        <IoTimer />
                        <span>recurring</span>
                      </span>

                      <span className="text-gray-200 text-xs">10am daily</span>
                    </span>
                  </span>

                  {/* footer */}
                  <span className="flex flex-row items-center bg-gray-400 bg-opacity-30 p-3">
                    <button className="ml-auto text-sm font-semibold py-1 px-4 rounded bg-gray-300 text-green-500">
                      Join
                    </button>
                    <button className="bg-orange-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
                      <FaBell className="text-sm text-orange-500" />
                    </button>
                    <BsThreeDots className="text-white ml-2 hover:cursor-pointer" />{" "}
                  </span>
                </span>

                {/* recurring  room - demo */}
                <span className="flex flex-col bg-gray-300 bg-opacity-25 rounded-lg justify-between w-96 max-w-screen-sm m-2 overflow-clip">
                  {/* header */}
                  <span className="flex flex-row justify-between items-baseline space-x-1 p-5">
                    {/* meeting details */}
                    <span className="flex flex-col items-baseline max-w-xs pr-20">
                      <span className="text-white font-semibold mr-auto">
                        Sprint Demo
                      </span>
                      <span className="text-xs text-gray-200 overflow-wrap">
                        all hands on deck...lets have fun :)
                      </span>

                      {/* badges and tags */}
                      <span className="flex flex-row flex-wrap space-x-2">
                        <span className="text-xs my-3 text-white bg-cyan-400 p-1 rounded-md font-bold flex flex-row space-x-2 items-center">
                          <span>scrum</span>
                        </span>
                      </span>
                    </span>

                    {/* room status */}
                    <span className="flex flex-col items-center justify-start">
                      <span className="text-yellow-700 bg-yellow-200 p-1 rounded-md text-xs font-bold flex flex-row items-center space-x-1">
                        <IoTimer />
                        <span>recurring</span>
                      </span>

                      <span className="text-gray-200 text-xs text-center">
                        biweekly fridays!
                      </span>
                    </span>
                  </span>

                  {/* footer */}
                  <span className="flex flex-row items-center bg-gray-400 bg-opacity-30 p-3">
                    <button className="ml-auto text-sm font-semibold py-1 px-4 rounded bg-gray-300 text-green-500">
                      Join
                    </button>

                    <button className="bg-orange-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
                      <FaBell className="text-sm text-orange-500" />
                    </button>

                    <BsThreeDots className="text-white ml-2 hover:cursor-pointer" />
                  </span>
                </span>

                {/* recurring room - wine wednesdays */}
                <span className="flex flex-col bg-gray-300 bg-opacity-25 rounded-lg justify-between w-96 max-w-screen-sm m-2 overflow-clip">
                  {/* header */}
                  <span className="flex flex-row justify-between items-baseline space-x-1 p-5">
                    {/* meeting details */}
                    <span className="flex flex-col items-baseline max-w-xs pr-20">
                      <span className="text-white font-semibold mr-auto">
                        Wine Wednesdays
                      </span>
                      <span className="text-xs text-gray-200 overflow-wrap">
                        @JOSH YOU BETTER COME
                      </span>

                      {/* badges and tags */}
                      <span className="flex flex-row flex-wrap space-x-2">
                        <span className="text-xs my-3 text-white bg-lime-400 p-1 rounded-md font-bold flex flex-row space-x-2 items-center">
                          <span>party 🎉</span>
                        </span>
                      </span>
                    </span>

                    {/* room status */}
                    <span className="flex flex-col items-end">
                      <span className="text-yellow-700 bg-yellow-200 p-1 rounded-md text-xs font-bold flex flex-row items-center space-x-1">
                        <IoTimer />
                        <span>recurring</span>
                      </span>

                      <span className="text-gray-200 text-xs text-right">
                        wednesdays 7-9pm
                      </span>
                    </span>
                  </span>

                  {/* footer */}
                  <span className="flex flex-row items-center bg-gray-400 bg-opacity-30 p-3">
                    <button className="ml-auto text-sm font-semibold py-1 px-4 rounded bg-gray-300 text-green-500">
                      Join
                    </button>

                    <button className="bg-orange-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
                      <FaBell className="text-sm text-orange-500" />
                    </button>

                    <BsThreeDots className="text-white ml-2 hover:cursor-pointer" />
                  </span>
                </span>
              </span>
            </section>
          </div>
        </div>

        {/* attachments */}
        <section className="p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md">
          {/* header row */}
          <span className="flex flex-row justify-start pb-5 items-center">
            <span className="flex flex-col mr-20">
              <span className="text-white mr-auto">
                Attachments
                <button
                  className="rounded-lg border py-1 px-2 ml-1 border-gray-100 
                            shadow-md text-center text-gray-200 text-sm font-bold"
                >
                  T
                </button>
                <button
                  className="rounded-lg border py-1 px-2 ml-1 border-gray-100 
                            shadow-md text-center text-gray-200 text-sm font-bold"
                >
                  CTRL + V
                </button>
              </span>
              <span className="text-gray-300 text-xs">
                code, links (jira tickets, drive folders, powerpoints),
                screenshots
              </span>
            </span>

            {/* tab pane */}
            <span className="ml-auto flex flex-row space-x-5 uppercase mr-5">
              <span className="underline underline-offset-8 decoration-white text-white hover:text-white hover:cursor-pointer">
                Team
              </span>

              <span className="text-gray-300 hover:text-white hover:cursor-pointer">
                Personal
              </span>

              <span className="text-gray-300 hover:text-white hover:cursor-pointer">
                Favorites
              </span>
            </span>

            <span className="text-sm mr-5 text-gray-300 flex flex-row items-center">
              TODAY <FaAngleDown />
            </span>

            <button className="bg-gray-300 bg-opacity-25 p-2 rounded hover:bg-opacity-40">
              <FaCode className="text-lg text-white" />
            </button>

            <button className="bg-gray-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
              <FaLink className="text-lg text-white" />
            </button>

            <BsThreeDots className="text-xl text-white ml-2" />
          </span>

          {/* row of attachments */}
          <div className="flex flex-row flex-wrap space-x-2">
            {/* pdf example */}
            <span className="flex flex-col rounded-lg">
              {/* attmnt header */}
              <span className="flex flex-row bg-gray-300 bg-opacity-25 py-5 px-3 items-center justify-start">
                <FaFilePdf className="text-4xl text-orange-300 mr-2" />

                <span className="flex flex-col items-baseline mr-10 space-y-1">
                  <span className="text-md font-bold text-white">
                    report.pdf
                  </span>

                  <span className="text-xs text-white bg-red-400 p-1 rounded-md font-semibold flex flex-row items-center">
                    <span>blockers</span>
                  </span>
                </span>

                {/* attachment actions */}
                <button className="bg-gray-300 bg-opacity-25 p-2 ml-auto rounded hover:bg-opacity-40">
                  <FaCopy className="text-sm text-white" />
                </button>
                <button className="bg-gray-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
                  <FaExternalLinkAlt className="text-sm text-white" />
                </button>

                <button className="bg-orange-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
                  <FaArchive className="text-sm text-orange-500 " />
                </button>
              </span>

              {/* attmnt footer */}
              <span className="flex flex-row items-center bg-gray-400 bg-opacity-30 p-3">
                <span className="inline-flex flex-row-reverse items-center shrink-0 mr-1">
                  <span className="relative flex">
                    <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
                    <Image
                      className=""
                      src={
                        "/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-06.svg"
                      }
                      alt="profile"
                      width={30}
                      height={30}
                    />
                  </span>
                </span>

                <span className="flex flex-col items-baseline">
                  <span className="text-xs text-gray-200 font-bold">
                    Adriana
                  </span>
                  <span className="text-xs text-gray-200 font-extralight">
                    5 minutes ago
                  </span>
                </span>

                <BsThreeDots className="text-white ml-auto hover:cursor-pointer" />
              </span>
            </span>

            {/* jira example */}
            <span className="flex flex-col rounded-lg">
              {/* attmnt header */}
              <span className="flex flex-row bg-gray-300 bg-opacity-25 py-5 px-3 items-center justify-start">
                <FaAtlassian className="text-4xl text-sky-300 mr-2" />

                <span className="flex flex-col items-baseline mr-10 space-y-1">
                  <span className="text-md font-bold text-white">RAM-22</span>
                  <span className="text-xs text-gray-200">
                    technical doc - stripe
                  </span>

                  <span className="text-xs text-white bg-indigo-400 p-1 rounded-md font-semibold flex flex-row items-center">
                    <span>engineering</span>
                  </span>
                </span>

                {/* attachment actions */}
                <button className="bg-gray-300 bg-opacity-25 p-2 ml-auto rounded hover:bg-opacity-40">
                  <FaCopy className="text-sm text-white" />
                </button>
                <button className="bg-gray-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
                  <FaExternalLinkAlt className="text-sm text-white" />
                </button>

                <button className="bg-orange-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
                  <FaArchive className="text-sm text-orange-500" />
                </button>
              </span>

              {/* attmnt footer */}
              <span className="flex flex-row items-center bg-gray-400 bg-opacity-30 p-3">
                <span className="inline-flex flex-row-reverse items-center shrink-0 mr-1">
                  <span className="relative flex">
                    <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
                    <Image
                      className=""
                      src={
                        "/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-43.svg"
                      }
                      alt="profile"
                      width={30}
                      height={30}
                    />
                  </span>
                </span>

                <span className="flex flex-col items-baseline">
                  <span className="text-xs text-gray-200 font-bold">Paul</span>
                  <span className="text-xs text-gray-200 font-extralight">
                    2 hours ago
                  </span>
                </span>

                <BsThreeDots className="text-white ml-auto hover:cursor-pointer" />
              </span>
            </span>
          </div>
        </section>
      </div>

      <div className="fixed bottom-10 w-full -z-10">
        {/* dynamic footer based on selection */}
        <section
          className={
            "flex flex-row bg-gray-300 max-w-screen-md mx-auto p-5 shadow-xl rounded-xl justify-between ease-in-out duration-300 scale-0" +
            (selectedChannel != null ? "scale-100" : " ")
          }
        >
          <span className="flex flex-row">
            <span className="relative flex mr-2">
              <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>

              {statusBubble(UserStatus.online)}

              <Image
                src={
                  "/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-" +
                  (selectedChannel == null
                    ? ""
                    : testFriends[selectedChannel].systemAvatar) +
                  ".svg"
                }
                alt="profile"
                width={50}
                height={50}
              />
            </span>

            <span className="flex flex-col">
              <span className="text-sm text-black font-bold">
                {selectedChannel == null
                  ? ""
                  : testFriends[selectedChannel].name}{" "}
              </span>

              <span className={"text-xs text-gray-300"}>
                {selectedChannel == null
                  ? ""
                  : testFriends[selectedChannel].role}
              </span>
            </span>
          </span>

          {/* shortcuts */}
          <span className="flex flex-row space-x-3">
            <span className="rounded-lg p-2 ml-auto bg-gray-400 shadow-lg w-10 h-10 text-center animate-pulse">
              <span className="text-white text-sm font-bold">R</span>
            </span>
            <span className="rounded-lg p-2 ml-auto bg-gray-400 shadow-lg w-20 h-10 text-center animate-pulse">
              <span className="text-white text-sm font-bold">SPACE</span>
            </span>
          </span>
        </section>
      </div>
    </>
  );
}
