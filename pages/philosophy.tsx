import { Divider } from "antd";
import { useRouter } from "next/router";
import { FaAngleRight } from "react-icons/fa";
import Rooms from "../components/demo/Rooms";

export default function Philosophy() {
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
    <>
      {/* main mission */}
      <div className="mx-auto flex flex-col items-start max-w-screen-sm rounded-lg bg-gray-200 bg-opacity-25 backdrop-blur-xl md:mt-[15rem] mt-[5rem] p-10">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Philosophy
        </span>

        <span className="text-left text-lg mb-5 text-gray-700">
          In today&apos;s distracted world, we mistake adding software and tools
          for productivity.
        </span>

        <span className="text-left text-lg text-gray-700">
          At Nirvana, we are bringing work back to the basics. Voice first
          communication because voice makes us human and less is more. An
          experience as if your team was right next to you.
        </span>

        <></>
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

          <span className="text-left text-md text-gray-600">
            Join Ben and Cathy&apos;s conversation to review design mockups or
            jump into another room for wine Wednesdays!
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
        <span className="text-xl mb-10 font-semibold text-gray-500">
          Ready to start working?
        </span>
        {getStartedButton}
      </div>
    </>
  );
}
