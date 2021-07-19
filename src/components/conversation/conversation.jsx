import axios from "axios";
import { useEffect, useState } from "react";
import classes from './conversation.module.scss';

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className={classes.conversation}>
      <img
        className={classes.conversationImg}
        src={user?.avatar ? user.avatar : "localhost:3003/public/images/small.jpg"}
        alt=""
      />
      <span className={classes.conversation.name}>{user?.username}</span>
    </div>
  );
}
