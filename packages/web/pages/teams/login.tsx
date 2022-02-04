import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRecoilState } from "recoil";
import MainLogo from "../../components/Logo/MainLogo";
import { useAuth } from "../../contexts/authContext";

const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

export default function Login() {
  const { currUser } = useAuth();

  const router = useRouter();

  const signInGoogle = () => {
    return signInWithPopup(auth, googleProvider)
      .then((res) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(res);

        const token = credential?.accessToken;
        // The signed-in user info.
        const user = res.user;

        // todo : don't need this?
        // setCurrUser(new UserData(user));

        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
        toast.error("something went wrong");
      });
  };

  useEffect(() => {
    // if auth, go to dashboard
    if (currUser) {
      console.log("already logged in, redirecting to router");
      router.push("/s");
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
