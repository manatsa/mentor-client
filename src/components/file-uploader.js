import React from 'react';
import {IconButton, Input, TextField} from "@mui/material";
import {PhotoCamera, FileCopy} from "@mui/icons-material";

function FileUploader(props) {
    return (
        <div>
            <div className={'d-flex flex-row bd-highlight mb-3 justify-content-around'}>
                <label htmlFor="icon-button-file">
                    <TextField inputProps={{ accept: props.fileType, }} style={{display: 'none'}} id="icon-button-file" type={'file'} onChange={props?.onSelect}/>
                    <IconButton color="success" aria-label="upload file" component="span"
                                style={{border: '2px solid green'}}>
                        {props?.fileType && props.fileType==='image'?<PhotoCamera/>:<FileCopy/>}
                    </IconButton>
                </label>


                <div className={'bg-success'} style={{padding:'0px 40px', borderRadius:'20px', color:'white',}}>
                    <label>{props.file?'Name:'+props.file?.name:null}</label><br/>
                    <label>{props.file?'Type:'+props.file?.type:null}</label><br/>
                    <label>{props.file?'Size :'+((props.file.size/1024)/1024).toFixed(2)+'MB':null}</label><br/>

                </div>
            </div>
            <div className={'d-flex justify-content-center'}>
                {props.showUploadError &&<span className={'text-danger'} >File too large. Max allowed file size is {props.limit}MB</span>}
            </div>

        </div>

    );
}

export default FileUploader;