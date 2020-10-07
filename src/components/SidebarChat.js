import { Avatar, createChainedFunction } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../firebase';
import './SidebarChat.css';

const SidebarChat = ({ addNewChat, name, id}) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(id)
        db.collection('rooms').doc(id).collection('messages').orderBy('timest', 'desc').onSnapshot(snapShot => setMessages(snapShot.docs.map(doc => doc.data())))
    }, [])

    const createChat = () => {
        const roomName = prompt('Enter the name of your room')
        if(roomName) {
            // add room in firebase
            db.collection('rooms').add({
                name: roomName
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages.length > 0 ? messages[0]?.message : "Chat empty"}</p>
                </div>
            </div>
        </Link>
        
    ) : (
        <div className="sidebarChat" onClick={() => createChat()}>
            <h2>Add new chat</h2>
        </div>
    )
}

export default SidebarChat;