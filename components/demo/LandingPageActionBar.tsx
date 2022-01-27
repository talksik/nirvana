import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export default function LandingPageActionBar() {
  return (
    <span className="flex my-20 mx-auto flex-row items-center max-w-screen-md p-10 backdrop-blur-md bg-gray-200 bg-opacity-40 rounded-lg">
      <span className="flex flex-col items-start text-3xl font-bold">
        <span>Ready to Focus?</span>
        <span className="text-teal-600">{"It's now or never."}</span>
      </span>

      <span className="flex flex-row items-center space-x-5 ml-auto">
        <Link href="/features">Features</Link>

        <button
          onClick={() => window.open("/teams/login", "_blank")}
          className="rounded font-semibold bg-teal-600 p-2 text-white shadow-lg flex flex-row items-center space-x-2"
        >
          <span>Get Started</span>
          <FaAngleRight />
        </button>
      </span>
    </span>
  );
}
