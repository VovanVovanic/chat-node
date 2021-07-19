import classes from "./auth.module.scss";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { LoginSuccess } from '../../context/authActions'
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function Auth({ button, authHandler, type, loginHandler }) {
  const {dispatch } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit(data) {
      authHandler(data, type)
      formik.resetForm();
    }
  })

  const history = useHistory()
  const goRegister = () => {
    const user = localStorage.setItem("user", null)
    dispatch(LoginSuccess(user))
    history.push("/")
  }

  const goLogin = () => {
    const data = {
      username: formik.getFieldProps("username").value,
      password: formik.getFieldProps("password").value,
    };
    loginHandler(data);
  }
  return (
    <div className={classes.login}>
      <div className={classes.loginWrapper}>
        <form className={classes.loginBox} onSubmit={formik.handleSubmit}>
          <input
            placeholder="Username"
            type="text"
            className={classes.loginInput}
            {...formik.getFieldProps("username")}
          />
          <input
            placeholder="Password"
            type="password"
            className={classes.loginInput}
            {...formik.getFieldProps("password")}
          />
          <button className={classes.loginButton} type="submit">
            {button}
          </button>
        </form>
        {type === "login" && (
          <div className={`${classes.loginBox} ${classes.goRegisterWrap}`}>
            <button
              className={`${classes.loginButton} ${classes.toRegister}`}
              onClick={goRegister}
            >
              Switch to registration
            </button>
          </div>
        )}
        {type === "register" && (
          <div className={`${classes.loginBox} ${classes.goRegisterWrap}`}>
            <button
              className={`${classes.loginButton} ${classes.toRegister}`}
              onClick={goLogin}
            >
             Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
