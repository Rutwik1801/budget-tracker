import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useEffect, useReducer, useState } from "react";
import { scheduleTokenRefresh } from "../utils/rest";


const initialAuthState = {
  isLoggedIn: false,
  userCredentials: {
    idToken: "",
    localId: "",
    refreshToken: ""
  }
}

export const AuthContext = createContext(initialAuthState);

export const authReducer = (state: any, action: { type: any; payload?: any; }) => {
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
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

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
    let id: any = null;
    const tokenRefresh = async () => {
      const userData = await AsyncStorage.getItem("userData")
       id = await scheduleTokenRefresh(JSON.parse(userData as string)?.refreshToken);
    }
    tokenRefresh();
    () => clearTimeout(id);
  }, [])
  const logout = async () => {
    await AsyncStorage.removeItem("userData")
    dispatch({ type: "LOGOUT" });
  }
  const login = async (userData: any) => {
    await AsyncStorage.setItem("userData", JSON.stringify(userData))
    dispatch({ type: "LOGIN", payload: userData });
  }
  const signup = async (userData: any) => {
    await AsyncStorage.setItem("userData", JSON.stringify(userData))
    dispatch({ type: "SIGNUP", payload: userData });
  }
  const value = {
    isLoggedIn: authState?.isLoggedIn,
    userCredentials: authState?.userCredentials,
    logout,
    login,
    signup
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}