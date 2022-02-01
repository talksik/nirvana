import { Dropdown, Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaAngleRight, FaGripHorizontal } from "react-icons/fa";
import { useAuth } from "../../contexts/authContext";
import MainLogo from "../Logo/MainLogo";

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

  const mobileMenu = (
    <Menu>
      <Menu.Item key="0">
        <Link href={LandingPageNavigation.product}>Product</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link href={LandingPageNavigation.features}>Features</Link>
      </Menu.Item>

      <Menu.Item key="3">
        <Link href={LandingPageNavigation.pricing}>Pricing</Link>
      </Menu.Item>

      <Menu.Item key="4">
        <Link href={LandingPageNavigation.philosophy}>Philosophy</Link>
      </Menu.Item>

      <Menu.Divider />

      {currUser ? (
        <Menu.Item key="5">
          <button
            onClick={() => window.open("/teams", "_self")}
            className="rounded font-semibold bg-gray-200 p-2 text-teal-600 shadow-lg flex flex-row items-center space-x-2"
          >
            Continue
          </button>
        </Menu.Item>
      ) : (
        <>
          <Menu.Item key="6">
            <button onClick={handleLogin} className="ml-auto">
              Log In
            </button>
          </Menu.Item>

          <Menu.Item key="7">
            <button
              onClick={() => window.open("/teams/login", "_blank")}
              className="text-teal-600"
            >
              Get Started
            </button>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <div className="landing-page-bg bg-left-bottom bg-fixed bg-cover bg-no-repeat min-h-screen">
      <div className="container mx-auto px-5 lg:px-20 min-h-screen">
        {/* header */}
        <div className="flex flex-row py-5 px-5 items-center justify-start mx-auto">
          <MainLogo className="mr-auto text-3xl" />
          <span className="hidden md:flex flex-row space-x-5 items-center">
            <span
              onClick={() => router.push(LandingPageNavigation.product)}
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

          <Dropdown overlay={mobileMenu} trigger={["click"]}>
            <FaGripHorizontal className="md:hidden text-3xl text-teal-600" />
          </Dropdown>
        </div>

        {children}
      </div>

      {/* footer */}
      <div className="bg-black w-full lg:px-[10rem] px-[5rem] py-[5rem] ">
        <span className="flex md:flex-row md:space-x-5 space-y-5 flex-col items-start justify-between">
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

          <span className="flex flex-col items-start text-gray-200">
            <span className="font-bold text-white text-lg">Product</span>
            <Link href={"/"}>Home</Link>
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/philosophy">Philosophy</Link>
          </span>

          <span className="flex flex-col items-start text-gray-200">
            <span className="font-bold text-white text-lg">Resources</span>
            <a
              onClick={() =>
                window.open(
                  "https://www.vox.com/recode/2019/5/1/18511575/productivity-slack-google-microsoft-facebook",
                  "_blank"
                )
              }
            >
              The productivity pit: how Slack is ruining work
            </a>

            <a
              onClick={() =>
                window.open(
                  "https://www.nationalgeographic.com/science/article/coronavirus-zoom-fatigue-is-taxing-the-brain-here-is-why-that-happens",
                  "_blank"
                )
              }
            >
              ‘Zoom fatigue’ is taxing the brain. Here&apos;s why that happens
            </a>

            <a
              onClick={() =>
                window.open(
                  "https://nulab.com/blog/collaboration/work-chat-distractions-do-work-instant-messengers-make-us-more-or-less-productive/",
                  "_blank"
                )
              }
            >
              Work chat distractions: Do work instant messengers <br></br>make
              us more or less productive?
            </a>
          </span>

          <span className="flex flex-col items-start text-gray-200">
            <span className="font-bold text-white text-lg">Get in touch</span>
            <span>Questions or feedback?</span>
            <span>{"We'd love to hear from you."}</span>
            <a
              onClick={() =>
                window.open(
                  "mailto:usenirvana@gmail.com?subject=Interested in Nirvana for Startups",
                  "_blank"
                )
              }
            >
              Email Us
            </a>
          </span>
        </span>
      </div>
    </div>
  );
}
