import classes from './dialogs.module.scss'

const Dialog = () => {
  return (
    <div className={classes.conversation}>
      <img className={classes.conversationImg} src="" alt="" />
      <span className={classes.conversationName}>Vladimir</span>
    </div>
  );
}
export default Dialog