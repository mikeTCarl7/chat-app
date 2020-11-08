import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemText, TextField, Button } from '@material-ui/core'; //SEE IF THIS IS OVER IMPORTING
import useStyles from './styles';
import { Room, Message, InCommingMessage } from '../shared/types'
import userEvent from '@testing-library/user-event';
import classNames from 'classnames';


interface Props {
    routerProperties: any,
    currentUser: string
}

function RenderUsers(users, styles) {

    console.log(users);
    return (
        <div className={styles.users}>
            {users.map((user) => {
                return <Typography className={styles.headerItem} variant="h6" noWrap>
                    {user}
                </Typography>
            })}
        </div>
    )
}

// <Typography variant="h6" noWrap>
//                         {roomDetails.name}
//                         </Typography>
//                         <Typography variant="h6" noWrap>
//                         {roomDetails.users[0]}
//                         </Typography>
//                         <Typography variant="h6" noWrap>
//                         {roomDetails.users[1]}
//                         </Typography>
//                 </Toolbar >

const ChatRoom = ({ routerProperties, currentUser }: Props) => {
    const classes = useStyles({});
    const [messages, setMessages] = useState([]);
    const [roomDetails, setRoomDetails] = useState<Room | undefined>();

    const [newMessage, setNewMessage] = useState(""); // Message to send
    const messagesEndRef = useRef(null) // for dummy div at bottom of message list so we can scroll to bottom when new messages come in

    const { match: { params: id } } = routerProperties;
    const getMessages = async () => {
        // consider using fetch instead
        const response = await axios.get(`/rooms/${id.id}/messages`);
        setMessages(response.data);
        console.log('messages', response.data);
    }

    const getRoomDetails = async () => {
        // consider using fetch instead
        const response = await axios.get(`/rooms/${id.id}`);
        setRoomDetails(response.data);
        console.log('messages', response.data);
    }

    const scrollToBottom = () => {
        // @ts-ignore
        messagesEndRef && messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }


    useEffect(() => {
        let isMounted = true; // note this flag denote mount status
        getRoomDetails();
        getMessages();
        setTimeout(()=>{

            scrollToBottom();
        }, 0)
        return () => { isMounted = false };
    }, [routerProperties]);

    const handleMessageChange = (e) => {
        setNewMessage(e.target.value);
    }

    const handleSendMessage = async () => {
        // send message
        setNewMessage('');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: currentUser, message: newMessage })
        };
        await fetch(`/rooms/${id.id}/messages`, requestOptions).then(() => getMessages());
        scrollToBottom();
    }

    const handlePressKey = (e) => {
        if (e.keyCode === 13) { // Send message if the key is "ENTER"
            handleSendMessage();
        }
    }

    if (!messages || !roomDetails) {
        return <div>Something Went Wrong</div>
    }

    return (
        // <div className={classes.root}>
        <>
            <AppBar position="fixed" className={classes.appBar}>
                {/* TODO remove tool bar SEPORATOR */}
                <Toolbar className={classes.toolbar} classes={{ root: classes.toolbarSeparator }}>
                    <Typography className={classes.headerItem} variant="h5" noWrap>
                        {roomDetails.name}
                    </Typography>
                    {RenderUsers(roomDetails.users, classes)}
                </Toolbar>
            </AppBar>
            <List className={classes.messageList}>
                {messages.map((item: any) => {
                    const isMyMessage = item.name === currentUser;
                    return <ListItem id="messageList" key={item.id}>
                        <ListItemText className={classNames(isMyMessage ? classes.myMessage : classes.otherMessage, classes.message)} primary={item.message} />
                    </ListItem>
                })}
            </List>
                  <div style={{paddingBottom: 120}} ref={messagesEndRef} />

            <div className={classes.footer}>
                <div className={classes.messageInputWrapper}>
                    <TextField
                        value={newMessage}
                        variant={"outlined"}
                        onChange={handleMessageChange}
                        onKeyDown={handlePressKey}
                        placeholder="Write message..."
                        className={classes.messageInput}
                    />
                    <Button onClick={handleSendMessage} size={"large"} className={classes.sendButton}>
                        Send
            </Button>
                </div>
            </div>

        </>
    )
}

export default ChatRoom;