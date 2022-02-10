import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export default function LandingPageActionBar() {
  return (
    <span className="flex md:my-20 my-10 mx-auto md:flex-row flex-col items-center max-w-screen-md p-10 backdrop-blur-md bg-slate-50 bg-opacity-40 rounded-lg">
      <span className="flex flex-col items-start text-3xl font-bold">
        <span>Ready to Focus?</span>
        <span className="text-teal-600">{"It's now or never."}</span>
      </span>

      <span className="flex flex-row items-center space-x-5 md:ml-auto">
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
