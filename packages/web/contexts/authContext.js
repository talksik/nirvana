import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import firebase from "../services/firebaseService";
import cookie from "js-cookie";

const AuthContext = React.createContext(null);
const googleProvider = new GoogleAuthProvider();

const auth = getAuth();

export function AuthProvider({ children }) {
  const [currUser, setCurrUser] = useState();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);

      console.log("change in auth");
      if (user) {
        setCurrUser(user);

        // set the token in the cookies for ssr verification
        const token = await user.getIdToken();
        // nookies.set(undefined, "token", token, { path: "/" });
        cookie.set("auth", token);
      } else {
        // nookies.set(undefined, "token", "", { path: "/" });
        cookie.remove("auth");

        setCurrUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInGoogle = () => {
    return signInWithPopup(auth, googleProvider)
      .then((res) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(res);

        const token = credential.accessToken;
        // The signed-in user info.
        const user = res.user;

        setCurrUser(user);

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

  const logOut = async () => {
    setLoading(true);

    console.log("logging user out");

    Promise.resolve(await signOut(auth));

    router.push("/");
  };

  const value = {
    currUser,
    signInGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// custom hook to use the authUserContext and access currUser
export function useAuth() {
  return useContext(AuthContext);
}