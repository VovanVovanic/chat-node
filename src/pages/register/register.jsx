import { useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./register.module.scss";
import { useFormik } from "formik";
import { AuthContext } from "../../context/authContext";
import { register } from "../../utils/auth";


export default function Register() {
  const { dispatch } = useContext(AuthContext);

  const history = useHistory();

  const toLogin= () => {
    history.push("/");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: ""
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (values.password.length < 5) {
        errors.password = "Too Short password";
      }
      return errors;
    },

    onSubmit: (values) => {
      register(values.email, values.password, values.name, dispatch);
      formik.resetForm();
      history.push("/main");
    },
  });

  return (
    <div className={classes.login}>
      <div className={classes.loginWrapper}>
        <form className={classes.loginBox} onSubmit={formik.handleSubmit}>
          <input
            placeholder="Email"
            type="email"
            {...formik.getFieldProps("email")}
            className={classes.loginInput}
          />
          <input
            placeholder="Password"
            type="password"
            {...formik.getFieldProps("password")}
            className={classes.loginInput}
          />
          <input
            placeholder="Name"
            type="text"
            {...formik.getFieldProps("name")}
            className={classes.loginInput}
          />
          <button className={classes.loginButton} type="submit">
           Register
          </button>
          <button
            className={classes.loginRegisterButton}
            onClick={toLogin}
          >
            Go to login
          </button>
        </form>
      </div>
    </div>
  );
}
