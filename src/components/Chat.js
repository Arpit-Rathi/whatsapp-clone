import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined, Send } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import './Chat.css';
import { useStateValue } from './data/StateProvider';
import firebase from 'firebase';

const Chat = () => {

    const { roomId } = useParams();

    const [input, setInput] = useState('');

    const [roomName, setRoomName] = useState('');

    const [messages, setMessages] = useState([]);

    const [{ user }, dispatch] = useStateValue();

    console.log(user)

    useEffect(() => {
        if(roomId) {
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot(snapshot => {
                setRoomName(snapshot.data().name)
            })

            db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timest', 'asc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            })
        }
    }, [roomId])

    const handleInput = (e) => {
        const message = e.target.value;
        setInput(message)
    }

    const sendMessage = (e) => {
        e.preventDefault();
        if(input.length) {
            // database stuff
            db.collection('rooms')
            .doc(roomId)
            .collection('messages').
            add({
                message: input,
                timest: firebase.firestore.FieldValue.serverTimestamp(),
                displayName: user.displayName
            })
            setInput('')
        }
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Created at 20, Dec 1997</p>
                </div>
                <div className="chat__headerRight">                   
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>    
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p className={user.displayName != message.displayName ? `chat__message` : `chat__message chat__reciever`}>
                        <span className="chat__name">{message.displayName}</span>
                        {message.message}
                        <span className="chat__timestamp">{new Date(message.timest?.toDate()).toUTCString()}</span>
                    </p>
                ))}
                
            </div>
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <form>
                    <input placeholder="Enter your message" value={input} onChange={handleInput}></input>
                    <button onClick={sendMessage}>Send a message</button>
                </form>
                <IconButton>
                    <Send />
                </IconButton>                
            </div>
        </div>
    )
}

export default Chat;