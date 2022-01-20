import Head from "next/head";
import Image from "next/image";
import {
  FaSlackHash,
  FaNewspaper,
  FaCalendarAlt,
  FaThList,
} from "react-icons/fa";

import MainLogo from "../components/MainLogo";

export default function Home() {
  return (
    <div className="landing-page-bg h-screen w-screen bg-left-bottom bg-fixed">
      <div className="container mx-auto backdrop-blur-sm xl:px-52">
        {/* header */}
        <div className="flex flex-row py-5 px-5 items-center justify-start mx-auto">
          <MainLogo className="mr-auto text-3xl" />
          <span className="flex flex-row space-x-5 items-center">
            <span className="font-bold underline decoration-slate-400 underline-offset-4">
              Home
            </span>
            <span className="text-gray-300">Features</span>
            <span className="text-gray-300 border-r-2 pr-5">Pricing</span>
            <span className="ml-auto text-gray-300 mr-5">Log In</span>
            <button className="rounded bg-teal-600 p-2 text-white shadow-lg">
              Get Demo
            </button>
          </span>
        </div>

        <div className="flex flex-col justify-start items-baseline md:mt-20 container">
          <span className="flex flex-row text-left text-6xl space-x-5 h-[5rem] overflow-hidden">
            <span className="font-semibold text-black py-4">Less</span>
            <span className="flippingWords flex flex-col space-y-5 text-red-600 ">
              <span className="flex flex-row space-x-2">
                <FaThList /> <span>threads</span>
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
                <FaThList /> <span>threads</span>
              </span>
            </span>
          </span>

          <span className="flex flex-row text-left text-6xl space-x-5">
            <span className="font-semibold text-black">More</span>
            <span className="text-sky-600 font-bold">work.</span>
          </span>
        </div>
      </div>
    </div>
  );
}
