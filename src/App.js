// import "./App.css";
// import Auth from "./pages/auth/auth";
// import axios from "axios";
// import Spinner from "./components/spinner/spinner";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect
// } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "./context/authContext";
// import Content from './pages/content/content'
// import ErrorMsg from './components/errorMsg/errorMsg'
// import {
//   LoginSuccess,
//   LoginStart,
//   LoginFailure,
//   AuthSuccess,
//   AuthFailure,
// } from "./context/authActions";

// function App() {
//   const { user, isLoading, error, isAuth, dispatch } = useContext(AuthContext);
//   const authHandler = (data) => {
//     dispatch(LoginStart());
//     axios
//       .post("/users/login", data)
//       .then((res) => {
//         if (res.status === 203) {
//         const user = JSON.parse(localStorage.getItem("user")) || null;
//         return dispatch(AuthFailure(res.data, user));
        
//       }
//         // dispatch(AuthSuccess(res.data));
//         console.log(res)
//       })
//       .catch((e) => {
//         dispatch(LoginFailure(e.response.data));
//       });
//   };

//   const regHandler = (data) => {
//     dispatch(LoginStart());
//     axios
//       .post("/users/register", data)
//       .then((res) => {
//         if (res.status === 203) {
//           return dispatch(LoginFailure(res.data));
//         }
//         const data = {
//           name: res.data.user.username,
//           token: res.data.token,
//         };
//         dispatch(LoginSuccess(data));
//       })
//       .catch((e) => {
//         dispatch(LoginFailure("Server Error"));
//       });
//   };
  
//   return (
//     <div className="App">
//       <ErrorMsg error={error}/>
//       <Router>
//         {isLoading ? (
//           <Spinner />
//         ) : (
//           <Switch>
//             <Route exact path={"/"}>
//               {user ? (
//                   <Redirect to = '/login' />
//               ) : (
//                 <Redirect to ="/register" />
//               )}
//               </Route>
//               <Route path="/login" >
//                {user ?  <Content isAuth={isAuth} authHandler={authHandler}/> : <Redirect to = "/" />}
//               </Route>
//               <Route path='/register' >
//                 <>
//                   {user ? <Redirect to="/" /> : <Auth button={"Register"} authHandler={regHandler} type="register" loginHandler={authHandler}/>}
//                 </>
//               </Route>
//           </Switch>
//         )}
//       </Router>
//     </div>
//   );
// }

// export default App;

import React, {useState, useEffect} from 'react'
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import axios from 'axios'
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
  const [conversations, setConversations] = useState([]);
  const { user } = useContext(AuthContext);
    useEffect(() => {
      const getConversations = async () => {
        try {
          const res = await axios.get("/conversations/" + user._id);
          console.log(res.data)
          setConversations(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getConversations();
    }, []);
  
  
  


  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Login /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/main" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/main">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;