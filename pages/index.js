import Head from "next/head";
import Image from "next/image";
import {
  FaSlackHash,
  FaNewspaper,
  FaCalendarAlt,
  FaRocketchat,
  FaAngleRight,
} from "react-icons/fa";
import TeamVoiceLine from "../components/demo/TeamVoiceLine";
import Announcements from "../components/demo/Announcements";
import Rooms from "../components/demo/Rooms";

import MainLogo from "../components/MainLogo";
import { Divider } from "antd";
import { useRouter } from "next/router";

export default function Home() {
  const handleGetDemo = () => {
    window.open("https://calendly.com/usenirvana/30min", "_blank");
  };

  const router = useRouter();

  const getStartedButton = (
    <button
      onClick={handleGetDemo}
      className="rounded font-semibold bg-teal-600 p-2 text-white shadow-lg flex flex-row items-center space-x-2"
    >
      <span>Get Demo</span>
      <FaAngleRight />
    </button>
  );

  return (
    <div className="landing-page-bg bg-left-bottom bg-fixed bg-cover bg-no-repeat">
      <div className="container mx-auto md:pb-10 px-5">
        {/* header */}
        <div className="flex flex-row py-5 px-5 items-center justify-start mx-auto">
          <MainLogo className="mr-auto text-3xl" />
          <span className="flex flex-row space-x-5 items-center">
            <button
              onClick={() => router.push("/teams")}
              className="ml-auto text-gray-500 mr-2"
            >
              Log In
            </button>
            {getStartedButton}
          </span>
        </div>

        <div className="flex flex-col justify-start items-baseline max-w-screen-sm md:mt-20 backdrop-blur-xl rounded-lg">
          <span className="flex flex-row text-left md:text-6xl text-3xl space-x-5 h-[5rem] overflow-hidden">
            <span className="font-semibold text-black py-4">Less</span>
            <span className="md:hidden flex flex-row space-x-2 py-4 text-red-600">
              <FaSlackHash /> <span>slacking</span>
            </span>
            <span className="md:flippingWords hidden md:flex flex-col space-y-5 text-red-600 ">
              <span className="flex flex-row space-x-2">
                <FaRocketchat /> <span>threads</span>
              </span>
              <span className="flex flex-row space-x-2">
                <FaSlackHash /> <span>slacking</span>
              </span>
              <span className="flex flex-row space-x-2">
                <FaCalendarAlt /> <span>calendars</span>
              </span>
              <span className="flex flex-row space-x-2">
                <FaNewspaper /> <span>files</span>
              </span>
              <span className="flex flex-row space-x-2">
                <FaRocketchat /> <span>threads</span>
              </span>
            </span>
          </span>

          <span className="flex flex-row text-left md:text-6xl text-3xl space-x-5">
            <span className="font-semibold text-black">More</span>
            <span className="text-sky-600 font-bold">work.</span>
          </span>

          <span className="my-10 text-md  md:text-xl max-w-xl text-gray-600">
            Minimal collaboration tool for scrum/agile teams. Wasting 80% of
            your work day on slack, teams, gmail, calendars, chats, emojis,
            notifications?
          </span>

          <span className="flex flex-row space-x-2">
            <a
              href="mailto:usenirvana@gmail.com?subject=Interested in Nirvana for Startups"
              className="rounded text-teal-600 p-2 shadow-l flex flex-row items-center space-x-2"
            >
              Email Us
            </a>
            {getStartedButton}
          </span>
        </div>

        {/* main mission */}
        <div className="mx-auto flex flex-col items-start max-w-screen-sm rounded-lg bg-gray-200 bg-opacity-25 backdrop-blur-xl md:mt-[15rem] mt-[5rem] p-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Philosophy
          </span>

          <span className="text-left text-lg mb-5 text-gray-700">
            In today&apos;s distracted world, we mistake using 10 software and
            tools for productivity.
          </span>

          <span className="text-left text-lg text-gray-700">
            At Nirvana, are bringing remote work back to the basics. Voice first
            communication because voice makes us human and less is more. An
            experience as if your team was right next to you.
          </span>

          <></>
        </div>

        {/*  voice line concept */}
        <div className="mx-auto flex flex-row md:flex-wrap overflow-x-scroll items-start justify-between md:mt-[15rem] mt-[5rem] pb-20">
          <span className="flex flex-col grow max-w-sm rounded-lg bg-gray-200 bg-opacity-25 backdrop-blur-xl p-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Voice Line
            </span>

            <span className="text-left text-lg text-gray-700">
              More clear and efficient communication.
            </span>

            <Divider />

            <span className="text-left text-md text-gray-600 mt-5">
              No more notifications, clicking, scrolling.
            </span>

            <span className="text-left text-md text-gray-600 mt-5">
              Listen to your engineer voice their problem realtime or have an
              asynchronous conversation.
            </span>
          </span>

          <TeamVoiceLine />

          <Announcements />
        </div>

        {/* rooms concept */}
        <div className="mx-auto flex flex-row flex-wrap items-start justify-between md:mt-[15rem] mt-[5rem]">
          <Rooms />

          <span className="flex flex-col grow max-w-sm rounded-lg bg-gray-200 bg-opacity-25 backdrop-blur-xl p-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Rooms
            </span>

            <span className="text-left text-lg text-gray-700">
              See what&apos;s going on across the hall at a glance.
            </span>

            <Divider />

            <span className="text-left text-md text-gray-600 mt-5">
              Why go back and forth through chat 100 times or schedule a meeting
              tomorrow at 2pm?
            </span>

            <span className="text-left text-md text-gray-600 mt-5">
              Jump into rooms and resolve issues quicker.
            </span>
          </span>
        </div>

        {/* action section */}
        <div className="flex flex-col items-center mx-auto max-w-screen-sm backdrop-blur-xl rounded-lg p-10">
          <span className="text-xl mb-10 font-semibold">
            Ready to start working?
          </span>
          {getStartedButton}
        </div>
      </div>
    </div>
  );
}
