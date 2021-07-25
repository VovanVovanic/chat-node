import { createContext, useReducer } from "react";
import AuthReducer from "./authReducer";

const initState = {
  isFetching: false,
  error: '',
  message: "",
  isAuth: false
};

export const AuthContext = createContext(initState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initState);
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