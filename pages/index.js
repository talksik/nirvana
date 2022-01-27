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
  FaClock,
  FaLink,
  FaPlay,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsThreeDots } from "react-icons/bs";
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
import LangingPageLayout from "../components/Layouts/LandingPageLayout";
import Link from "next/link";

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

  return (
    <LangingPageLayout>
      {/* header text */}
      <div className="flex flex-col items-center backdrop-blur-lg p-10">
        <span className="flex flex-col items-center">
          <span className="text-5xl font-bold">
            <span className="text-teal-800">Minimal </span>
            Collaboration Tool for
          </span>

          <span className="text-5xl font-bold text-left">
            <span className="text-red-800">Messy, Distracted</span> WFH Teams.
          </span>
        </span>

        <span className="my-5 text-xl text-center text-black font-semibold w-max">
          A <span className="text-teal-600">&apos;less is more&apos;</span>{" "}
          approach to team communication.
          <br></br>
          Skip{" "}
          <img
            src="/icons/zoom-logo.svg"
            className="inline w-[4rem] h-[2rem] px-1"
          />{" "}
          fatigue,{" "}
          <img
            src="/icons/slack-logo.svg"
            className="inline w-[5rem] h-[2rem] px-1"
          />{" "}
          notifications, and{" "}
          <img
            src="/icons/gmail-logo.svg"
            className="inline w-[2rem] h-[1rem]"
          />{" "}
          threads,
          <br></br>
          and just talk to your team.
          <br></br>
          {/* Improve team focus, performance, and wellbeing. */}
        </span>

        <span className="p-2 rounded-lg font-bold text-left text-sm bg-purple-200 text-purple-700">
          No credit card required
        </span>

        <span className="flex flex-row items-center space-x-2 mt-5">
          <Link href="/features">Features</Link>

          <button
            onClick={() => window.open("/teams/login", "_self")}
            className="rounded font-semibold bg-teal-600 p-2 text-white shadow-lg flex flex-row items-center justify-evenly space-x-2"
          >
            <span>Get Started</span>
            <FaAngleRight />
          </button>
        </span>
      </div>

      <span className="flex w-full justify-evenly">
        <img
          src="/screenshots/frame_safari_dark.png"
          className="h-[80rem] w-[85rem] shrink-0"
        />
      </span>

      {/* voice line section */}
      <span className="flex flex-row py-32">
        <span className="flex flex-col grow max-w-sm rounded-lg shadow-lg bg-gray-200 bg-opacity-40 backdrop-blur-xl p-10">
          <span className="bg-clip-text font-bold text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            VOICE ONLY
          </span>

          <span className="text-left text-3xl text-gray-700 font-bold">
            Move 10x <span className="text-teal-600">Faster.</span>
          </span>
          <span className="text-sm text-gray-500">
            {"Resolve issues faster, and improve performance."}
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

          <span className="flex flex-row items-baseline space-x-2">
            <FaCheck className="text-teal-500 text-md shrink-0" />

            <span className="flex flex-col">
              <span className="flex flex-row items-center space-x-2">
                <span className="text-left text-lg text-gray-600">
                  {"Clear Communication."}
                </span>
              </span>
              <span className="text-sm text-gray-500">
                {/* {"Resolve issues faster, and improve performance."} */}
              </span>
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
            <span className="text-orange-500">back and forth texting</span> for
            complex, technical issues.
          </span>
        </span>

        <span className="flex flex-row justify-end relative items-baseline flex-1 md:flex hidden">
          <VoiceLineConceptDemo />
        </span>
      </span>

      {/* bond/team/collaborate section */}
      <span className="flex flex-row items-center py-20">
        <span className="flex-1 flex flex-row flex-wrap backdrop-blur-md p-10 rounded">
          {/* illustration of collaborating */}
          <img
            src="/illustrations/undraw_team_collaboration_re_ow29.svg"
            className="h-[20rem] shrink-0"
          />
        </span>
        {/* description text */}
        <span className="text-left flex flex-col grow max-w-lg shadow-lg rounded-lg bg-gray-200 bg-opacity-40 backdrop-blur-xl p-10">
          <span className="bg-clip-text font-bold text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            TEAM
          </span>
          <span className="text-3xl text-gray-700 font-bold">
            Bond & Collaborate{" "}
            <span className="text-teal-600">Seamlessly.</span>
          </span>
          <span className="text-lg text-gray-700"></span>
          <Divider />
          {/* checkmarks of value add */}
          <span className="flex flex-row items-baseline space-x-2">
            <FaCheck className="text-teal-500 text-md shrink-0" />

            <span className="flex flex-col">
              <span className="flex flex-row items-center space-x-2">
                <span className="text-left text-lg text-gray-600">
                  {"Spontaneous Conversations."}
                </span>
              </span>
              <span className="text-sm text-gray-500">
                {"No more 'let's find a time to discuss...'"}
              </span>
            </span>
          </span>

          <span className="flex flex-row items-baseline space-x-2">
            <FaCheck className="text-teal-500 text-md shrink-0" />

            <span className="flex flex-col">
              <span className="flex flex-row items-center space-x-2">
                <span className="text-left text-lg text-gray-600">
                  {"Cross Collaborate."}
                </span>
              </span>
              <span className="text-sm text-gray-500">
                {"Glance all of the conversations going on in your team."}
              </span>
            </span>
          </span>

          <Divider />

          <span className="text-md text-gray-600">
            Work in the{" "}
            <Tooltip
              title={
                "Nirvana voice-only rooms to hang out and code, create, ideate..."
              }
            >
              <span className="text-teal-600">
                &apos;corner&apos; office room
              </span>{" "}
              <FaInfoCircle className="text-sm text-teal-500 inline animate-bounce" />
            </Tooltip>{" "}
            with your closest teammates throughout the day.
          </span>
          <span className="text-md text-gray-600">
            Have lunch in the &apos;kitchen&apos; with your team.
          </span>
          <span className="text-md text-gray-600">
            Connect in seconds, resolve matters in minutes.
          </span>

          <br></br>
          <span className="text-center">or</span>
          <br></br>
          <span className="text-md text-gray-600">
            Create more formal meeting rooms (
            <FcGoogle className="inline" /> Meet).
            <span className="text-teal-600">
              {" "}
              Spontaneous, scheduled, or recurring.
            </span>{" "}
            All within Nirvana.
          </span>
        </span>
      </span>

      {/* focus on today section */}
      <span className="flex flex-row items-center py-20">
        {/* description card */}
        <span className="text-left flex flex-col grow max-w-lg shadow-lg rounded-lg bg-gray-200 bg-opacity-40 backdrop-blur-xl p-10">
          <span className="bg-clip-text font-bold text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            CLARITY
          </span>
          <span className="text-3xl text-gray-700 font-bold">
            Focus on <span className="text-teal-600">Right Now.</span>
          </span>
          <span className="text-lg text-gray-700"></span>

          <Divider />

          {/* checkmarks of value add */}

          <span className="flex flex-row items-baseline space-x-2">
            <FaCheck className="text-teal-500 text-md shrink-0" />

            <span className="flex flex-col">
              <span className="flex flex-row items-center space-x-2">
                <span className="text-left text-lg text-gray-600">
                  {"Overall Wellbeing."}
                </span>
              </span>
              <span className="text-sm text-gray-500"></span>
            </span>
          </span>

          <span className="flex flex-row items-baseline space-x-2">
            <FaCheck className="text-teal-500 text-md shrink-0" />

            <span className="flex flex-col">
              <span className="flex flex-row items-center space-x-2">
                <span className="text-left text-lg text-gray-600">
                  {"Clarity of Mind."}
                </span>
              </span>
              <span className="text-sm text-gray-500">
                {"Come to work seeing only what's important today/this week."}
              </span>
            </span>
          </span>

          <span className="flex flex-row items-baseline space-x-2">
            <FaCheck className="text-teal-500 text-md shrink-0" />

            <span className="flex flex-col">
              <span className="flex flex-row items-center space-x-2">
                <span className="text-left text-lg text-gray-600">
                  {"Inbox Zero."}
                </span>
              </span>
              <span className="text-sm text-gray-500">
                {
                  "Conversations are ephemeral like in real life. We keep you at inbox zero."
                }
              </span>
            </span>
          </span>

          <Divider />

          <span className="text-md text-gray-600">
            Your <span className="text-orange-500">current tools</span> bombard
            you with files, notifications, scrolling, clicking, emojis,
            threads...
          </span>

          <br></br>

          <span className="text-md text-gray-600">
            They are designed to{" "}
            <span className="text-orange-500"> addict you, </span>and keep you
            <span className="text-orange-500"> distracted.</span>
          </span>
        </span>
        <span className="flex-1 justify-evenly flex flex-row flex-wrap backdrop-blur-md p-10 rounded">
          {/* illustration of collaborating */}
          <img
            src="/illustrations/undraw_freelancer_re_irh4.svg"
            className="h-[20rem] shrink-0"
          />
        </span>
      </span>

      {/* action section to get started now */}
      <span className="flex my-20 mx-auto flex-row items-center max-w-screen-md p-10 backdrop-blur-md bg-gray-200 bg-opacity-40 rounded-lg">
        <span className="flex flex-col items-start text-3xl font-bold">
          <span>Ready to Focus?</span>
          <span className="text-teal-600">{"It's now or never."}</span>
        </span>

        <span className="ml-auto">{getStartedButton}</span>
      </span>

      {/* customer testimonial section */}
      <span className="flex my-20 mx-auto flex-col items-center max-w-screen-lg p-10 backdrop-blur-md bg-gray-200 bg-opacity-40 rounded-lg">
        <span className="text-3xl font-bold">Our Customers</span>
        <span>
          <span className="text-teal-600">Listen</span> to what they have to
          say.
        </span>

        {/* all voice testimonial cards */}
        <span className="flex flex-row items-center justify-evenly mt-5">
          <span className="p-5 flex flex-row items-center bg-white bg-opacity-20 rounded shadow-md">
            <img
              src="https://lh3.googleusercontent.com/a-/AOh14GhTB6LbOqohOA3csckho3OA976yp3lMEtl2MDzbgX0=s96-c"
              className="rounded-full shadow-md h-[3rem]"
            />
            <span className="flex flex-col ml-2 mr-10">
              <span className="text-lg">Heran Patel</span>
              <span className="text-gray-400">CEO of FinityOne</span>
            </span>

            <button className="bg-gray-500 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
              <FaPlay className="text-lg text-gray-500" />
            </button>
          </span>
        </span>
      </span>
    </LangingPageLayout>
  );
}
