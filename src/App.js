import "./App.css";
import Auth from "./pages/auth/auth";
import axios from "axios";
import Spinner from "./components/spinner/spinner";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Content from './pages/content/content'
import ErrorMsg from './components/errorMsg/errorMsg'
import {
  LoginSuccess,
  LoginStart,
  LoginFailure,
  AuthSuccess,
  AuthFailure,
} from "./context/authActions";

function App() {
  const { user, isLoading, error, isAuth, dispatch } = useContext(AuthContext);
console.log(user, error);
  const authHandler = (data) => {
    dispatch(LoginStart());
    axios
      .post("/users/login", data)
      .then((res) => {
        if (res.status === 203) {
        const user = JSON.parse(localStorage.getItem("user")) || null;
        return dispatch(AuthFailure(res.data, user));
        
      }
        const data = {
          name: res.data.user.username,
          token: res.data.token,
        };
        dispatch(AuthSuccess(data));
      })
      .catch((e) => {
        dispatch(LoginFailure(e.response.data));
      });
  };

  const regHandler = (data) => {
    dispatch(LoginStart());
    axios
      .post("/users/register", data)
      .then((res) => {
        if (res.status === 203) {
          return dispatch(LoginFailure(res.data));
        }
        const data = {
          name: res.data.user.username,
          token: res.data.token,
        };
        dispatch(LoginSuccess(data));
      })
      .catch((e) => {
        dispatch(LoginFailure("Server Error"));
      });
  };
  
  return (
    <div className="App">
      <ErrorMsg error={error}/>
      <Router>
        {isLoading ? (
          <Spinner />
        ) : (
          <Switch>
            <Route exact path={"/"}>
              {user ? (
                  <Redirect to = '/login' />
              ) : (
                <Redirect to ="/register" />
              )}
              </Route>
              <Route path="/login" >
               {user ?  <Content isAuth={isAuth} authHandler={authHandler}/> : <Redirect to = "/" />}
              </Route>
              <Route path='/register' >
                <>
                  {user ? <Redirect to = "/" /> : <Auth button={"Register"} authHandler={regHandler} type="Register" />}
                </>
              </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
