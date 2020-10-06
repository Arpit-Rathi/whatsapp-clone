import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined, Send } from '@material-ui/icons';
import React from 'react';
import './Chat.css';

const Chat = () => {
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Room 1</h3>
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
                <p className="chat__message">
                    <span className="chat__name">Arpit Rathi</span>
                    Chat message 1
                    <span className="chat__timestamp">2:20 pm</span>
                </p>

                <p className={`chat__message ${true ? 'chat__reciever' : ''}`}>
                    <span className="chat__name">Arpit Rathi</span>
                    Chat message 1
                    <span className="chat__timestamp">2:20 pm</span>
                </p>

                <p className="chat__message">
                    <span className="chat__name">Arpit Rathi</span>
                    Chat message 1
                    <span className="chat__timestamp">2:20 pm</span>
                </p>

                <p className={`chat__message ${true ? 'chat__reciever' : ''}`}>
                    <span className="chat__name">Arpit Rathi</span>
                    Chat message 1
                    <span className="chat__timestamp">2:20 pm</span>
                </p>

                <p className={`chat__message ${true ? 'chat__reciever' : ''}`}>
                    <span className="chat__name">Arpit Rathi</span>
                    Chat message 1
                    <span className="chat__timestamp">2:20 pm</span>
                </p>

                <p className="chat__message">
                    <span className="chat__name">Arpit Rathi</span>
                    Chat message 1
                    <span className="chat__timestamp">2:20 pm</span>
                </p>

                <p className="chat__message">
                    <span className="chat__name">Arpit Rathi</span>
                    Chat message 1
                    <span className="chat__timestamp">2:20 pm</span>
                </p>

                <p className={`chat__message ${true ? 'chat__reciever' : ''}`}>
                    <span className="chat__name">Arpit Rathi</span>
                    Chat message 1
                    <span className="chat__timestamp">2:20 pm</span>
                </p>

                <p className="chat__message">
                    <span className="chat__name">Arpit Rathi</span>
                    Chat message 1Chat message 1Chat message 1Chat me  1Chat message 1Chat me 1Chat message 1Chat me 1Chat message 1Chat me 1Chat message 1Chat me
                    essage 1Chat me 1Chat message 1Chat me 1Chat message 1Chat me 1Chat message 1Chat me
                    <span className="chat__timestamp">2:20 pm</span>
                </p>

                <p className={`chat__message ${true ? 'chat__reciever' : ''}`}>
                    <span className="chat__name">Arpit Rathi</span>
                    Chat message 1
                    <span className="chat__timestamp">2:20 pm</span>
                </p>

                <p className={`chat__message ${true ? 'chat__reciever' : ''}`}>
                    <span className="chat__name">Arpit Rathi</span>
                    Chat message 1
                    <span className="chat__timestamp">2:20 pm</span>
                </p>

                <p className="chat__message">
                    <span className="chat__name">Arpit Rathi</span>
                    Chat message 1
                    <span className="chat__timestamp">2:20 pm</span>
                </p>

            </div>
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <form>
                    <input></input>
                    <button>Send a message</button>
                </form>
                <IconButton>
                    <Send />
                </IconButton>                
            </div>
        </div>
    )
}

export default Chat;