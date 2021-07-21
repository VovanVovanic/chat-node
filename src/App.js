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

function App() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    console.log(u);
    axios
      .post("/auth/auth", u)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/main">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
