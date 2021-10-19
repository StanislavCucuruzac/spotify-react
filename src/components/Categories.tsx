import axios from "axios";
import React, { useEffect, useState } from "react";
import { Playlists } from "./Playlists";
import { Redirect } from "react-router-dom";

interface IPlaylist{
    id: string
    name: string
}
export const Categories = () => {
    const [playlist, setPlaylist]: any = useState([])
     useEffect(() => {
    //     localStorage.getItem("token") 
    //     const response = fetch('https://localhost:44345/api/account/login', {
    //         method: 'GET',
    //         headers: {'content-type': 'application/json; charset=UTF-8', 'authorization': 'Bearer ' + localStorage.getItem('token')}

    //     });     
        if(localStorage.getItem('token') !== null){
            const token = localStorage.getItem('token')
     console.log(token)
        axios.get<IPlaylist[]>('https://localhost:44345/api/Playlist',
         { headers: {"content-type": "application/json", "Authorization": `Bearer ` +   
         token}})
            .then(res => {
                console.log(res.data);
                setPlaylist(res.data)
            })
            .catch((error) => {
                    console.log(error)
                });
        }   
        else {
             <Redirect to="/login" />;
        }
     
    }, []);


    const dataCategories = [
        {
            id: 1,
            name: 'Category 1',
            tagline: 'This is a description'
        },
        {
            id: 2,
            name: 'Category 2',
            tagline: 'This is a description'
        },
        {
            id: 3,
            name: 'Category 3',
            tagline: 'This is a description'
        },


    ]

    return (

        <div>
            {playlist.map((category: any, id: any) => (
                <div className="cardsWrap" key={id}>
                    <h2>{category.name}</h2>
                    <p className="subText">Music for your concentrate.</p>
                    {/* <Playlists category={category.id}/> */}
                    <div className="cardsWrapInner">
                        <div className="card">
                            <div className="cardImage">
                                <img src="https://images.unsplash.com/photo-1613724899767-f9586f3a87fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8
                      &ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80" alt="Pic 1"
                                />
                            </div>
                            <div className="cardContent">
                                <h3>Music for concentrate</h3>
                                <span >Music for your concentrate.</span>
                            </div>
                            <button className="playBtn">
                                play
                            </button>
                        </div>
                        <div className="card">
                            <div className="cardImage">
                                <img src="https://images.unsplash.com/photo-1613724899767-f9586f3a87fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8
                      &ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80" alt="Pic 1"
                                />
                            </div>
                            <div className="cardContent">
                                <h3>Music for concentrate</h3>
                                <span >Music for your concentrate.</span>
                            </div>
                            <button className="playBtn">
                                play
                            </button>
                        </div>
                        <div className="card">
                            <div className="cardImage">
                                <img src="https://images.unsplash.com/photo-1613724899767-f9586f3a87fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8
                      &ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80" alt="Pic 1"
                                />
                            </div>
                            <div className="cardContent">
                                <h3>Music for concentrate</h3>
                                <span >Music for your concentrate.</span>
                            </div>
                            <button className="playBtn">
                                play
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};