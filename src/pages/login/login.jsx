import { useContext, useRef } from "react";
import { useHistory} from "react-router-dom";
import classes from './login.module.scss'
import axios from 'axios'
import { AuthContext } from "../../context/authContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);


  const history = useHistory()
  const handleClick = async (e) => {
    e.preventDefault();
    const data = {
      email: email.current.value,
      password: password.current.value,
    };
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", data);
    console.log(res);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  history.push("/main");
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
    
  };

  return (
    <div className={classes.login}>
      <div className={classes.loginWrapper}>
          <form className={classes.loginBox} onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className={classes.loginInput}
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className={classes.loginInput}
              ref={password}
            />
            <button className={classes.loginButton} type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <button className={classes.loginRegisterButton}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
      </div>
    </div>
  );
}
