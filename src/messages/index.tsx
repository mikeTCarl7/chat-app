import React, { useEffect, useRef, useState } from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core'; //SEE IF THIS IS OVER IMPORTING
import useStyles from "./styles";
import classNames from 'classnames';
import { PostedMessage } from '../shared/types';


interface Props {
    messages: PostedMessage[];
    currentUser: string;
}

const Messages = ({ messages, currentUser }: Props) => {
    const classes = useStyles({});
    const messagesEndRef = useRef(null)
    const mounted = useRef();
    // for dummy div at bottom of message list so we can scroll to bottom when new messages come in


    const scrollToBottom = () => {
        // @ts-ignore
        messagesEndRef && messagesEndRef.current.scrollIntoView();
    }
    useEffect(()=>{
        console.log('SCROLL TO BOTTOM')
        scrollToBottom()
    }, [messages]);


    console.log('currentUser ', currentUser);
    return (
        <>
            <List className={classes.root}>
                {messages.map((item) => {
                    const isMyMessage = item.name === currentUser.userName;
                    console.log(isMyMessage)
                    return <ListItem id="messageList" key={item.id}>
                        <ListItemText className={classNames(isMyMessage ? classes.myMessage : classes.otherMessage, classes.message)} primary={item.message} secondary={isMyMessage ? null : item.name}/>
                        
                    </ListItem>
                })}
                <div style={{ paddingBottom: 120 }} ref={messagesEndRef} />
            </List>
        </>
    )

}

export default Messages