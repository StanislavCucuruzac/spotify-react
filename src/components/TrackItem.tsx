import React, { useEffect, useState } from "react";
import { IListTrack, ITrack } from "./types/track";
import { Card, IconButton } from '@material-ui/core';
import styles from '../styles/TrackItem.module.css'
import { Pause, PlayArrow, Delete, Stop } from "@material-ui/icons";
import { Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';


interface TrackItemProps {
    track: any;
    active?: boolean;
    showModal: any,
    setShowModal: any
    setSongId: any
}

export const TrackItem: React.FC<TrackItemProps> = ({ track, active = false , showModal, setShowModal, setSongId}) => {

    const [audio]: any = useState(new Audio('https://localhost:44345/LocalStorage/' + track.slug + '.mp3'))
    const [isActive, setIsActive]: any = useState(active);
    const [currentTime, setCurentTime] = useState(0);
    useEffect(() => {
        setCurentTime(audio.currentTime)
    }, [audio.currentTime])
    const start = () => {
        setIsActive(true)
        audio.play();
    }
    const pause = () => {
        setIsActive(false)
        audio.pause();
    }
    const stop = () => {
        setIsActive(false)
        audio.pause();
        audio.currentTime = 0;
    }

    const addToPlaylist = () => {

    }
    const handleOpen = (id: any) => {
        setShowModal(true);
        setSongId(id);
    }

    return (
        <Card className={styles.track}>
            <IconButton>
                {isActive
                    ? <Pause onClick={pause} />
                    : <PlayArrow onClick={start} />
                }
                <Stop onClick={stop} />

            </IconButton>
            <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
                <div>{track.name}</div>
            </Grid>
            {isActive && <div> {currentTime}</div>}
            <IconButton style={{ marginLeft: 'auto' }}>
                <AddIcon onClick={()=> handleOpen(track.id)} />
            </IconButton>
        </Card>
    );
    ;
}
