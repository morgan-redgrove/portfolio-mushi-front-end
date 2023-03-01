import React, { createContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      console.log("hello " + user.displayName);
    } else {
      setUser(null);
      console.log("logged out");
    }
  });

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
