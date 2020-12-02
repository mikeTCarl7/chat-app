import React from "react";
import classNames from "classnames";
import { ListItem, ListItemText } from "@material-ui/core";
import { Me, MessageData } from "../../shared/types";
import useStyles from "./styles";

interface Props {
  message: MessageData;
  currentUser: Me;
}

const Message = ({ message, currentUser }: Props) => {
  const classes = useStyles({});
  const { id, name: sendersName, message: messageContent } = message;
  const { userName: myUserName } = currentUser;
  const isMyMessage = sendersName === myUserName;
  return (
    <ListItem id="messageList" key={id}>
      <div
        className={classNames(
          isMyMessage ? classes.myMessage : classes.otherMessage,
          classes.root
        )}
      >
        <ListItemText
          className={classes.messageText}
          primary={messageContent}
          secondary={isMyMessage ? null : sendersName}
        />
      </div>
    </ListItem>
  );
};

export default Message;
