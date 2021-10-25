import React, { useEffect } from "react";
import { StepWrapper } from "../../components/StepWrapper";
import { Grid, Button } from '@material-ui/core';
import { useState } from "react";
import { TextField , Select, MenuItem, FormControl} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel'
import { FileUpload } from "../FileUpload";
import { TrackUpload } from "../TrackUpload"
import axios from "axios";
import { Redirect } from "react-router-dom";



export const Create = () => {
    const[artists, setArtists]: any = useState([]);
    const [activeStep, setActiveStep] = useState(0)
    const [nameOfTrack, setNameOfTrack]: any = useState('');
    const [file, setFile]: any = useState([]);
    const [artistId, setArtistId] = useState('');
    

    const next = () => {
       
        if(activeStep ==0){
            setActiveStep(prev => prev + 1)
        }        
        if(activeStep ==1){
            setActiveStep(prev => prev + 1)
                setData([...data, {ArtistId: artistId, Name: nameOfTrack}])
        }
        if(activeStep ==2){    
            setActiveStep(prev => prev + 1) 
            let formData = new FormData();
            formData.append("File", file[0][0]);  
            formData.append("Name", nameOfTrack);  
            formData.append("ArtistId", artistId); 
            console.log(file[0][0]);
            console.log(formData);            
            if(localStorage.getItem('token') !== null){
                const token = localStorage.getItem('token')
         console.log(token)
            axios.post('https://localhost:44345/api/Song', formData,
             { headers: {"Content-Type": "multipart/form-data",
             "Authorization": `Bearer ` +   
             token}})
                .then(res => {
                    console.log(res.data);                   
                })
                .catch((error) => {
                        console.log(error)
                    });
            }   
           
        }

    }
    const back = () => {
        setActiveStep(prev => prev - 1)
    }
    
    const changeData = (value: any) => {
        setFile([...file,  value ]);
    }
    const [data, setData]: any = useState([]);    
  
    const setTrackName = (event: any) => {
      setNameOfTrack(event.target.value);
    }
    const setArtistName = (event: any) => {
        setData([...data, { ArtistId: event?.target.value }])
    }

    

     const handleChangeSelect = (event: any) => {
        setArtistId(event.target.value);
    };
    useEffect(() => {
             console.log(data)
        if(localStorage.getItem('token') !== null){
            const token = localStorage.getItem('token')
     console.log(token)
        axios.get('https://localhost:44345/api/artists',
         { headers: {"content-type": "application/json", "Authorization": `Bearer ` +   
         token}})
            .then(res => {
                console.log(res.data);
                setArtists(res.data)
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
        <Grid container>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                    <Grid container direction={"column"} style={{ padding: 20 }}>
                        <TextField onChange={setTrackName}
                            style={{ marginTop: 10 }}
                            label={"Name of track"}
                        />
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Name of Artist</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={artistId}
                            label="Name of Artist"
                            onChange={handleChangeSelect}
                        >
                            {artists.map((artist: any) =>{
                                return <MenuItem value={artist.id}>{artist.name}</MenuItem>  
                            })}                                                     
                        </Select>
                        </FormControl>

                    </Grid>
                }
                {/* {activeStep === 1 &&
               <FileUpload file={''} setFile={() => ({})} accept={"image/"}>
                   <Button>Upload img</Button>
               </FileUpload>
               } */}
                {activeStep === 1 &&
                    <TrackUpload data={file} setData={changeData} file={''} setFile={() => ({})} accept={"audio/*"}>
                        <Button>Upload song</Button>
                    </TrackUpload>
                }
            </StepWrapper>
            <Grid container justifyContent='space-between'>
                <Button disabled={activeStep === 0} style={{ color: 'white' }} onClick={back}>Back</Button>
                <Button style={{ color: 'white' }} onClick={next}>Next</Button>
            </Grid>
        </Grid>

    )
}