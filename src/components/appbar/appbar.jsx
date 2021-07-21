import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const uploadAvatar = async () => {
  try {
    await axios.post('/api/avatar');
  } catch (e) {
    console.log(e)
  }
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  ava: {
    width: "200px",
    height: "65px",
    marginLeft: "30px",
    display: "flex",
    paddingTop: "5px",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logout: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end"
  },
  choose: {
    textAlign: "center"
  }
}));

export default function Appbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [img, setImg] = React.useState(null)
  const[user, setUser] = React.useState()
  const history = useHistory()

console.log(user);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const avatarHandle = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user)
  
    const data = new FormData();
    data.append("avatar", img);
          const res = axios.post("/avatar", "hi"
          );
      console.log(res)
  
 }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ height: "80px" }}>
        <Toolbar>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {img ? (
                <img className={classes.logo} src={`${img}`} alt="logo" />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>

          <div className={classes.ava}>
            <input type="file" className={classes.choose} name="avatar" onChange={(e) => setImg(e.target.files[0])}/>
              <Button
                variant="contained"
                size="small"
                type="submit"
                onClick={avatarHandle}
              >
                edit avatar
              </Button>
          </div>
          <div className={classes.logout}>
            <Button color="inherit">Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
