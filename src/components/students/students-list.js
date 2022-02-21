import React, {useState,useEffect} from "react";
import MaterialTable from "@material-table/core";
import {getFetchWithProps, getFetchWithPropsPlain} from "../../services/fetcher";
import TableIcons from "../tableIcons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Options from "../table-options";
import StudentListItem from "./student-list-item";
//import {Modal} from "@mui/material";
import {Link, Outlet, useNavigate} from 'react-router-dom'
import {toast, Zoom} from "react-toastify";
import {Card, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Code} from "@material-ui/icons";
import {ExportCsv, ExportPdf} from "@material-table/exporters";


const StudentList = () =>{

    const [data, setData]=useState({});
    const [loading, setLoading] =useState(false);
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const [showModalDialog, setShowModalDialog] =useState(false)
    const[student, setStudent] =useState(null)
    const navigate=useNavigate();
    const login=localStorage.getItem('user');
    const user=JSON.parse(login);


    Options.exportMenu= [{
        label: 'Export PDF',
        exportFunc: async (cols, datas) => {
            let res=await getFetchWithPropsPlain('/students',user,'Please wait... Fetching Data.')
            ExportPdf(cols, res.data, 'Students List')
        }
    }, {
        label: 'Export CSV',
        exportFunc: async (cols, datas) => {
            let res=await getFetchWithPropsPlain('/students',user,'Please wait... Fetching Data.')
            ExportCsv(cols,res.data , 'Students List')
        }
    }]
    const columns = [

        { title: "Student UID", field: "id", resizeable:true },
        { title: "FirstName", field: "firstName", resizeable:true },
        { title: "LastName", field: "lastName", resizeable:true },
        { title: "ID Number", field: "idNumber", resizeable:true },
        { title: "Physical Address", field: "address", resizeable:true},
        { title: "Email Address", field: "email", resizeable:true },
        { title: "Phone Number", field: "phone", resizeable:true },
        { title: "Created By", field: "creator", resizeable:true },
        { title: "Guardian", field: "guardian", render: g=>g?.firstName+' '+g?.lastName},
        { title: "School ", field: "school", render: school=>school?.name},
        { title: "Agency", field: "agency", render: a=>a?.firstName+' '+a?.lastName },
        { title: "Subjects", field: "subjects", render: s=>{
            return <a href={'#'} onClick={()=>{showStudentSubjects(s)}} >{'Show Subjects'}</a>
            } },

    ];

    const SubjectListApp=({student})=>{
        return (
            <div style={{minWidth: '50%', borderRadius:'20px', border:'1px solid lightblue', margin:'10px'}}>
                <h5 style={{margin:'10px'}}>SUBJECTS FOR: {(student.firstName+" "+student.lastName).toUpperCase()}</h5>
                <hr style={{border: '2px solid blue'}}/>
                <List style={{margin:'10px'}}>
                    {
                        student.subjects.map(s=>{
                            return(
                                <ListItem disablePadding key={s.id}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Code />
                                        </ListItemIcon>
                                        <ListItemText primary={s.name +" : "+s.classfication} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>

        )
    }

    const showStudentSubjects =(s)=>{
        if(s.subjects){

            toast(<SubjectListApp student={s} />,{
                autoClose: false,
                transition: Zoom,
                position:'top-center'
            })
        }else{
            toast('This student has not subscribed to any subject.',{
                autoClose: 1500,
                type: 'warning',
                position:'top-center',
                transition: Zoom,
            })
        }
    }
    const handleEditModal=(rowData)=>{
        setStudent(rowData);
        navigate("/student-list-item",{state:JSON.stringify(rowData)})
    }

    const handleModalClose=()=>{
        setShowModalDialog(false)
    }

    const addStudentHandler=()=>{
        setStudent(null)
        navigate("/student-list-item")
    }


    const actions = [
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
                onClick: addStudentHandler,
            },
        ];

    return (
        <div style={{display: 'flex', height: '100%'}}>
            <Modal contentClassName={"big-modal"} variant="primary"  show={showModalDialog} onHide={handleModalClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title variant="primary">New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StudentListItem studentList={JSON.stringify(data)}
                                student={JSON.stringify(student)}
                                addStudentHandler={addStudentHandler}
                                setShowModalDialog={setShowModalDialog}
                                user={JSON.stringify(user)}
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
                    isLoading={loading}
                    options={Options}
                    onPageChange={((page, pageSize) =>{
                        setPage(page);
                        setPageSize(pageSize)
                    } )}
                    onRowsPerPageChange={(pageSize1 => setPageSize(pageSize1))}
                    data={(query) =>(

                        new Promise((resolve, reject) => {
                            let url = "/students?";
                            url += "size=" + pageSize;
                            url += "&page=" + page;
                            fetch(url, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + user?.token
                                }
                            })
                                .then((response) => response.json())
                                .then((result) => {
                                    resolve({
                                        data: result.data.filter(s=>{
                                            return (s?.firstName.toLowerCase().includes(query?.search?.toLowerCase())
                                            || s?.lastName.toLowerCase().includes(query?.search?.toLowerCase())
                                            || s?.idNumber.toLowerCase().includes(query?.search?.toLowerCase())
                                            || s?.address.toLowerCase().includes(query?.search?.toLowerCase())
                                            || s?.email.toLowerCase().includes(query?.search?.toLowerCase())
                                            || s?.phone.toLowerCase().includes(query?.search?.toLowerCase())
                                            || s?.guardian?.firstName?.toLowerCase().includes(query?.search?.toLowerCase())
                                            || s?.guardian?.lastName?.toLowerCase().includes(query?.search?.toLowerCase())
                                            || s.agency?.firstName?.toLowerCase().includes(query?.search?.toLowerCase())
                                            || s.agency?.lastName?.toLowerCase().includes(query?.search?.toLowerCase())
                                            || s?.school?.name?.toLowerCase().includes(query?.search?.toLowerCase())
                                            || s?.school?.address?.toLowerCase().includes(query?.search?.toLowerCase()))
                                        }),
                                        rowsPerPage:pageSize,
                                        page: page,
                                        totalCount: result.total,
                                    });
                                });
                        }))
                    }
                    columns={columns}
                    title={"Students List"}
                />
            </div>
        </div>

    )
}

export  default StudentList;
