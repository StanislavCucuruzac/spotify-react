import React, { useEffect } from "react";
import { StepWrapper } from "../../components/StepWrapper";
import { Grid, Button } from '@material-ui/core';
import { useState } from "react";
import { TextField } from "@material-ui/core";
import { FileUpload } from "../FileUpload";
import {TrackUpload} from "../TrackUpload"

export const Create = () => {
    const [activeStep, setActiveStep] =useState(0)
    const next = () => {
        if(activeStep !==2){
            setActiveStep(prev => prev +1)
        }
       
    }
    const back = () => {
        setActiveStep(prev => prev -1)
    }
    const changeData = (value: any) =>{
        setData([...data, {File: value}]);
    }
    const[data, setData]: any = useState([]);
    useEffect(()=>{
        console.log(data)
    })
   const setTrackName =(event: any) =>{
        setData([...data, {Name: event?.target.value}])
   }
   const setArtistName =(event: any) =>{
    setData([...data, {ArtistId: event?.target.value}])
}

    return (
        <Grid container>
            <StepWrapper activeStep={activeStep}>
               {activeStep === 0 &&
               <Grid container direction ={"column"} style={{padding: 20}}>
                   <TextField onChange={setTrackName}
                   style={{marginTop: 10}}
                   label={"Name of track"}
                   />
                   <TextField onChange={setArtistName}
                   style={{marginTop: 10}}
                   label={"Name of Artis"}                  
                   />
               </Grid>
               }
                {activeStep === 1 &&
               <FileUpload file={''} setFile={() => ({})} accept={"image/"}>
                   <Button>Upload img</Button>
               </FileUpload>
               }
                {activeStep === 2 &&
               <TrackUpload data={data} setData={changeData} file={''} setFile={() => ({})} accept={"image/"}>
               <Button>Upload song</Button>
           </TrackUpload>
               }
            </StepWrapper>
            <Grid container justifyContent= 'space-between'>
                <Button disabled={activeStep===0} style={{color: 'white'}} onClick={back}>Back</Button>
                <Button style={{color: 'white'}} onClick={next}>Next</Button>               
           </Grid>
        </Grid>

    )
}