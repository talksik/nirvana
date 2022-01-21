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
import VoiceLineConceptDemo from "../components/demo/VoiceLineConceptDemo";

import MainLogo from "../components/MainLogo";
import { Divider } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import SkeletonLoader from "../components/Loading/skeletonLoader";

export default function Home() {
  const handleGetDemo = () => {
    window.open("https://calendly.com/usenirvana/30min", "_blank");
  };

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const getStartedButton = (
    <button
      onClick={handleGetDemo}
      className="rounded font-semibold bg-teal-600 p-2 text-white shadow-lg flex flex-row items-center space-x-2"
    >
      <span>Get Demo</span>
      <FaAngleRight />
    </button>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  function handleLogin() {
    setLoading(true);
    router.push("/teams");
  }

  return (
    <div className="landing-page-bg bg-left-bottom bg-fixed bg-cover bg-no-repeat">
      <div className="container mx-auto md:pb-10 px-5">
        {/* header */}
        <div className="flex flex-row py-5 px-5 items-center justify-start mx-auto">
          <MainLogo className="mr-auto text-3xl" />
          <span className="flex flex-row space-x-5 items-center">
            {/* <span className="text-gray-700 underline underline-offset-4">
              Home
            </span>
            <span className="text-gray-500  border-r-gray-400 border-r-2 pr-5">
              Philosophy
            </span> */}
            <button
              onClick={handleLogin}
              className="ml-auto text-gray-500 mr-2 hidden md:block"
            >
              Log In
            </button>

            {getStartedButton}
          </span>
        </div>

        {/* above fold main */}
        <div className="flex flex-row flex-wrap md:flex-nowrap md:mt-20">
          <span className="flex flex-col max-w-screen-sm justify-start items-baseline backdrop-blur-xl rounded-lg">
            <span className="flex flex-row text-left md:text-6xl text-5xl space-x-5 h-[5rem] overflow-hidden">
              <span className="font-semibold text-black py-4">No</span>
              <span className="md:hidden flex flex-row space-x-2 py-4 text-red-600">
                <FaSlackHash /> <span>slacking</span>
              </span>
              <span className="hidden flippingWords md:visible md:flex flex-col space-y-5 text-red-600 ">
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

            <span className="flex flex-row text-left md:text-6xl text-5xl space-x-5">
              <span className="font-semibold text-black">More</span>
              <span className="text-sky-600 font-bold">focus.</span>
            </span>

            <span className="my-10 text-md text-xl max-w-xl text-gray-600">
              Voice-first collaboration tool for scrum/agile teams.
              <br></br>
              Skip slack and email, just talk to your team.
            </span>

            <span className="flex flex-row space-x-2">
              <button
                onClick={() =>
                  window.open(
                    "mailto:usenirvana@gmail.com?subject=Interested in Nirvana for Startups",
                    "_blank"
                  )
                }
                className="rounded text-teal-600 p-2 shadow-l flex flex-row items-center space-x-2"
              >
                Email Us
              </button>
              {getStartedButton}
            </span>
          </span>

          <span className="flex flex-row relative items-baseline flex-1 md:block hidden">
            <VoiceLineConceptDemo />
          </span>
        </div>

        {/* main mission */}
        <div className="mx-auto flex flex-col items-start max-w-screen-sm rounded-lg bg-gray-200 bg-opacity-25 backdrop-blur-xl md:mt-[40rem] mt-[5rem] p-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Philosophy
          </span>

          <span className="text-left text-lg mb-5 text-gray-700">
            In today&apos;s distracted world, we mistake adding software and
            tools for productivity.
          </span>

          <span className="text-left text-lg text-gray-700">
            At Nirvana, we are bringing work back to the basics. Voice first
            communication because voice makes us human and less is more. An
            experience as if your team was right next to you.
          </span>

          <></>
        </div>

        {/* action section */}
        <div className="flex flex-col items-center mx-auto max-w-screen-sm backdrop-blur-xl rounded-lg p-10">
          <span className="text-xl mb-10 font-semibold text-gray-500">
            Ready to start working?
          </span>
          {getStartedButton}
        </div>
      </div>
    </div>
  );
}
