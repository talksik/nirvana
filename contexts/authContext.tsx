import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currUser, setCurrUser] = useState<null | User>(null);

  function loginSignup() {
    return 
  }

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(user => {
      // will be null or the firebase logged in user
      setCurrUser(user)
    });

    return unsubscribe
  }, [])
  


  const value = {
    currUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}