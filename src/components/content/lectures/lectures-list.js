import React, {useState,useEffect} from "react";
import MaterialTable from "@material-table/core";
import {ExportCsv, ExportPdf} from "@material-table/exporters";
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import {getFetchWithPropsPlainForUser} from "../../../services/fetcher";
import TableIcons from "../../tableIcons";
import LectureListItem from "./lectures-list-item";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Options from "../../table-options";
import {Link} from "@mui/material";
import {Image} from "react-bootstrap";


const LectureList = () =>{

    const [data, setData]=useState([]);
    const[loading, setLoading] =useState(false);
    const [showModalDialog, setShowModalDialog] =useState(false);
    const[lecture, setLecture] =useState(null);
    const [showPic, setShowPic] = useState(false);
    const [picture, setPicture] = useState(null);

    const login=localStorage.getItem('user');
    const user=JSON.parse(login);

    useEffect(()=>{
        setLoading(true)
        const fetchSchools=async ()=>{
            let result= await getFetchWithPropsPlainForUser('/lectures',user,'Please wait... Fetching list of schools.');
            setData(result);
            console.log("LESSONS: ",result)
            setLoading(false)
        }

        fetchSchools();
    },[])


    //String name;String address;String phone;String email;
    const columns = [

        { title: "Lecture UID", field: "id"},//, render:(data)=><Button onClick={()=>handleLectureClick(data)}>{data}</Button> },
        { title: "Lecture Name", field: "name"},
        {title: "Picture Attachment", field: "picture", render:
                    data=>data?<Link onClick={()=>openPicture(data)} variant={'button'} component={'button'}>
                        Open
        </Link>:null },
        { title:"Picture Type", field: "pictureContentType"}


    ];

    const handleLectureClick=lectureData=>{
        alert(lectureData);
    }

    const handleEditModal=(rowData)=>{
        setLecture(rowData);
        setShowModalDialog(true)
    }

    const handleModalClose=()=>{
        setShowModalDialog(false)
    }

    const addLectureHandler=()=>{
        setLecture(null)
        setShowModalDialog(true)
    }

    const openPicture=(data)=>{
        //setPicture(`data:${data.pictureContentType};base64,${data.picture}`);
        setPicture(`data:image/png;base64,${data.picture}`);

        console.log("PICTURE: "+picture)
        setShowPic(true);
    }

    const handlePicModalClose =()=>{
        setShowPic(false);
    }


    const actions =
        [
            {
                icon: TableIcons.Edit,
                tooltip: "Edit",
                onClick: (event, rowData) => { return handleEditModal(rowData); },
            },
            {
                icon: TableIcons.Delete,
                tooltip: "Delete",
                onClick: (event, rowData) => alert("You want to delete " + JSON.stringify(rowData)),
            },
            {
                icon: TableIcons.Add,
                tooltip: "Add",
                isFreeAction: true,
                onClick: addLectureHandler,
            },
        ];

    return (
        <div style={{display: 'flex', height: '100%'}}>
            <Modal size="lg" variant="primary" show={showPic} onHide={handlePicModalClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title variant="primary">Attached Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <img src={{uri:picture}} width={'200px'} height={'200px'} style={{margin:'10px'}} />
                        <span>{picture?.pictureContentType}</span>
                    </div>

                </Modal.Body>
            </Modal>
            <Modal size="lg" variant="primary" show={showModalDialog} onHide={handleModalClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title variant="primary">New Lesson</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LectureListItem lectures={JSON.stringify(data)}
                                lecture={JSON.stringify(lecture)}
                                addLectureHandler={addLectureHandler}
                                setShowModalDialog={setShowModalDialog}
                                user={user}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleModalClose}>Close</Button>
                    </div>
                </Modal.Footer>
            </Modal>


            <div style={{flexGrow: 1}}>
                <MaterialTable
                    actions={actions}
                    icons={TableIcons}
                    options={Options}
                    data={data}
                    columns={columns}
                    isLoading={loading}
                    title={"List of Lessons"}
                />
            </div>
        </div>

    )
}

export  default LectureList;