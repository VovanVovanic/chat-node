import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./authReducer";

const initState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  error: '',
  isAuth: false
};


export const AuthContext = createContext(initState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initState);

  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};