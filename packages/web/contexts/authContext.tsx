import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import firebaseApp from "../services/firebaseService";
import cookie from "js-cookie";
import { useSetRecoilState } from "recoil";

interface ContextInterface {
  currUser: FirebaseUser | null;
}

const AuthContext = React.createContext<ContextInterface>(
  {} as ContextInterface
);
const auth = getAuth(firebaseApp);

export function AuthProvider({ children }) {
  const [currUser, setCurrUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: FirebaseUser) => {
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

  const value: ContextInterface = {
    currUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
