import React, { useEffect, useState } from "react";
import { Grid, Card, Button, Box } from '@material-ui/core'
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Create } from "./create";
import { ITrack } from "../types/track";
import { TrackList } from "../TrackList";
import axios from 'axios';
import { Redirect } from "react-router-dom";

export const Tracks = () => {
   const[tracks, setTracks]: any = useState([])
    //  const tracksList: ITrack[] = [
    //    {_id: "1", name: "Trak1", duration: 4, price: 5, slug: 'https://localhost:5000/LocalStorage/}'}

    // ]
    useEffect(() => {
             
            if(localStorage.getItem('token') !== null){
                const token = localStorage.getItem('token')
         console.log(token)
            axios.get<ITrack[]>('https://localhost:44345/api/Song',
             { headers: {"content-type": "application/json", "Authorization": `Bearer ` +   
             token}})
                .then(res => {
                    console.log(res.data);
                    setTracks(res.data)
                })
                .catch((error) => {
                        console.log(error)
                    });
            }   
            else {
                 <Redirect to="/login" />;
            }
         
        }, []);
    return (
        <Grid container justifyContent='center'>
            <Card style={{ width: 900, backgroundColor: 'grey'}}>
                <Box p={3}>
                    <Grid container justifyContent='space-between'>
                        <h1>List of tracks</h1>
                        <Button className="createBtn">
                            <Link to="/tracks/create">
                                Create
                            </Link>
                        </Button>
                    </Grid>
                </Box>
                <TrackList tracks={tracks}/>
            </Card>
        </Grid>
    );
};