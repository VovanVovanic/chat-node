import React, { useState, useEffect } from "react";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Main from "./pages/main/main";
import MessageSnackbar from './components/messageSnackbar/messageSnackBar'
import ErrorSnackbar from "./components/errorSnackbar/errorSnackbar";

function App() {
  const { isAuth, message, error, isFetching } = useContext(AuthContext);
  console.log(message)


  return (
    <div>
      <MessageSnackbar message={message} />
      <ErrorSnackbar message={error} />
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/main">
            {isAuth ? <div>logged</div> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
