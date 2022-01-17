import React, { useEffect, useState } from "react";

import { FaAngleDown, FaBell, FaClock, FaPlus, FaLink } from "react-icons/fa";
import { IoTimer } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import CreateRoom from "../Modals/CreateRoom";
import {
  ShowModalType,
  useKeyboardContext,
} from "../../contexts/keyboardContext";

enum RoomTypeFilter {
  all = "all",
  live = "live",
  scheduled = "scheduled",
  recurring = "recurring",
  expired = "expired",
}

enum RoomTimeFilter {
  today = "today",
  week = "week",
  month = "month",
}

export default function DashboardRoom() {
  const { handleModalType } = useKeyboardContext();

  // get rooms data realtime
  useEffect(() => {
    /**
     * QUERY:
     * all rooms in the past week
     *
     */
  });

  // on CTRL + Q, new tab to google meet
  // on CTRL + V, show modal to create meeting with the link

  return (
    <section className="p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md">
      {/*  modal for creating room */}
      <CreateRoom />

      {/* header */}
      <span className="flex flex-row justify-end space-x-3 pb-5 items-center">
        <span className="text-white mr-auto">
          ROOMS
          <button
            className="right-1 rounded-lg py-1 px-2 ml-1 
              shadow-md text-center text-white text-sm font-bold"
          >
            CTRL + Q
          </button>
        </span>

        {/* tab pane */}
        <span className="flex flex-row space-x-5 uppercase mr-5">
          <span className="underline underline-offset-8 decoration-white text-white hover:text-white hover:cursor-pointer">
            All
          </span>

          <span className="text-gray-300 hover:text-white hover:cursor-pointer">
            Me
          </span>

          <span className="text-gray-300 hover:text-white hover:cursor-pointer">
            Now
          </span>

          <span className="text-gray-300 hover:text-white hover:cursor-pointer">
            Scheduled
          </span>

          <span className="text-gray-300 hover:text-white hover:cursor-pointer">
            Recurring
          </span>

          <span className="text-gray-300 hover:text-white hover:cursor-pointer">
            Archive
          </span>
        </span>

        <span className="text-sm text-gray-300 flex flex-row items-center uppercase">
          Week <FaAngleDown />
        </span>

        <button
          onClick={() => handleModalType(ShowModalType.createRoom)}
          className="bg-gray-300 bg-opacity-25 p-2 rounded hover:bg-opacity-40"
        >
          <FaPlus className="text-lg text-white" />
        </button>

        <BsThreeDots className="text-xl text-white" />
      </span>

      {/* all rooms */}
      <span className="flex flex-row flex-wrap max-h-96 overflow-auto">
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
            <span className="text-xs text-gray-400">Arjun and Liam</span>
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
                lets finish the mockups @josh, @mark, and @arjun please step in
                for feedback
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
            <BsThreeDots className="text-white ml-2 hover:cursor-pointer" />{" "}
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
  );
}
