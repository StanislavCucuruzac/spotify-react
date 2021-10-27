import React, { SyntheticEvent, useState, useEffect} from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';


export const Register = (props: { setName: (name: string) => void }) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(username);
        console.log(password);

        
        axios.post('https://localhost:44345/api/User', {
            username,
            password
        })
            .then(response => {                
                setRedirect(true);
                return response.data;
            });

       
        setRedirect(true);
    }

    if (redirect) {
         window.location.href="/login";
    }
   

    return (
        <form className="form-signin" onSubmit={submit}>
            <h1 >Please sign up</h1>
            <input type="user" className="form-control" placeholder="UserName" required
                onChange={e => setUserName(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required
                onChange={e => setPassword(e.target.value)}
            />

            <button type="submit">Sign Up</button>
        </form>
    );
};