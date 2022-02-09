import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import useAuth from '../../../auth/useAuth';
import { postFetch } from '../../../services/fetcher';

const AttachmentsListItem = () => {



    const [selectedFile, setSelectedFile] = useState(null);


    const { user } = useAuth();

    // On file select (from the pop up) 
    const onFileChange = event => {
        // Update the state 
        setSelectedFile(event.target.files[0]);
    };

    // On file upload (click the upload button) 
    const onFileUpload = () => {
        // Create an object of formData 
        const formData = new FormData();

        let name = selectedFile.name;
        let type = selectedFile.type;
        //alert("Filename: " + name + " , Type: " + type);

        // Update the formData object 
        formData.append(
            "myFile",
            selectedFile,
            selectedFile.name
        );

        alert(JSON.stringify(formData))

        // Details of the uploaded file 
        console.log(selectedFile);

        // Request made to the backend api
        // Send formData object 
        //useEffect(() => {
        const url = "/attachments";
        const callApi = async () => {
            let res = await postFetch(url, user, formData);
            console.log(res)
        };

        callApi();

        //  }, []);

    };

    // File content to be displayed after 
    // file upload is complete 
    const fileData = () => {
        if (selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {selectedFile.name}</p>
                    <p>File Type: {selectedFile.type}</p>
                    <p>
                        Last Modified:{" "}
                        {selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };


    return (
        <div>

            <h4>
                File Upload using React!
            </h4>
            <div>
                <input type="file" onChange={onFileChange} />
                <button onClick={onFileUpload}>
                    Upload!
                </button>
            </div>
            {fileData()}
        </div>
    );

}

export default AttachmentsListItem; 