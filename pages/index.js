import Head from "next/head";
import Image from "next/image";

import MainLogo from "../components/MainLogo";

export default function Home() {
  return (
    <>
      <MainLogo className="fixed top-5 left-1/2 text-4xl" />
      <div className="container mx-auto">
        {/* header */}
        <div className="flex flex-row py-5 px-5 items-center justify-start mx-auto">
          <span className="flex flex-row space-x-5">
            <span className="font-bold underline decoration-slate-400 underline-offset-4">
              Home
            </span>
            <span className="text-gray-300">Features</span>
            <span className="text-gray-300">Pricing</span>
          </span>

          <span className="ml-auto text-gray-300 mr-5">Log In</span>
          <button className="rounded bg-teal-600 p-2 text-white shadow-lg">
            Get Demo
          </button>
        </div>

        <div className="flex flex-col justify-center items-center">
          <span></span>
        </div>
      </div>
    </>
  );
}
