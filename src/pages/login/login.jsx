import { useContext } from "react";
import { useHistory} from "react-router-dom";
import classes from './login.module.scss'
import {useFormik} from 'formik'
import { AuthContext } from "../../context/authContext";
import {login} from '../../utils/auth'
export default function Login() {
const{dispatch} = useContext(AuthContext)

  const history = useHistory()
  
  const toRegistration = () => {
    history.push('/register')
  }

    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validate: (values) => {
        const errors= {};
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
        login(values.email, values.password, dispatch);
        formik.resetForm();
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
          <button className={classes.loginButton} type="submit">
            Log In
          </button>
          <button
            className={classes.loginRegisterButton}
            onClick={toRegistration}
          >
            Create a New Account
          </button>
        </form>
      </div>
    </div>
  );
}
