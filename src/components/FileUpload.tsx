import React from "react";
import {useRef} from 'react'
import {Button} from '@material-ui/core'
import { styled } from '@material-ui/styles';




interface FileUploadProps {
    file: any;
    setFile: Function
    accept: string
}

export const FileUpload: React.FC<FileUploadProps> = ({file, setFile, accept, children}) => {
    const inputAddPhotoRef = useRef<any>();
    //const inputField = React.useRef() as React.MutableRefObject<HTMLInputElement>

    const handleAddPhoto = () => {
        inputAddPhotoRef.current.click();
    };
    const Input = styled('input')({
        display: 'none',
      });
      
       return(
        <label htmlFor="contained-button-file">
           <Input accept="image/*" id="contained-button-file" multiple type="file" />
            <Button variant="contained"  component="span">
                Upload        
             </Button>    
        </label>
     

    )
}