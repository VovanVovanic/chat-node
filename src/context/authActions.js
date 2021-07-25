export const LoginStart = () => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user, message, auth) => ({
  type: "LOGIN_SUCCESS",
  user,
  message,
  auth
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  error
});

export const AuthSuccess = (user) => ({
  type: "AUTH_SUCCESS",
  payload: user
});

export const AuthFailure = (error, user) => ({
  type: "AUTH_FAILURE",
  error,
  user
});

export const removeMessage = () => ({
  type: "REMOVE_MESSAGE"
})