import Head from "next/head";
import Image from "next/image";
import {
  FaSlackHash,
  FaNewspaper,
  FaCalendarAlt,
  FaRocketchat,
  FaAngleRight,
  FaCheck,
  FaInfo,
  FaInfoCircle,
} from "react-icons/fa";
import TeamVoiceLine from "../components/demo/TeamVoiceLine";
import Announcements from "../components/demo/Announcements";
import Rooms from "../components/demo/Rooms";
import VoiceLineConceptDemo from "../components/demo/VoiceLineConceptDemo";

import MainLogo from "../components/MainLogo";
import { Divider, Tooltip } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import SkeletonLoader from "../components/Loading/skeletonLoader";
import { useAuth } from "../contexts/authContext";

export default function Home() {
  const { currUser } = useAuth();

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
      <div className="container mx-auto md:pb-10 px-5 lg:px-20">
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

            {currUser ? (
              <>
                <span className="text-gray-500">Welcome back!</span>
                <button
                  onClick={() => window.open("/teams", "_self")}
                  className="rounded font-semibold bg-gray-200 p-2 text-teal-600 shadow-lg flex flex-row items-center space-x-2"
                >
                  Continue
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="ml-auto text-gray-500  hidden md:block"
                >
                  Log In
                </button>

                <button
                  onClick={handleLogin}
                  className="rounded font-semibold bg-gray-200 p-2 text-teal-600 shadow-lg flex flex-row items-center space-x-2"
                >
                  <span>Sign Up</span>
                </button>
              </>
            )}

            {getStartedButton}
          </span>
        </div>

        {/* above fold main */}
        <span className="flex flex-col justify-evenly items-center backdrop-blur-xl rounded-lg p-5">
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

          <span className="my-10 text-xl text-center text-gray-600 w-max">
            Minimal, voice-only collaboration tool for scrum/agile teams.
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

        <span className="flex w-full justify-evenly">
          <img
            src="/screenshots/frame_safari_dark.png"
            className="h-[80rem] w-[85rem]"
          />
        </span>

        <span className="flex flex-row py-32">
          <span className="flex flex-col grow max-w-sm rounded-lg bg-gray-200 bg-opacity-25 backdrop-blur-xl p-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              VOICE LINE
            </span>

            <span className="text-left text-3xl text-gray-700 font-bold">
              Move 10x faster.
            </span>

            <span className="text-left text-lg text-gray-700"></span>

            <Divider />

            {/* checkmarks of value add */}
            <span className="flex flex-row items-center space-x-2">
              <FaCheck className="text-teal-500" />
              <span className="text-left text-lg text-gray-600">
                {"Asynchronous."}
              </span>
              <Tooltip
                title={
                  "If you send a voice clip to someone, and they are online, they hear you instantly without changing tabs/windows."
                }
              >
                <FaInfoCircle className="text-lg text-teal-500 animate-bounce" />
              </Tooltip>
            </span>

            <span className="flex flex-row items-center space-x-2">
              <FaCheck className="text-teal-500" />
              <span className="text-left text-lg text-gray-600">
                {"NO low-quality chatter."}
              </span>
            </span>

            <span className="flex flex-row items-center space-x-2">
              <FaCheck className="text-teal-500" />
              <span className="text-left text-lg text-gray-600">
                {"Clearer communication."}{" "}
              </span>
            </span>

            <Divider />

            <span className="text-left text-md text-gray-600">
              {
                "An experience as if your team was across the table. And it's still"
              }
              <span className="text-teal-600"> asynchronous.</span>
            </span>
            <br></br>
            <span className="text-left text-md text-gray-600">
              No more days of{" "}
              <span className="text-orange-500">back and forth texting</span>{" "}
              for complex, technical issues.
            </span>
          </span>

          <span className="flex flex-row justify-end relative items-baseline flex-1 md:flex hidden">
            <VoiceLineConceptDemo />
          </span>
        </span>

        <span className="flex flex-row py-20">
          <span className="text-left flex flex-col grow max-w-md rounded-lg bg-gray-200 bg-opacity-25 backdrop-blur-xl p-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              TEAM
            </span>

            <span className="text-3xl text-gray-700 font-bold">
              Bond & Collaborate Better.
            </span>

            <span className="text-lg text-gray-700"></span>

            <Divider />

            {/* checkmarks of value add */}
            <span className="flex flex-row items-center space-x-2">
              <FaCheck className="text-teal-500" />
              <span className="text-lg text-gray-600">{"Asynchronous."}</span>
              <Tooltip
                title={
                  "If you send a voice clip to someone, and they are online, they hear you instantly without changing tabs/windows."
                }
              >
                <FaInfoCircle className="text-lg text-teal-500 animate-bounce" />
              </Tooltip>
            </span>

            <span className="flex flex-row items-center space-x-2">
              <FaCheck className="text-teal-500" />
              <span className="text-lg text-gray-600">
                {"NO low-quality chatter."}
              </span>
            </span>

            <span className="flex flex-row items-center space-x-2">
              <FaCheck className="text-teal-500" />
              <span className="text-lg text-gray-600">
                {"Clearer communication."}{" "}
              </span>
            </span>

            <Divider />

            <span className="text-md text-gray-600">
              {
                "An experience as if your team was across the table. And it's still"
              }
              <span className="text-teal-600"> asynchronous.</span>
            </span>
            <br></br>
            <span className="text-md text-gray-600">
              No more days of{" "}
              <span className="text-orange-500">back and forth texting</span>{" "}
              for complex, technical issues.
            </span>
          </span>
        </span>

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
