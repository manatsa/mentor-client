import React, {useState,useEffect} from "react";
import MaterialTable from "@material-table/core";
import {ExportCsv, ExportPdf} from "@material-table/exporters";
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import {getFetchWithProps, getFetchWithPropsPlain} from "../../services/fetcher";
import TableIcons from "../tableIcons";
import SchoolItem from "./school-item";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Options from "../table-options";


const SchoolList = () =>{

    const [data, setData]=useState([]);
    const[loading, setLoading] =useState(false)
    const [showModalDialog, setShowModalDialog] =useState(false)
    const[school, setSchool] =useState(null)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)

    const login=localStorage.getItem('user');
    const user=JSON.parse(login);


    Options.exportMenu= [{
        label: 'Export PDF',
        exportFunc: async (cols, datas) => {
            let res=await getFetchWithPropsPlain('/schools',user,'Please wait... Fetching Data.')
            ExportPdf(cols, res.data, 'Schools List')
        }
    }, {
        label: 'Export CSV',
        exportFunc: async (cols, datas) => {
            let res=await getFetchWithPropsPlain('/schools',user,'Please wait... Fetching Data.')
            ExportCsv(cols,res.data , 'Schools List')
        }
    }]

 //String name;String address;String phone;String email;
    const columns = [

        { title: "School UID", field: "id", resizeable:true },
        { title: "School Name", field: "name", resizeable:true },
        { title: "Physical Address", field: "address", resizeable:true},
        { title: "Email Address", field: "email", resizeable:true },
        { title: "Phone Number", field: "phone", resizeable:true },
        { title: "Created By", field: "creator", resizeable:true },


    ];

    const handleEditModal=(rowData)=>{
        setSchool(rowData);
        setShowModalDialog(true)
    }

    const handleModalClose=()=>{
        setShowModalDialog(false)
    }

    const addSchoolHandler=()=>{
        setSchool(null)
        setShowModalDialog(true)
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
                onClick: addSchoolHandler,
            },
        ];

    return (
        <div style={{display: 'flex', height: '100%'}}>
            <Modal size="lg" variant="primary" show={showModalDialog} onHide={handleModalClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title variant="primary">New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SchoolItem schoolList={JSON.stringify(data)}
                                school={JSON.stringify(school)}
                                addSchoolHandler={addSchoolHandler}
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
                    isLoading={loading}
                    options={Options}
                    onPageChange={((page, pageSize) =>{
                        setPage(page);
                        setPageSize(pageSize)
                    } )}
                    onRowsPerPageChange={(pageSize1 => setPageSize(pageSize1))}
                    data={(query) =>(

                        new Promise((resolve, reject) => {
                            let url = "/schools?";
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
                                            return (s.name.toLowerCase().includes(query.search.toLowerCase())
                                                || s.address.toLowerCase().includes(query.search.toLowerCase())
                                            || s.email.toLowerCase().includes(query.search.toLowerCase())
                                            || s.phone.toLowerCase().includes(query.search.toLowerCase()))
                                        }),
                                        rowsPerPage:pageSize,
                                        page: page,
                                        totalCount: result.total,
                                    });
                                });
                        }))
                    }
                    columns={columns}
                    title={"Schools List"}
                />
            </div>
        </div>

    )
}

export  default SchoolList;