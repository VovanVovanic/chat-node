import axios from "axios";
import { useEffect, useState } from "react";
import classes from './chat.module.scss'

export default function Chat({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);


  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((friend) => onlineUsers.includes(friend._id)));
  }, [friends, onlineUsers]);

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
