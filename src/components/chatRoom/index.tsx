import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import { Me, RoomDetails } from "../../shared/types";
import Messages from "../messages/index";
import Users from "../users/index";
import BottomPanel from "../bottomPanel";

interface Props {
  routerProperties: any;
  currentUser: Me;
}

// This component contains everything that has to do with the chat room such as.
// The users in the room, the room name, chat messages, message input form, etc.
const ChatRoom = ({ routerProperties, currentUser }: Props) => {
  const classes = useStyles({});
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(messages);

  const [roomDetails, setRoomDetails] = useState<RoomDetails>();

  const {
    match: {
      params: { id: roomId },
    },
  } = routerProperties;
  const getMessages = async () => {
    // consider using fetch instead
    await fetch(`/rooms/${roomId}/messages`)
      .then((response) => response.json())
      .then((data) => {
        const messagesChanged =
          JSON.stringify(messagesRef.current) !== JSON.stringify(data);
        if (!messagesChanged) {
          return;
        }
        setMessages(data);
      });
  };

  const getRoomDetails = async () => {
    // TODO consider using fetch instead. Also destructure that ID better

    const response = await axios.get(`/rooms/${roomId}`);
    setRoomDetails(response.data);
  };
  useEffect(() => {
    messagesRef.current = messages;
  });

  useEffect(() => {
    getRoomDetails();
    getMessages();
    let timer = setInterval(() => getMessages(), 500);

    return () => {
      clearInterval(timer);
      timer = null;
    }; // unmount
  }, [routerProperties]);

  if (!messages || !roomDetails) {
    return null;
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar
          className={classes.toolbar}
          classes={{ root: classes.toolbarSeparator }}
        >
          <Typography variant="h5" noWrap>
            {roomDetails.name}
          </Typography>
          <Users
            users={roomDetails.users}
            currentUser={currentUser}
            classes={classes}
          />
        </Toolbar>
      </AppBar>
      <Messages messages={messages} currentUser={currentUser} />
      <BottomPanel
        getRoomDetails={getRoomDetails}
        currentUser={currentUser}
        roomId={roomId}
      />
    </div>
  );
};

export default ChatRoom;
