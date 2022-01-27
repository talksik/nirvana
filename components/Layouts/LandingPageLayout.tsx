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

  const getStartedButton = (
    <button
      onClick={() => window.open("/teams/login", "_blank")}
      className="rounded font-semibold bg-teal-600 p-2 text-white shadow-lg flex flex-row items-center space-x-2"
    >
      <span>Get Started</span>
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

                {getStartedButton}
              </>
            )}
          </span>
        </div>

        {children}
      </div>

      {/* footer */}
      <div className="bg-black w-full p-[10rem]">
        <span className="flex flex-row items-start justify-between">
          <span className="flex flex-col">
            <MainLogo className="text-white text-3xl" />

            <span className="text-gray-200 mt-auto">&copy; nirvana</span>
            <span className="text-gray-200 flex space-x-2">
              <a
                className="text-gray-200"
                href="https://docs.google.com/document/d/1NRWN-6kDyOcADaUAQ-YWVHnz6i9ccGJ3/edit?usp=sharing&ouid=113470786690353109086&rtpof=true&sd=true"
              >
                terms and conditions
              </a>{" "}
              <span>|</span>
              <a
                className="text-gray-200"
                href="https://docs.google.com/document/d/1S3JsGqXgkriAsBOybXpVR0JJ4hiRkaNt/edit?usp=sharing&ouid=113470786690353109086&rtpof=true&sd=true"
              >
                privacy policy.
              </a>
            </span>
          </span>

          <span className="flex flex-col">
            <span className="font-bold text-white text-lg">Product</span>
          </span>

          <span className="flex flex-col">
            <span className="font-bold text-white text-lg">Resources</span>
          </span>

          <span className="flex flex-col">
            <span className="font-bold text-white text-lg">Product</span>
          </span>

          <span className="flex flex-col">
            <span className="font-bold text-white text-lg">Get in touch</span>
            <span>Questions or feedback?</span>
            <span></span>
          </span>
        </span>
      </div>
    </div>
  );
}
