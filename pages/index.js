import Head from "next/head";
import Image from "next/image";

import MainLogo from "../components/MainLogo";

export default function Home() {
  return (
    <div className="landing-page-bg h-screen w-screen bg-left bg-cover">
      <div className="container mx-auto ">
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

        <div className="flex flex-col justify-start p-10">
          <span className="text-5xl text-slate-600 font-semibold">
            No more slacking
          </span>
        </div>
      </div>
    </div>
  );
}
