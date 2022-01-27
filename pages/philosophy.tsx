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

      {/* action section to get started now */}
      <span className="flex my-20 mx-auto flex-row items-center max-w-screen-md p-10 backdrop-blur-md bg-gray-200 bg-opacity-40 rounded-lg">
        <span className="flex flex-col items-start text-3xl font-bold">
          <span>Ready to Focus?</span>
          <span className="text-teal-600">{"It's now or never."}</span>
        </span>

        <span className="ml-auto">{getStartedButton}</span>
      </span>
    </>
  );
}
