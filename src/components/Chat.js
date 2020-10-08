import { Avatar, IconButton, Tooltip } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MeetingRoom, MoreVert, SearchOutlined, Send } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import db from '../firebase';
import './Chat.css';
import { useStateValue } from './data/StateProvider';
import firebase from 'firebase';
import Picker from 'emoji-picker-react';

const Chat = () => {

    const { roomId } = useParams();

    const [input, setInput] = useState('');

    const [roomName, setRoomName] = useState('');

    const [messages, setMessages] = useState([]);

    const [{ user }, dispatch] = useStateValue();

    const [chooseEmoji, setChooseEmoji] = useState(false);

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
            setInput('');
            setChooseEmoji(false);
        }
    }

    const updateEmoji = (event, emojiObject) => {
        console.log(event);
        console.log(emojiObject);
        setInput(input+emojiObject.emoji)
    }

    const history = useHistory();

    const leaveRoom = () => {
        history.push('/')
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
                    {/* <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton> */}
                    <Tooltip title="Exit room">
                        <IconButton onClick={leaveRoom}>
                            <MeetingRoom />
                        </IconButton>
                    </Tooltip>
                        
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p className={user.displayName != message.displayName ? `chat__message` : `chat__message chat__reciever`}>
                        <span className="chat__name">{message.displayName.split(' ')[0]}</span>
                        {message.message}
                        <br></br>
                        <span className="chat__timestamp">{new Date(message.timest?.toDate()).toTimeString()}</span>
                    </p>
                ))}
                
            </div>
            {chooseEmoji ? <Picker onEmojiClick={updateEmoji} disableSearchBar={true} disableSkinTonePicker={true} /> : null}
            <div className="chat__footer">
                <IconButton onClick={() => setChooseEmoji(!chooseEmoji)}>
                    <InsertEmoticon />
                </IconButton>
                <form>
                    <input placeholder="Enter your message" value={input} onChange={handleInput}></input>
                    <button onClick={sendMessage}>Send a message</button>
                </form>
                <IconButton onClick={sendMessage}>
                    <Send />
                </IconButton>                
            </div>
        </div>
    )
}

export default Chat;