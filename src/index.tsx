import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider, makeStyles, createStyles, TextField, Button, Theme } from "@material-ui/core";

import { Redirect, Link  } from "react-router-dom";
import { StylesProvider } from "@material-ui/styles";

import theme from "./theme";





const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    // necessary for content to be below app bar
  }),
);

const Login = () => {

  const classes = useStyles();
  const [userName, setNewUserName] = useState(""); // Message to send




  const handleUserNameChange = (e) => {
    setNewUserName(e.target.value)
  }
  const handlePressKey = (e) => {
    if (e.keyCode === 13) { // Send message if the key is "ENTER"
      handleSetUserName();
    }
  }



  const handleSetUserName = (e) => {
    sessionStorage.setItem('user', JSON.stringify({userName : userName, loginTime: new Date().getTime()}));
  }




  return (

    <div className={classes.root}>
      <div >
        <TextField
          value={userName}
          variant={"outlined"}
          onChange={handleUserNameChange}
          onKeyDown={handlePressKey}
          placeholder="Type your name..."
          // className={classes.messageInput}
        />
        <Button onClick={handleSetUserName} component={Link} to="/rooms" size={"large"} >
          Enter Chat Room
</Button>
      </div>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <Router>
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Route path="/rooms" component={App}>
            </Route>
            <Route exact path="/" component={Login} />
          </Switch>
        </MuiThemeProvider>
      </Router>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

