import React, {useState,useEffect} from "react";
import MaterialTable from "@material-table/core";
import {getFetchWithProps, getFetchWithPropsPlain} from "../../services/fetcher";
import TableIcons from "../tableIcons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Options from "../table-options";
import {ExportCsv, ExportPdf} from "@material-table/exporters";
import GuardiansListItem from "./guardians-list-item";


const GuardiansList = () =>{

    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const [showModalDialog, setShowModalDialog] =useState(false)
    const[teacher, setTeacher] =useState(null);
    const [loading, setLoading] =useState(false);
    const [searchText, setSearchText] = useState('');

    const login=localStorage.getItem('user');
    const user=JSON.parse(login);



    Options.exportMenu= [{
        label: 'Export PDF',
        exportFunc: async (cols, datas) => {
            let res=await getFetchWithPropsPlain('/guardians',user,'Please wait... Fetching Data.')
            ExportPdf(cols, res.data, 'Guardians List')
        }
    }, {
        label: 'Export CSV',
        exportFunc: async (cols, datas) => {
            let res=await getFetchWithPropsPlain('/guardians',user,'Please wait... Fetching Data.')
            ExportCsv(cols,res.data , 'Guardians List')
        }
    }]


    const handleSearch = text =>{
        setSearchText(text);
    }
    const columns = [

        { title: "Guardian UID", field: "id", resizeable:true},
        { title: "FirstName", field: "firstName", resizeable:true, filterable: true  },
        { title: "LastName", field: "lastName", resizeable:true, filterable: true },
        { title: "ID Number", field: "idNumber", resizeable:true },
        { title: "Physical Address", field: "address", resizeable:true},
        { title: "Email Address", field: "email", resizeable:true },
        { title: "Phone Number", field: "phone", resizeable:true },
        { title: "Created By", field: "creator", resizeable:true },


    ];

    const handleEditModal=(rowData)=>{
        setTeacher(rowData);
        setShowModalDialog(true)
    }

    const handleModalClose=()=>{
        setShowModalDialog(false)
    }

    const addTeacherHandler=()=>{
        setTeacher(null)
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
                onClick: addTeacherHandler,
            },
        ];

    return (
        <div style={{display: 'flex', height: '100%'}}>
            <Modal size="lg" variant="primary" show={showModalDialog} onHide={handleModalClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title variant="primary">New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GuardiansListItem
                        school={JSON.stringify(teacher)}
                        addSchoolHandler={addTeacherHandler}
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
                    onSearchChange={text=>handleSearch(text)}
                    onPageChange={((page, pageSize) =>{
                        setPage(page);
                        setPageSize(pageSize)
                    } )}
                    onRowsPerPageChange={(pageSize1 => setPageSize(pageSize1))}
                    data={(query) =>(

                        new Promise((resolve, reject) => {
                            //console.log('Query :'+JSON.stringify(query))
                            let url = "/guardians?";
                            url += "size=" + pageSize;
                            url += "&page=" + page;
                            url += "&search="+searchText;
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
                                        data: result.data.filter(g=>{
                                            return (g.firstName?.toLowerCase().includes(query.search.toLowerCase())
                                            || g?.lastName?.toLowerCase().includes(query?.search?.toLowerCase())
                                            || g?.address?.toLowerCase().includes(query?.search?.toLowerCase())
                                            || g?.idNumber?.toLowerCase().includes(query?.search?.toLowerCase())
                                            || g?.email?.toLowerCase().includes(query?.search?.toLowerCase())
                                            || g?.phone?.toLowerCase().includes(query?.search?.toLowerCase()))
                                        }),
                                        rowsPerPage:pageSize,
                                        page: page,
                                        totalCount: result.total,
                                    });
                                });
                        }))
                    }
                    columns={columns}
                    title={"Guardians List"}
                />
            </div>
        </div>

    )
}

export  default GuardiansList;