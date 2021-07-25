import axios from "axios";
import {
  LoginStart,
  LoginFailure,
  LoginSuccess,
  removeMessage,
} from "../context/authActions";


const login = async (email, password, dispatch) => {
  dispatch(LoginStart())
  try {
    const res = await axios.post('/auth/login', { email, password })
    
    if (!res) {
      return dispatch(LoginFailure("Something wrong"));
    }
    dispatch(LoginSuccess({ email }, res.data.message, res.data.auth));
    setTimeout(()=>{dispatch(removeMessage())},4000)
  } catch (e) {
    dispatch(LoginFailure(e.response.data.message));
  }
};

const register = async (email, password, name, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post('/auth/register', { email, password, name });
    if (!res) {
      return dispatch(LoginFailure("Something wrong"));
    }
    dispatch(LoginSuccess({ email }, res.data.message, res.data.auth));
    setTimeout(() => {
      dispatch(removeMessage());
    }, 4000);
  } catch (e) {
    dispatch(LoginFailure("Something wrong"));
  }
};



export { login, register };
