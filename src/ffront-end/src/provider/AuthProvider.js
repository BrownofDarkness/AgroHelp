import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("X");

  useEffect(() => {
    (async () => {
      const _user = await AsyncStorage.getItem("user");
      if (_user) {
        setUser(JSON.parse(_user));
      }
      const _token = await AsyncStorage.getItem("token");
      if (_token) {
        setToken(_token);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (user) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
      }
      if (token) {
        await AsyncStorage.setItem("token", JSON.stringify(token));
      }
    })();
  }, [user, token]);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
