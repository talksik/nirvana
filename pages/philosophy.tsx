import { Divider } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaAngleRight } from "react-icons/fa";
import Rooms from "../components/demo/Rooms";
import LangingPageLayout from "../components/Layouts/LandingPageLayout";

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
    <LangingPageLayout>
      <span className="flex flex-col my-20 items-center">
        <span className="text-5xl font-bold text-center">
          We live in a <span className="text-red-800"> distracted world.</span>{" "}
          <br></br>
          <span className="text-teal-600">{"Let's fix it."}</span>
        </span>
        <span className="text-gray-500 text-lg">
          Everything starts with the philosophy.
        </span>
      </span>

      {/* main mission */}
      <div className="mx-auto flex flex-col items-start max-w-screen-sm rounded-lg bg-gray-200 bg-opacity-25 backdrop-blur-xl p-10">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Productivity is a Myth
        </span>

        <span className="text-left text-lg mb-5 text-gray-700">
          In today&apos;s world, we{" "}
          <span className="text-red-600"> mistake</span> adding software and
          tools for <span className="text-red-600">productivity.</span>
        </span>

        <span className="text-left text-lg text-gray-700 mb-5">
          At Nirvana, we are bringing work back to the basics.{" "}
          <span className="text-teal-600">Voice-only communication </span>{" "}
          because voice makes us human and less is more. An experience as if
          your team was{" "}
          <span className="text-teal-600">right next to you.</span>
        </span>

        <span className="text-left text-lg text-gray-700">
          Improve team{" "}
          <span className="text-teal-600">
            focus, performance, and wellbeing.
          </span>
        </span>

        <></>
      </div>

      {/* action section to get started now */}
      <span className="flex my-20 mx-auto flex-row items-center max-w-screen-md p-10 backdrop-blur-md bg-gray-200 bg-opacity-40 rounded-lg">
        <span className="flex flex-col items-start text-3xl font-bold">
          <span>Ready to Focus?</span>
          <span className="text-teal-600">{"It's now or never."}</span>
        </span>

        <span className="flex flex-row items-center space-x-5 ml-auto">
          <Link href="/features">Features</Link>

          {getStartedButton}
        </span>
      </span>
    </LangingPageLayout>
  );
}
