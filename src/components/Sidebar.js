import { Avatar, IconButton } from '@material-ui/core';
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { useStateValue } from './data/StateProvider';
import './Sidebar.css';
import SidebarChat from './SidebarChat';

const Sidebar = () => {

    const [{ user }, dispatch] = useStateValue();
    
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => {
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        })

        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__right">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>                    
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search for chat"></input>
                </div>
            </div>
            <div className="sidebar__chat">
                <SidebarChat addNewChat={true}/>
                {
                    rooms.map((room) => (
                        <SidebarChat key={room.id} name={room.data.name} id={room.id} />
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar;