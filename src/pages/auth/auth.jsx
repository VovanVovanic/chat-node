import classes from "./auth.module.scss";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

export default function Auth({ button, authHandler, type }) {
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
    localStorage.setItem("user", null)
    history.push("/")
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
          <div className = {`${classes.loginBox} ${classes.goRegisterWrap}`}>
            <button
              className={`${classes.loginButton} ${classes.toRegister}`}
              onClick={goRegister}
            >
              Switch to registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
