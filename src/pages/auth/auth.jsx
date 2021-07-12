import classes from "./auth.module.scss";
import { useFormik } from "formik";

export default function Auth({ button, authHandler }) {
  

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit(data) {
      authHandler(data)
      formik.resetForm();
    }
  })
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
      </div>
    </div>
  );
}
