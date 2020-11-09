import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { TextField, Button } from '@material-ui/core'; //SEE IF THIS IS OVER IMPORTING
import useStyles from './styles';
import { Room} from '../shared/types'
import classNames from 'classnames';
import Messages from "../messages"

interface Props {
    routerProperties: any,
    currentUser: any
}

const Users = ({ users, classes, currentUser }) => {
    return (
        <div className={classes.users}>
            {users.map((user) => {
                const isMe = user === currentUser.userName;
                return <Typography className={classNames(classes.user, isMe ? classes.userHiglighted : '')} variant="h6" noWrap>
                    {user}
                </Typography>
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
        // consider using fetch instead
        await fetch(`/rooms/${id.id}/messages`).then(response => response.json()).then(data => {
            const noNewMessages = messages.length == data.length;
            if (noNewMessages) {
                return;
            }
            setMessages(data);
        });
    }

    const getRoomDetails = async () => {
        // consider using fetch instead
        const response = await axios.get(`/rooms/${id.id}`);
        setRoomDetails(response.data);
    }



    useEffect(() => {
        let isMounted = true; // note this flag denote mount status
        getRoomDetails();
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
        await fetch(`/rooms/${id.id}/messages`, requestOptions).then(() => getMessages()).then(() => getRoomDetails());
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
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar} classes={{ root: classes.toolbarSeparator }}>
                    <Typography variant="h5" noWrap>
                        {roomDetails.name}
                    </Typography>
                    <Users users={roomDetails.users} currentUser={currentUser} classes={classes} />
                </Toolbar>
            </AppBar>
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