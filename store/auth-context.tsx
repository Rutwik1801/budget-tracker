import { createContext, PropsWithChildren, useReducer, useState } from "react";


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

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  }
  const login = (userData) => {
    dispatch({ type: "LOGIN", payload: userData });
  }
  const signup = (userData) => {
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