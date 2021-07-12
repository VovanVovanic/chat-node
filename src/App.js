
import './App.css';
import Auth from './pages/auth/auth'
import axios from 'axios'
import { useEffect } from 'react';

function App() {

  const authHandler = (data) => {
    axios.post('/users/register', data).then((res) => {
      const data = {
        name: res.data.user.username,
        token: res.data.token,
      };
      localStorage.setItem("data", JSON.stringify(data))
    }).catch((e) => {
      console.log(e);
    });
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    console.log(data);
  },[])
  return (
    <div className="App">
      <Auth button={"Register"} authHandler={authHandler}/>
    </div>
  );
}

export default App;
