import Main from '../main/main'
import Auth from '../auth/auth'


const Content = ({ isAuth, authHandler }) => {
  return (
    <>
      {isAuth ? <Main /> : <Auth button={"Login"} authHandler={authHandler} type="login"/>}
  </>
)
}

export default Content