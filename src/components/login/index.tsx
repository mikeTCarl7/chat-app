import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import useStyles from "./styles";

// This is the login page.  You will be routed here when going to the root path of the site.
const Login = () => {
  const joinButtonContent = "Join The DoorDash Chat!"; // Ideally this would be driven by a service
  const classes = useStyles();
  const [userName, setUserName] = useState(""); // Message to send

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSetUserName = (e) => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({ userName: userName, loginTime: new Date().getTime() })
    );
  };

  return (
    <div className={classes.root}>
      <TextField
        className={classes.textField}
        value={userName}
        variant={"outlined"}
        onChange={handleUserNameChange}
        placeholder="Type your name..."
        required={true}
        fullWidth={true}
      />
      <Button
        onClick={handleSetUserName}
        fullWidth={true}
        disabled={!userName}
        variant="contained"
        color="primary"
        component={Link}
        to="/rooms"
        size={"large"}
      >
        {joinButtonContent}
      </Button>
    </div>
  );
};

export default Login;
