const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: "",
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isLoading: false,
        error: action.payload,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: "",
        isAuth: true,
      };
    case "AUTH_FAILURE":
      return {
        ...state,
        user: action.user,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default AuthReducer;
