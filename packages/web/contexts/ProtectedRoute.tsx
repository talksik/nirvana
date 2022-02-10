import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAuth } from "./authContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { currUser } = useAuth();

  // figure out what content to render from here
  const router = useRouter();

  // useEffect(() => {}, []);

  if (!currUser) {
    console.log("not authenticated...routing from dashboard to teams home");
    toast.error("Not Authenticated");
    router.push("/teams/login");
    return <></>;
  }

  return <>{currUser && children}</>;
}
