import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import MainLogo from "../../components/MainLogo";
import { useAuth } from "../../contexts/authContext";

export default function Login() {
  const { currUser, signInGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // if auth, go to dashboard
    if (currUser) {
      console.log("already logged in, redirecting to router");
      router.push("/teams");
    }
  }, [currUser]);

  return (
    <>
      <div className="h-screen w-screen flex flex-row">
        {/* signin modal */}
        <div className="flex-1 bg-white bg-opacity-80 p-10 rounded-lg shadow-lg flex flex-col items-start justify-start">
          {/* header */}
          <div className="text-lg flex flex-row items-center space-x-2">
            <FaArrowLeft
              className="hover:cursor-pointer"
              onClick={() => window.open("/", "_self")}
            />{" "}
          </div>

          <div className="mx-auto my-auto flex flex-col items-center">
            <button
              onClick={signInGoogle}
              className=" text-md text-sky-500 py-2 px-5 border border-gray-200 transition-all hover:bg-gray-200 rounded flex flex-row items-center space-x-2"
            >
              <FcGoogle className="text-lg" />
              <span>Continue with Google</span>
            </button>
            <span className="text-xs text-center mt-2 text-gray-300">
              By continuing, you are agreeing <br></br>
              to the{" "}
              <a href="https://docs.google.com/document/d/1NRWN-6kDyOcADaUAQ-YWVHnz6i9ccGJ3/edit?usp=sharing&ouid=113470786690353109086&rtpof=true&sd=true">
                terms and conditions
              </a>{" "}
              and{" "}
              <a href="https://docs.google.com/document/d/1S3JsGqXgkriAsBOybXpVR0JJ4hiRkaNt/edit?usp=sharing&ouid=113470786690353109086&rtpof=true&sd=true">
                privacy policy.
              </a>
            </span>
          </div>

          <span className="mx-auto flex items-center space-x-1">
            <span>&copy;</span>
            <MainLogo className=" text-2xl" />
          </span>
        </div>
        {/* nice image on right side */}
        <div
          className="hidden md:block landing-page-bg bg-cover bg-no-repeat bg-center flex-1"
          style={
            {
              // background: "url('/wallpapers/superhuman.jpg')",
            }
          }
        ></div>
      </div>
    </>
  );
}
