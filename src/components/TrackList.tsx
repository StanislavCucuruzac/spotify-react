import React, { useEffect, useState } from "react";
import { IListTrack, ITrack } from "./types/track";
import { Grid, Box } from '@material-ui/core'
import { TrackItem } from "./TrackItem";
import CircularProgress from '@material-ui/core/CircularProgress';


interface TrackListProps {
    tracks: ITrack,
    showModal: any,
    setShowModal: any
    songId: any,
    setSongId: any
}

export const TrackList: React.FC<TrackListProps> = ({ tracks, showModal, setShowModal , songId, setSongId}) => {
    const [data, setData]: any = useState([]);

    useEffect(() => {
        console.log(tracks.items);
        setData(tracks.items)
        console.log(data);
    },[tracks.items])

  

    return (
        <Grid container direction="column">
            <Box p={2}>                
                {data 
                ? data.map((track: any) =>
                    <TrackItem
                        key={track.id}
                        track={track}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        setSongId={setSongId}
                    />
                ):  <CircularProgress />
                }
            </Box>            
        </Grid>     
    );
};