import React from 'react';
import { auth, provider } from '../firebase';
import './Login.css';
import { useDataValue, useStateValue } from './data/StateProvider';
import { actionTypes } from './data/reducer';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const [{} , dispatch] = useStateValue();

    const history = useHistory();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(res => {
            dispatch({
                type: actionTypes.SET_USER,
                user: res.user
            })
            history.push('/');
        })
        .catch(err => alert(err));  
    }

    return (
        <div className="login">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png"></img>
            <h1>Login to whatsapp rooms</h1>
            <button onClick={signIn}>Login with Google</button>
        </div>
    )
}

export default Login;