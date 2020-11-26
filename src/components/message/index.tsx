import React from "react";
import classNames from "classnames";
import { ListItem, ListItemText } from "@material-ui/core";
import { PostedMessage, Me } from "../../shared/types";
import useStyles from "./styles";

interface Props {
  message: PostedMessage;
  currentUser: Me;
}

const Message = ({ message, currentUser }: Props) => {
  const classes = useStyles({});
  const { id, name: sendersName, message: messageText, reaction } = message;
  const { userName: myUserName } = currentUser;
  const isMyMessage = sendersName === myUserName;
  const hasReaction = reaction != null;
  return (
    <ListItem id="messageList" key={id}>
      <ListItemText
        className={classNames(
          isMyMessage ? classes.myMessage : classes.otherMessage,
          classes.root,
          hasReaction ? classes.reaction : null
        )}
        primary={messageText}
        secondary={isMyMessage ? null : sendersName}
      />
    </ListItem>
  );
};

export default Message;
