import React, { useEffect, useRef } from "react";
import { List } from "@material-ui/core";

import Message from "../message";
import { Me, MessageData } from "../../shared/types";
import useStyles from "./styles";

interface Props {
  messages: MessageData[];
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
    <List className={classes.root}>
      {messages.map((message) => {
        const { id } = message;
        return <Message key={id} message={message} currentUser={currentUser} />;
      })}
      <div style={{ paddingBottom: 120 }} ref={messagesEndRef} />
    </List>
  );
};

export default Messages;
