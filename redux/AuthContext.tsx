import React, { useContext, useReducer, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

// Create a context
const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState(null);

  const [userdata, setUserData] = useState();

  const pickUser = async () => {
    const value = await AsyncStorage.getItem("authUser");
    const tokenData = JSON.parse(value || {});
    let tokenvalue = tokenData.user_id;

    let response = await fetch(
      "https://www.sunshinedeliver.com/api/customer/profile/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: tokenvalue,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setUserData(responseJson.customer_detais.avatar);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    const authDataString = await AsyncStorage.getItem("authUser");

    const authData = JSON.parse(authDataString || {});

    setAuthState(authData);
  };

  // Set current auth state in AsyncStorage
  useEffect(() => {
    getAuthState();
    pickUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, userdata }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
