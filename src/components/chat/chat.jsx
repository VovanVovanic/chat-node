import axios from "axios";
import { useEffect, useState } from "react";
import classes from './chat.module.scss'

export default function Chat({ onlineUsers, currentId, setCurrentChat }) {

  const  [onlineFriends, setOnlineFriends] = useState([])

console.log(onlineFriends);
  useEffect(() => {
    const users = []
    users.push(onlineUsers)
    setOnlineFriends(users)
  }, [onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.chatOnline}>
      {onlineFriends.map((friend) => (
        <div
          className={classes.chatOnlineFriend}
          onClick={() => handleClick(friend)}
        >
          <div className={classes.chatOnlineImgContainer}>
            <img className={classes.chatOnlineImg} src="" alt="" />
            <div className={classes.chatOnlineBadge}></div>
          </div>
          <span className={classes.chatOnlineName}>{friend?.username}</span>
        </div>
      ))} 
    </div>
  );
}
