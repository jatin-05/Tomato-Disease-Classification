import { useState, useEffect } from "react";
import axios from 'axios';



import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import ReactDOM from 'react-dom';
import {useDropzone} from 'react-dropzone'






export const ImageUpload = () => {

    const [selectedfile , setSelectedfile] = useState() ;
    const [image , setImage] = useState(false) ;
    const [data , setData] = useState() ; 
    const [preview , setPreview] = useState() ;
    const [confidence , setConfidence] = useState(0) ; 
    const[isloading ,setIsloading] = useState(false) ; 
    
        const onSelectedFile =(files) =>{
            if(!files || files.length ==0){
                setSelectedfile(undefined) ;
                setImage(false) ;
                setData(undefined) ;
                return ; 
            }
            setSelectedfile(files[0]) ; 
            setImage(true) ;
    
        };
    
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: onSelectedFile, // Directly assign the onSelectedFile function
        accept: '.jpg, .jpeg, .png', // Optional: specify accepted file types
      });




    

    useEffect(() => {
        if(!selectedfile){
            setPreview(undefined) ;
            return ;
        }
        const objectUrl = URL.createObjectURL(selectedfile) ;
        setPreview(objectUrl ) ; 
    }, [selectedfile]) ;

    useEffect(() => {
      if(!preview){
        return ;
      }
      setIsloading(true) ; 
      sendFile() ; 
    
    }, [preview]) ; 



    const sendFile = async () =>{
        if(image){
            let formData = new FormData() ;
            formData.append("file" , selectedfile) ;
            try {
                let res = await axios({
                    method : "post" , 
                    url: import.meta.env.VITE_FAST_API_URL,
                    data :formData
                }) ;

                setData(res.data);
                setIsloading(false)
                let confi = (parseFloat(res.data.confidence) *100).toFixed(2) ; 
                setConfidence(confi) ;
            } catch (error) {
                console.log("sooooooome errrorrrr occcccoured" , error) ;
            }
            
        }
    }
    





    return( 
        <div className="  ">
           
        <Card sx={{ maxWidth: 345 }}>


            {image &&
            <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image={preview}
                alt="green iguana"
                />
                
            </CardActionArea>}

            {
            !image &&
            // <CardContent>
            //     <DropzoneArea
            //         acceptedFiles={['image/*']}
            //         dropzoneText={"Drag and drop an image here or click"}
            //         onChange={onSelectedFile}
                    
            //     />

            // </CardContent>
            
                <CardContent   style={styles.dropzone} {...getRootProps()}>
                {/* <div   style={styles.dropzone} {...getRootProps()}> */}
                
                <input {...getInputProps()} />
                <p>Drag & drop image files here, or click to select files</p>
                
                {/* </div> */}
                </CardContent>

            }

            {isloading &&
                <CardContent className="flex flex-col items-center ">
                    {/* <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full " /> */}
                    <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-pulse mx-auto"></div>
      
                    <div >Processing</div>
                </CardContent>

            }
            {data &&
                <CardContent>
                    <div className="grid grid-cols-2 gap-4  justify-items-center">
                        <Typography> {data.class}</Typography>
                        <Typography> confidence:{confidence }</Typography>
                    </div>
                </CardContent>
                

            }




        </Card>

    
    
        </div>
    
        );
}


const styles = {
    dropzone: {
      border: '2px dashed #1976d2',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f1f1f1',
      cursor: 'pointer',
      borderRadius: '5px',
    },
  };