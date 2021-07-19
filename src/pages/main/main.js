import React from "react";
import Topbar from "../../components/topbar/topbar";
import classes from "./main.module.scss";
import Dialogs from "../../components/dialogs/dialogs";
import Message from "../../components/message/message";
const Main = () => {
  return (
    <div className={classes.root}>
      <Topbar />
      <div className={classes.messenger}>
        <div className={classes.chatMenu}>
          <div className={classes.chatMenuWrapper}>
            <input
              placeholder="Search friends"
              className={classes.chatMenuInput}
            />
            <Dialogs />
            <Dialogs />
            <Dialogs />
          </div>
        </div>
        <div className={classes.chatBox}>
          <div className={classes.chatBoxWrapper}>
            <div className={classes.chatBoxTop}>
              <Message />
              <Message own={true} />
              <Message />
              <Message own={true} />
              <Message />
              <Message own={true} />
              <Message />
              <Message own={true} />
              <Message />
              <Message own={true} />
            </div>
            <div className={classes.chatBoxBottom}>
              <textarea
                className={classes.chatMessageInput}
                placeholder="write something..."
              ></textarea>
              <button className={classes.chatSubmitButton}>Send</button>
            </div>
          </div>
        </div>
        <div className={classes.chatOnline}>
          <div className={classes.chatOnlineWrapper}>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
