import React, { useEffect, useRef } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core"; 
import useStyles from "./styles";
import classNames from "classnames";
import { PostedMessage, Me } from "../../shared/types";

interface Props {
  messages: PostedMessage[];
  currentUser: Me;
}
// Renders messages in the chat room.  This component also auto scrolls to the bottom when a new message comes in. 
const Messages = ({ messages, currentUser }: Props) => {
  const classes = useStyles({});
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef && messagesEndRef.current.scrollIntoView();
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <List className={classes.root}>
        {messages.map((item) => {
          const isMyMessage = item.name === currentUser.userName;
          return (
            <ListItem id="messageList" key={item.id}>
              <ListItemText
                className={classNames(
                  isMyMessage ? classes.myMessage : classes.otherMessage,
                  classes.message
                )}
                primary={item.message}
                secondary={isMyMessage ? null : item.name}
              />
            </ListItem>
          );
        })}
        <div style={{ paddingBottom: 120 }} ref={messagesEndRef} />
      </List>
    </>
  );
};

export default Messages;
