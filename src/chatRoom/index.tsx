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
import Messages from "../messages"

interface Props {
    routerProperties: any,
    currentUser: any
}

const Users = ({ users, classes, currentUser }) => {

    console.log('users', currentUser);
    return (
        <div className={classes.users}>
            {users.map((user) => {
                const isMe = user === currentUser.userName;
                console.log(isMe);  

                return  <Typography className={classNames(classes.user, isMe ? classes.userHiglighted : '')} variant="h6" noWrap>
                    {user}
                </Typography>
                
                // isMe ? 
                //  : <Typography className={classNames(classes.user)} variant="h6" noWrap>
                //         {user}
                //     </Typography>


                
            })}
        </div>
    )
}

const ChatRoom = ({ routerProperties, currentUser }: Props) => {
    const classes = useStyles({});
    const [messages, setMessages] = useState([]);
    const [roomDetails, setRoomDetails] = useState<Room | undefined>();

    const [newMessage, setNewMessage] = useState(""); // Message to send

    const { match: { params: id } } = routerProperties;
    const getMessages = async () => {
        console.log('message lenght outside: ', messages.length);
        // consider using fetch instead
        await fetch(`/rooms/${id.id}/messages`).then(response => response.json()).then(data => {
            console.log('message length inside: ', messages.length);
            const noNewMessages = messages.length == data.length;
            console.log('NO NEW MESSAGES: ', noNewMessages)
            if (noNewMessages) {
                return;
            }
            // messages = null;
            console.log('SET MESSAGES GOT CALLED')
            setMessages(data);
        });
    }

    const getRoomDetails = async () => {
        // consider using fetch instead
        const response = await axios.get(`/rooms/${id.id}`);
        setRoomDetails(response.data);
        console.log('messages', response.data);
    }



    useEffect(() => {
        let isMounted = true; // note this flag denote mount status
        getRoomDetails();
        // getMessages();// TODO figure out if this is fireing all thetime
        console.log('USER', currentUser);
        var timer = setInterval(() => getMessages(), 1000);

        return () => { clearInterval(timer); timer = null; isMounted = false }; // unmount
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
            body: JSON.stringify({ name: currentUser.userName, message: newMessage })
        };
        await fetch(`/rooms/${id.id}/messages`, requestOptions).then(() => getMessages())

        // scrollToBottom();
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
        <div className={classes.root}>


            <AppBar position="fixed" className={classes.appBar}>
                {/* TODO remove tool bar SEPORATOR */}
                <Toolbar className={classes.toolbar} classes={{ root: classes.toolbarSeparator }}>
                    <Typography className={classes.headerItem} variant="h5" noWrap>
                        {roomDetails.name}
                    </Typography>
                    <Users users={roomDetails.users} currentUser={currentUser} classes={classes} />
                </Toolbar>
            </AppBar>
            {/* <List className={classes.messageList}>
                {messages.map((item: any) => {
                    const isMyMessage = item.name === currentUser;
                    return <ListItem id="messageList" key={item.id}>
                        <ListItemText className={classNames(isMyMessage ? classes.myMessage : classes.otherMessage, classes.message)} primary={item.message} />
                    </ListItem>
                })}
            </List> */}
            <Messages messages={messages} currentUser={currentUser} />
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

        </div>
    )
}

export default ChatRoom;