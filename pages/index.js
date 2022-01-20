import Head from "next/head";
import Image from "next/image";
import {
  FaSlackHash,
  FaNewspaper,
  FaCalendarAlt,
  FaRocketchat,
  FaAngleRight,
} from "react-icons/fa";

import MainLogo from "../components/MainLogo";

export default function Home() {
  const handleGetDemo = () => {
    window.open("https://calendly.com/usenirvana/30min", "_blank");
  };

  return (
    <div className="landing-page-bg bg-left-bottom bg-fixed bg-cover bg-no-repeat">
      <div className="container mx-auto xl:px-52 pb-10">
        {/* header */}
        <div className="flex flex-row py-5 px-5 items-center justify-start mx-auto">
          <MainLogo className="mr-auto text-3xl" />
          <span className="flex flex-row space-x-5 items-center">
            <span className="font-bold underline decoration-slate-400 underline-offset-4">
              Home
            </span>
            <span className="text-gray-500">Features</span>
            <span className="text-gray-500 border-r-2 pr-5">Pricing</span>
            <span className="ml-auto text-gray-500 mr-5">Log In</span>
            <button
              onClick={handleGetDemo}
              className="rounded bg-teal-600 p-2 text-white shadow-l flex flex-row items-center space-x-2"
            >
              <span>Get Demo</span>
              <FaAngleRight />
            </button>
          </span>
        </div>

        <div className="flex flex-col justify-start items-baseline max-w-screen-sm md:mt-20 backdrop-blur-xl rounded-lg">
          <span className="flex flex-row text-left text-6xl space-x-5 h-[5rem] overflow-hidden">
            <span className="font-semibold text-black py-4">Less</span>
            <span className="flippingWords flex flex-col space-y-5 text-red-600 ">
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

          <span className="flex flex-row text-left text-6xl space-x-5">
            <span className="font-semibold text-black">More</span>
            <span className="text-sky-600 font-bold">work.</span>
          </span>

          <span className="my-10 text-xl max-w-xl text-gray-600">
            Minimal collaboration tool for scrum/agile teams. Wasting 80% of
            your work day on slack, teams, gmail, calendars, chats, emojis,
            notifications?
          </span>

          <span className="flex flex-row space-x-2">
            <button className="rounded text-teal-600 p-2 shadow-l flex flex-row items-center space-x-2">
              <span>Features</span>
            </button>
            <button
              onClick={handleGetDemo}
              className="rounded bg-teal-600 p-2 text-white shadow-l flex flex-row items-center space-x-2"
            >
              <span>Get Demo</span>
              <FaAngleRight />
            </button>
          </span>
        </div>

        {/* main mission */}
        <div className="mx-auto flex flex-col items-start max-w-screen-sm rounded-lg bg-gray-200 bg-opacity-25 backdrop-blur-xl md:mt-[20rem] p-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Philosophy
          </span>

          <span className="text-left text-lg mb-5 text-gray-700">
            In today's distracted world, we mistake software and tools for
            productivity.
          </span>

          <span className="text-left text-lg text-gray-700">
            At Nirvana, are bringing remote work back to the basics. Voice first
            communication because voice makes us human and less is more. An
            experience as if your team is right next to me.
          </span>

          <></>
        </div>

        <div className="mx-auto flex flex-row items-center max-w-screen-sm rounded-lg bg-gray-200 bg-opacity-25 backdrop-blur-xl mt-[10rem] p-10 pb-20">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Philosophy
          </span>
        </div>
      </div>
    </div>
  );
}
