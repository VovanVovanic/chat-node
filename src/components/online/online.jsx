import classes from './online.module.scss'

const ChatOnline = () => {
  return (
    <div className={classes.chatOnline}>
      <div className={classes.chatOnlineFriend}>
        <div className={classes.chatOnlineImgConteiner}>
          <img src="" alt="" className={classes.chatOnlineImg} />
          <div className={classes.chatOnlineBagde}></div>
        </div>
        <span className={classes.chatOnlineName}>Some name</span>
      </div>
    </div>
  );
}

export default ChatOnline