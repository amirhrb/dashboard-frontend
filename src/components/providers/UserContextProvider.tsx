"use client";

import React, { useState } from "react";

import { createContext } from "react";

export const UserDataContext = createContext<{
  userData: any;
  setUserData: any;
}>({ userData: null, setUserData: null });

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState(null);
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default AuthContextProvider;
