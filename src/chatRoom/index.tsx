import React, { useEffect, useState } from 'react';
import axios from "axios";
import {List, ListItem, TextField, Button} from '@material-ui/core'; //SEE IF THIS IS OVER IMPORTING

const ChatRoom = ({ props }: any) => {
    console.log(props);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(""); // Message to send
  
    const { match: { params: id } } = props;
    const getMessagesByRoom = async () => {
      const response = await axios.get(`/rooms/${id.id}/messages`)
      setMessages(response.data);
      console.log('messages', response.data);
    }
  
    useEffect(() => {
      getMessagesByRoom();
    }, [props]);
  
    console.log(id);
  
    const handleMessageChange = (e) => {
      setNewMessage(e.target.value);
    }
  
    const handleSendMessage = () => {
      // send message
      setNewMessage('');
    }

    const handlePressKey = (e) => {
        if(e.keyCode===13){ // Send message if the key is "ENTER"
            handleSendMessage();
        }
    }
  
    return (
      <>
      <List>
        {messages.map((item: any) => {
          return <div>{item.message}</div>
        })}
      </List>
      <TextField
      value={newMessage}
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