import React, { useEffect, useState } from "react";
import { Grid, Card, Button, Box } from '@material-ui/core'
import { Link } from "react-router-dom";
import { Create } from "./create";
import { ITrack } from "../types/track";
import { TrackList } from "../TrackList";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel'
import { Select, MenuItem, Snackbar } from '@material-ui/core'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';

export const Tracks = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                marginTop: theme.spacing(2),
            },
        },
    }));
    const classes = useStyles();
    const [tracks, setTracks]: any = useState([])
    //  const tracksList: ITrack[] = [
    //    {_id: "1", name: "Trak1", duration: 4, price: 5, slug: 'https://localhost:5000/LocalStorage/}'}

    // ]
    const [showModal, setShowModal] = useState(false)
    const handleClose = () => {
        setShowModal(false);
    };
    const [songId, setSongId] = useState(0);
    const [playlist, setPlaylist]: any = useState([])
    const [playlistId, setPlaylistId] = useState()
    const handleChangeSelect = (event: any) => {
        setPlaylistId(event.target.value);
    };
    const [successAdded, setSuccessAdded]= useState(false);
    const Add = () =>{
        if (localStorage.getItem('token') !== null) {
            const token = localStorage.getItem('token')
        axios.post("https://localhost:44345/api/SongPlaylist", {playlistId: playlistId, songId: songId},
        { headers: {"content-type": "application/json", "Authorization": `Bearer ` +   
        token}})
           .then(res => {
               console.log(res.data);
               setShowModal(false);  
               setSuccessAdded(true);             
           })
           .catch((error) => {
                   console.log(error)
               });
       }   
    }
    
    const [searchString, setSearchString] = useState('');
    const searchByName = (event: any) =>{
        setSearchString(event.target.value);
        console.log(event.target.value)
    }
       
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0)
    const handleChange = (event: any, value: any) => {
        setPage(value);
        setPageCount(value - 1);
        console.log(value);
    };
    useEffect(() => {

        if (localStorage.getItem('token') !== null) {
            const token = localStorage.getItem('token')
            console.log(token)
            axios.get('https://localhost:44345/api/Playlist',
                {
                    headers: {
                        "content-type": "application/json", "Authorization": `Bearer ` +
                            token
                    }

                }).then(res => {
                    console.log(res.data);
                    setPlaylist(res.data);
                })
                .catch((error) => {
                    console.log(error)
                });
            axios.post<ITrack>('https://localhost:44345/api/Song/paginated-search',
                {
                    pageIndex: pageCount,
                    pageSize: 5,
                    columnNameForSorting: "name",
                    sortDirection: "asc",
                    requestFilters: {
                        logicalOperator: 0,
                        filters: [
                          {
                            path: "name",
                            value: searchString
                          }
                        ]
                      }
                },

                {
                    headers: {
                        "content-type": "application/json", "Authorization": `Bearer ` +
                            token
                    }

                })
                .then(res => {
                    console.log(res.data);
                    setTracks(res.data);
                })
                .catch((error) => {
                    console.log(error)
                });
            console.log(tracks.items)
        }
        else {
            <Redirect to="/login" />;
        }

    }, [page, searchString]);   

    return (
        <Grid container justifyContent='center'>
            <Card style={{ width: 900, backgroundColor: 'grey' }}>
            <Snackbar autoHideDuration={6000} open={successAdded}>
            <Alert severity="success">This is a success alert — check it out!</Alert>
            </Snackbar>
                <Box p={3}>
            <TextField label="Search" placeholder="Search..." onChange={searchByName} /> 
                    <Grid container justifyContent='space-between'>
                        <h1>List of tracks</h1>
                        <Button className="createBtn">
                            <Link to="/tracks/create">
                                Create
                            </Link>
                        </Button>
                    </Grid>
                </Box>
                <TrackList tracks={tracks} showModal={showModal} setShowModal={setShowModal} songId={songId} setSongId={setSongId} />
                <Modal open={showModal} onClose={handleClose} center>
                    <div style={{minWidth: 250 }}>
                        <h4>Playlist Name</h4>
                        <InputLabel id="demo-simple-select-label">Name of Playlist</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={playlistId}
                            label="Name of Playlist"
                            onChange={handleChangeSelect}
                        >
                            {playlist.map((playlist: any) => {
                                return <MenuItem value={playlist.id}>{playlist.name}</MenuItem>
                            })}
                        </Select> 
                        <br/>
                        <Button onClick={Add} style={{position: "absolute", right: 15, bottom: 20}} variant="contained">Add</Button>
                    </div>
                </Modal>
            </Card>
            <div className={classes.root}>
                <Pagination color={"secondary"}
                    count={Math.ceil(parseInt(tracks.total) / parseInt(tracks.pageSize))}
                    variant="outlined" shape="rounded" page={page} onChange={handleChange} />
            </div>


        </Grid>
    );
};