import React, { useEffect, useState } from 'react';
import axios from "axios";
import { List, ListItem, ListItemText, TextField, Button } from '@material-ui/core'; //SEE IF THIS IS OVER IMPORTING

const ChatRoom = ({ routerProperties, currentUser }: any) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(""); // Message to send

    const { match: { params: id } } = routerProperties;
    const getMessagesByRoom = async () => {
        const response = await axios.get(`/rooms/${id.id}/messages`)
        setMessages(response.data);
        console.log('messages', response.data);
    }

    useEffect(() => {
        getMessagesByRoom();
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
        const response = await fetch(`/rooms/${id.id}/messages`, requestOptions).then(() => getMessagesByRoom());
    }

    const handlePressKey = (e) => {
        if (e.keyCode === 13) { // Send message if the key is "ENTER"
            handleSendMessage();
        }
    }

    return (
        <>
            <List>
                {messages.map((item: any) => {
                    return <ListItem selected={item.name===currentUser} key={item.id}>
                        <ListItemText primary={item.message} />
                    </ListItem>
                })}
            </List>
            <TextField
                value={newMessage}
                variant={"outlined"}
                onChange={handleMessageChange}
                onKeyDown={handlePressKey}
                placeholder="Write message..."
                className="new-message-input-field"
            />
            <Button onClick={handleSendMessage} className="send-message-button">
                Send
  </Button>
        </>
    )
}

export default ChatRoom;