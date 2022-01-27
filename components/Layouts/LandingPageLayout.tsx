import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { useAuth } from "../../contexts/authContext";
import MainLogo from "../MainLogo";

enum LandingPageNavigation {
  product = "/",
  features = "/features",
  pricing = "/pricing",
  philosophy = "/philosophy",
}

export default function LangingPageLayout({ children }) {
  const { currUser } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const currPage = router.pathname;
  console.log(currPage);

  function handleLogin() {
    setLoading(true);
    router.push("/teams");
  }

  const handleGetDemo = () => {
    window.open("https://calendly.com/usenirvana/30min", "_blank");
  };
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
    <div className="landing-page-bg bg-left-bottom bg-fixed bg-cover bg-no-repeat min-h-screen">
      <div className="container mx-auto px-5 lg:px-20 ">
        {/* header */}
        <div className="flex flex-row py-5 px-5 items-center justify-start mx-auto">
          <MainLogo className="mr-auto text-3xl" />
          <span className="flex flex-row space-x-5 items-center">
            <span
              onClick={() =>
                window.open(LandingPageNavigation.product, "_self")
              }
              className={`text-gray-500 hover:text-teal-600 hover:cursor-pointer ${
                currPage == LandingPageNavigation.product
                  ? "text-teal-600 underline underline-offset-4"
                  : ""
              }`}
            >
              Product
            </span>

            <a
              href={LandingPageNavigation.features}
              className={`text-gray-500 hover:text-teal-600 hover:cursor-pointer ${
                currPage == LandingPageNavigation.features
                  ? "text-teal-600 underline underline-offset-4"
                  : ""
              }`}
            >
              Features
            </a>

            <a
              href={LandingPageNavigation.pricing}
              className={`text-gray-500 hover:text-teal-600 hover:cursor-pointer ${
                currPage == LandingPageNavigation.pricing
                  ? "text-teal-600 underline underline-offset-4"
                  : ""
              }`}
            >
              Pricing
            </a>
            <a
              href={LandingPageNavigation.philosophy}
              className={`text-gray-500 border-r-gray-400 border-r-2 pr-5 hover:text-teal-600 hover:cursor-pointer ${
                currPage == LandingPageNavigation.philosophy
                  ? "text-teal-600 underline underline-offset-4"
                  : ""
              }`}
            >
              Philosophy
            </a>

            {currUser ? (
              <>
                <span className="text-gray-500">Welcome back!</span>
                <button
                  onClick={() => window.open("/teams", "_self")}
                  className="rounded font-semibold bg-gray-200 p-2 text-teal-600 shadow-lg flex flex-row items-center space-x-2"
                >
                  Continue
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="ml-auto text-gray-500  hidden md:block"
                >
                  Log In
                </button>

                <button
                  onClick={handleLogin}
                  className="rounded font-semibold bg-gray-200 p-2 text-teal-600 shadow-lg flex flex-row items-center space-x-2"
                >
                  <span>Sign Up</span>
                </button>
              </>
            )}

            {getStartedButton}
          </span>
        </div>

        {children}
      </div>
    </div>
  );
}
