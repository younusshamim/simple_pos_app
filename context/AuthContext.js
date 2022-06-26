import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [userActive, setUserActive] = useState(false);
  const router = useRouter();

  const login = (email, password) => {
    if (email === "younus@gmail.com" && password === "123456") {
      setUserActive(true);
      router.push("/");
    } else {
      setUserActive(false);
    }
  };

  return (
    <AuthContext.Provider value={{ userActive, login }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContextProvider, useAuthContext };
