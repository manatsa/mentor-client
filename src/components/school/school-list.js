import React, {useState,useEffect} from "react";
import MaterialTable from "@material-table/core";
import {ExportCsv, ExportPdf} from "@material-table/exporters";
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import {getFetchWithProps, getFetchWithPropsPlain} from "../../services/fetcher";
import TableIcons from "../tableIcons";
import SchoolItem from "./school-item";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


const SchoolList = () =>{

    const [data, setData]=useState([]);
    const[loading, setLoading] =useState(false)
    const [showModalDialog, setShowModalDialog] =useState(false)
    const[school, setSchool] =useState(null)

    const login=localStorage.getItem('user');
    const user=JSON.parse(login);

    useEffect(()=>{
        setLoading(true)
        const fetchSchools=async ()=>{
            let result= await getFetchWithPropsPlain('/schools',user,'Please wait... Fetching list of schools.');
            setData(result);
            setLoading(false)
        }

        fetchSchools();
    },[])


 //String name;String address;String phone;String email;
    const columns = [

        { title: "School UID", field: "id", resizeable:true },
        { title: "School Name", field: "name", resizeable:true },
        { title: "Physical Address", field: "address", resizeable:true},
        { title: "Email Address", field: "email", resizeable:true },
        { title: "Phone Number", field: "phone", resizeable:true },
        { title: "Created By", field: "creator", resizeable:true },
        { title: "Create Date", field: "createDate", resizeable:true },

    ];

    const handleEditModal=(rowData)=>{
        setSchool(rowData);
        console.log(JSON.stringify(data))
        setShowModalDialog(true)
    }

    const handleModalClose=()=>{
        setShowModalDialog(false)
    }

    const addSchoolHandler=()=>{
        setSchool(null)
        setShowModalDialog(true)
    }

    const options = {
        grouping: true,
        search: true,
        sorting: true,
        columnsButton: true,
        actionsColumnIndex: -1,
        pageSize: 5,
        pageSizeOptions: [5, 10, 20, 50, 100],
        exportMenu: [{
            label: 'Export PDF',
            exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Schools List')
        }, {
            label: 'Export CSV',
            exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Schools List')
        }]
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
                    <SchoolItem schoolList={JSON.stringify(data)} school={JSON.stringify(school)} addSchoolHandler={addSchoolHandler} />
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
                    options={options}
                    data={data}
                    columns={columns}
                    isLoading={loading}
                    title={"Schools List"}
                />
            </div>
        </div>

    )
}

export  default SchoolList;