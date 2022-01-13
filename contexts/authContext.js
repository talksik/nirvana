import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, User } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import firebase from '../services/firebase'

const AuthContext = React.createContext(null);
const googleProvider = new GoogleAuthProvider()

const auth = getAuth();

export function AuthProvider({ children }) {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setLoading(false)

      console.log(user)

      // will be null or the firebase logged in user
      setCurrUser(user)
    });

    return unsubscribe
  }, [])

  const signInGoogle = () => {
    signInWithPopup(auth, googleProvider).then((res) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      setCurrUser(user)

      console.log(user)      
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error)
    })
  }

  const signOut = () => {
    console.log('logging user out')
    
    signOut(auth).then(() => {
      // Sign-out successful.      
      console.log("signed out fine, redirecting to proper place")

      router.push('/')
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }

  const value = {
    currUser,
    signInGoogle,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// custom hook to use the authUserContext and access currUser
export function useAuth() {
  return useContext(AuthContext)
}