import React, { SyntheticEvent, useState, useEffect} from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';

interface Token {
    accessToken: string
}

export const Login = (props: { setName: (name: string) => void }) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(username);
        console.log(password);

        
        axios.post<Token>('https://localhost:44345/api/account/login', {
            username,
            password
        })
            .then(response => {
                if (response.data) {  
                    let token: Token = response.data;                
                    localStorage.setItem("token", token.accessToken);
                }
                setRedirect(true);
                return response.data;
            });

       
        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to="/" />;
    }
   

    return (
        <form className="form-signin" onSubmit={submit}>
            <h1 >Please sign in</h1>
            <input type="user" className="form-control" placeholder="UserName" required
                onChange={e => setUserName(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required
                onChange={e => setPassword(e.target.value)}
            />

            <button type="submit">Sign in</button>
        </form>
    );
};
