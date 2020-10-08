import { Avatar, IconButton } from '@material-ui/core';
import { Chat, DonutLarge, ExitToApp, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import db from '../firebase';
import { actionTypes } from './data/reducer';
import { useStateValue } from './data/StateProvider';
import './Sidebar.css';
import SidebarChat from './SidebarChat';

const Sidebar = () => {

    const [{ user }, dispatch] = useStateValue();
    
    const [rooms, setRooms] = useState([]);

    const [searchRoom, setSearchRoom] = useState('');

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

    const history = useHistory();

    const logout = () => {
        dispatch({
            type: actionTypes.SET_USER,
            user: null
        })
        history.push('/')
    }

    const createChat = () => {
        const roomName = prompt('Enter the name of your room')
        if(roomName) {
            // add room in firebase
            db.collection('rooms').add({
                name: roomName
            })
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__right">
                    {/* <IconButton>
                        <DonutLarge />
                    </IconButton> */}
                    <IconButton onClick={createChat}>
                        <Chat />
                    </IconButton>
                    <IconButton onClick={logout} >
                        <ExitToApp />
                    </IconButton>                    
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search for your room" value={searchRoom} onChange={e => setSearchRoom(e.target.value)}></input>
                </div>
            </div>
            <div className="sidebar__chat">
                <SidebarChat addNewChat={true}/>
                {
                    rooms.map((room) => {
                        return (
                            (searchRoom != '' && !room.data.name.toUpperCase().includes(searchRoom.toUpperCase())) ? null : (<SidebarChat key={room.id} name={room.data.name} id={room.id} />)
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar;