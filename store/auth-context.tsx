import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useEffect, useReducer, useState } from "react";
import { scheduleTokenRefresh } from "../utils/rest";


const initialAuthState = {
  isLoggedIn: false,
  userCredentials: {}
}

export const AuthContext = createContext(initialAuthState);

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNUP':
    case "LOGIN":
      return { ...state, isLoggedIn: true, userCredentials: action.payload };
    case 'LOGOUT':
      return initialAuthState;
    default:
      return state;
  }
}

export const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {});

  useEffect(() => {
    const fetchToken = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if(userData) {
        dispatch({type: "LOGIN", payload: JSON.parse(userData)})
      }
    }
    fetchToken();
  }, [])
  useEffect(() => {
    let id = null;
    const tokenRefresh = async () => {
      const userData = await AsyncStorage.getItem("userData")
       id = await scheduleTokenRefresh(JSON.parse(userData)?.refreshToken);
    }
    tokenRefresh();
    () => clearTimeout(id);
  }, [])
  const logout = async () => {
    await AsyncStorage.removeItem("userData")
    dispatch({ type: "LOGOUT" });
  }
  const login = async (userData) => {
    await AsyncStorage.setItem("userData", JSON.stringify(userData))
    dispatch({ type: "LOGIN", payload: userData });
  }
  const signup = async (userData) => {
    await AsyncStorage.setItem("userData", JSON.stringify(userData))
    dispatch({ type: "SIGNUP", payload: userData });
  }
  const value = {
    authState,
    logout,
    login,
    signup
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}