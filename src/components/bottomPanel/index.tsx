import React, { useState } from "react";
import { Me } from "../../shared/types";
import { TextField, Button } from "@material-ui/core";
import useStyles from "./styles";
interface Props {
  handleSendMessage: (newMessage: string) => Promise<void>;
}

const BottomPanel = ({ handleSendMessage }: Props) => {
  const classes = useStyles({});
  const [newMessage, setNewMessage] = useState("");

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handlePressKey = (e) => {
    if (e.keyCode === 13) {
      // Send message if the key is "ENTER"
      handleSendMessage(newMessage);
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
          onClick={()=> handleSendMessage(newMessage)}
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