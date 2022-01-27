import { Divider } from "antd";
import Link from "next/link";
import {
  FaAngleRight,
  FaArrowRight,
  FaMoneyBill,
  FaPhone,
} from "react-icons/fa";
import LandingPageLayout from "../components/Layouts/LandingPageLayout";

export default function Pricing() {
  return (
    <LandingPageLayout>
      <div className="flex flex-col items-center backdrop-blur-md p-10 my-36">
        <span>PRICING</span>
        <span className="text-5xl font-bold">Get Started Now,</span>
        <span className="text-5xl font-bold text-left text-teal-600 mb-2">
          Pay for Spots Later.
        </span>
        <span className="text-gray-500 mb-2">
          Hit the ground running with{" "}
          <span className="text-teal-600">2 free spots</span> on sign up.
        </span>

        <span className="p-2 rounded-lg font-bold text-left text-sm bg-purple-200 text-purple-700">
          No credit card required
        </span>

        <span className="flex flex-row items-center space-x-2 mt-10">
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

      <span className="flex flex-row justify-center space-x-5">
        {/* lite pricing */}
        <span className="flex flex-col items-start bg-white bg-opacity-40 p-10 max-w-sm rounded backdrop-blur-md w-[22rem] shadow-lg">
          <span className="flex flex-row items-center justify-between w-full">
            <span className="text-3xl font-bold">Lite</span>
            <span className="p-2 rounded-lg font-bold text-left text-sm bg-green-200 text-green-700">
              FREE
            </span>
          </span>

          <span className="text-gray-500">
            Hit the ground running with 2 free spots.
          </span>

          <button
            onClick={() => window.open("/teams/login", "_self")}
            className="mt-10 mx-auto rounded font-semibold my-2 p-2 bg-gray-200 text-teal-600 shadow-lg flex flex-row items-center justify-evenly space-x-2"
          >
            <span>Get Started</span>
            <FaAngleRight />
          </button>
          <span className="text-gray-500 text-sm text-center w-full">
            Valid for 30 days.
          </span>
        </span>

        {/* startups pricing */}
        <span className="z-10 flex flex-col items-start bg-white bg-opacity-60 p-10 max-w-sm rounded backdrop-blur-md w-[22rem] scale-125 shadow-lg">
          <span className="flex flex-row items-center justify-between w-full">
            <span className="text-3xl font-bold">Startups</span>
            <span className="p-2 rounded-lg font-bold text-left text-sm bg-sky-200 text-sky-700">
              POPULAR
            </span>
          </span>

          <span className="text-gray-500">
            Pay per spot per month based on your needs.
          </span>

          <button
            onClick={() =>
              window.open("https://calendly.com/usenirvana/30min", "_blank")
            }
            className="mx-auto mt-10 rounded font-semibold my-2 bg-teal-600 p-2 text-white shadow-lg flex flex-row items-center justify-evenly space-x-2"
          >
            <FaPhone />
            <span>Contact Sales</span>
          </button>
          <span className="text-gray-500 text-sm text-center w-full mx-auto">
            <FaMoneyBill className="inline text-xl text-emerald-500" /> 30 day
            money back guarantee.
          </span>
        </span>

        {/* business pricing */}
        <span className="flex flex-col items-start bg-white bg-opacity-40 p-10 max-w-sm rounded backdrop-blur-md w-[22rem] shadow-lg">
          <span className="flex flex-row items-center justify-between w-full">
            <span className="text-3xl font-bold">Business</span>
          </span>

          <span className="text-gray-500">
            Pay for enterprise-level features for your large-scale organization.
          </span>

          <button
            onClick={() =>
              window.open("https://calendly.com/usenirvana/30min", "_blank")
            }
            className="mx-auto mt-10 rounded font-semibold my-2 p-2 bg-gray-200 text-teal-600 shadow-lg flex flex-row items-center justify-evenly space-x-2"
          >
            <FaPhone />
            <span>Contact Sales</span>
          </button>
          <span className="text-gray-500 text-sm text-center w-full mx-auto">
            <FaMoneyBill className="inline text-xl text-emerald-500" /> 30 day
            money back guarantee.
          </span>
        </span>
      </span>
    </LandingPageLayout>
  );
}
