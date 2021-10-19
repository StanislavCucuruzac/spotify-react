import React from "react";
import {useRef} from 'react'
import {Button} from '@material-ui/core'
import { styled } from '@material-ui/styles';

interface FileUploadProps {
    file: any;
    setFile: Function
    accept: string
    setData: any
    data: any
}

export const TrackUpload: React.FC<FileUploadProps> = ({file, setFile, accept, children, setData, data}) => {
    const inputAddPhotoRef = useRef<any>();
    //const inputField = React.useRef() as React.MutableRefObject<HTMLInputElement>
    setData("hello"); 
    const uploadTrack = (event: any) =>{
        console.log(event.target.files)
        setData([...data, {File: event.target.files[0]}])
    }
    const Input = styled('input')({
        display: 'none',
      });
      
       return(
        <label htmlFor="contained-button-file">
           <Input onChange={uploadTrack} accept="image/*" id="contained-button-file" multiple type="file" />
            <Button variant="contained"  component="span">
                Upload        
             </Button>    
        </label>
     

    )
}