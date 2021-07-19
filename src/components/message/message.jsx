import classes from './message.module.scss';
import { format } from "timeago.js";

export default function Message({ message, own }) {
  return (
    <div className={own ? `${classes.own} ${classes.message}` : classes.message}>
      <div className={classes.messageTop}>
        <img
          className={classes.messageImg}
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className={classes.messageText}>Helo ghgghgjh </p>
      </div>
      <div className={classes.messageBottom}>1 hour ago</div>
    </div>
  );
}
