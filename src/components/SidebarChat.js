import { Avatar, createChainedFunction } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './SidebarChat.css';

const SidebarChat = ({ addNewChat  }) => {

    const [seed, setSeed] = useState('');

    useEffect(() => {
        setSeed(Math.random())
    }, [])

    const createChat = () => {
        const roomName = prompt('Enter the name of your room')
        if(roomName) {
            // add room in firebase
        }
    }

    return !addNewChat ? (
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat__info">
                <h2>Room 1</h2>
                <p>Last message...</p>
            </div>
        </div>
    ) : (
        <div className="sidebarChat" onClick={() => createChat()}>
            <h2>Add new chat</h2>
        </div>
    )
}

export default SidebarChat;