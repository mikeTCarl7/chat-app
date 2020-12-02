import React, { useState } from "react";
import { Me } from "../../shared/types";
import { TextField, Button } from "@material-ui/core";
import useStyles from "./styles";

interface Props {
  currentUser: Me;
  roomId: string;
  getRoomDetails: any;
}

const BottomPanel = ({ getRoomDetails, roomId, currentUser }: Props) => {
  const classes = useStyles({});
  const [newMessage, setNewMessage] = useState("");

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async (
    newMessage: string,
    roomId: string,
    userName: string
  ) => {
    // send message
    setNewMessage("");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName, message: newMessage }),
    };
    await fetch(`/rooms/${roomId}/messages`, requestOptions).then(() =>
      getRoomDetails()
    );
  };

  const handlePressKey = (e) => {
    if (e.keyCode === 13) {
      // Send message if the key is "ENTER"
      handleSendMessage(newMessage, roomId, currentUser.userName);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.messageInputWrapper}>
        <TextField
          value={newMessage}
          variant={"outlined"}
          onChange={handleMessageChange}
          onKeyDown={handlePressKey}
          placeholder="Write message..."
          className={classes.messageInput}
        />
        <Button
          onClick={() =>
            handleSendMessage(newMessage, roomId, currentUser.userName)
          }
          color={"primary"}
          variant={"contained"}
          size={"large"}
          className={classes.sendButton}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default BottomPanel;
