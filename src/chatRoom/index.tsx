import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemText, TextField, Button } from '@material-ui/core'; //SEE IF THIS IS OVER IMPORTING
import useStyles from './styles';
import { Room, Message, InCommingMessage } from '../shared/types'
import userEvent from '@testing-library/user-event';

interface Props {
    routerProperties: any,
    currentUser: string
}

function RenderUsers(users, styles) {

    // if(!users) return null
    console.log(users);
    return (
        <div className={styles.users}>
            {/* dfsdfasdfasd */}
            {users.map((user) => {
                return <Typography variant="h6" noWrap>
                    {user}
                </Typography>
            })}
            {/* <Typography variant="h6" noWrap>
                    {users[0]}
                </Typography> */}
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

    useEffect(() => {
        let isMounted = true; // note this flag denote mount status

        getRoomDetails();
        getMessages();
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
                    <Typography variant="h6" noWrap>
                        {roomDetails.name}
                    </Typography>
                    {RenderUsers(roomDetails.users, classes)}                
                    </Toolbar>
            </AppBar>
            <List>
                {messages.map((item: any) => {
                    return <ListItem selected={item.name === currentUser} key={item.id}>
                        <ListItemText primary={item.message} />
                    </ListItem>
                })}
            </List>
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