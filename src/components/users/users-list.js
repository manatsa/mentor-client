import React, { Component, useEffect, useState } from "react";
//import MaterialTable from "material-table";
import {Link, useNavigate} from 'react-router-dom'
import MaterialTable from '@material-table/core';
import TableIcons from "../tableIcons";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'
import {getFetch, putFetch, postFetch, getFetchWithProps, getFetchWithPropsPlain} from "../../services/fetcher";
import useAuth from "../../auth/useAuth";
import UserListItem from "./users-list-item";
import Form from 'react-bootstrap/Form'
import {toast, Zoom} from "react-toastify";
import {ExportCsv, ExportPdf} from "@material-table/exporters";
import Options from "../table-options";


const UsersList = () => {


    const [showListItemModal, setShowListItemModal] = useState(false);
    const [newOrEditUser, setNewOrEditUser] = useState();
    const [newPassword, setNewPassword] = useState('');
    const [data, setData] = useState([]);
    const [showNewPassModal, setShowNewPassModal] =useState(false)
    const [selectedUser, setSelectedUser] =useState(null);
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)

    const login=localStorage.getItem('user');
    const user=JSON.parse(login);
    const navigate=useNavigate();

    Options.exportMenu= [{
        label: 'Export PDF',
        exportFunc: async (cols, datas) => {
            let res=await getFetchWithPropsPlain('admin/users',user,'Please wait... Fetching Data.')
            ExportPdf(cols, res.data, 'Users List')
        }
    }, {
        label: 'Export CSV',
        exportFunc: async (cols, datas) => {
            let res=await getFetchWithPropsPlain('admin/students',user,'Please wait... Fetching Data.')
            ExportCsv(cols,res.data , 'Users List')
        }
    }]

    const handleModalClose = () => {
        setShowListItemModal(false);
        setTimeout(() => {

        }, 1000)
        window.location.reload(true);
    }


    const openModal = () => {
        //setNewItem(true)
        setNewOrEditUser({
            firstName: '',
            lastName: '',
            activated: 0,
            createdBy: user.id,
            createdDate: Date.now(),
            username: '',
            email: '',
            authorities: []

        })
        setShowListItemModal(true);
    }

    const handleEditModal = (e, data) => {
        setShowListItemModal(true);
        setNewOrEditUser(data);
        setTimeout(() => {

        }, 1000)
        //window.location.reload(true);
    }

    const addUserHandler = (user, isNew) => {
        if(isNew){
            let userlist = data;
            userlist.push(user);
            setData(userlist)
            setTimeout(() => { }, 100)
            //window.location.reload(true);
        }else{
            let list=data.filter(u=>u.id!=user.id);
            setData(list);
            setTimeout(() => { }, 100)

            //window.location.reload(true);
        }

        //window.location.reload(false);
    }

    const handlePassRestForm= async (e)=>{
        e.preventDefault()
        let data=JSON.stringify({"key":selectedUser.email, "newPassword":newPassword});
        let res=await postFetch('/account/reset-password/finish',user,data)
        setShowNewPassModal(false)
        setShowListItemModal(false);
        if(res){
            toast(JSON.stringify(res),{
                type:'info',
                autoClose:2000,
                position:'bottom-center'
            })
        }

        window.location.reload(true);
    }

    const handleNewPassModalClose=()=>{
        setShowNewPassModal(false);
        setShowListItemModal(false);
        window.location.reload(true);
    }

    const handleUserActivation=async (target)=>{
        if(!target.activated){
            let data=target.activationKey;
            let url='/activate?key='+data;
            console.log('URL:'+url+'\tDATA:'+data)

            let res=await getFetch(url,user)
            console.log('USER ACTIVATION',JSON.stringify(res))
            window.location.reload(true);
        }else{
            toast('You can not activate an active user.',{
                type:'warning',
                position:'top-center',
                transition: Zoom,
                toastId: 'userActivationID',
                autoClose:1500
            })
        }

        return null

    }

    const handleUserDeactivation=async (target)=>{

        if(target.activated){

            let data=target.email;
            let url='/deactivate?email='+data;
            console.log('URL:'+url+'\tDATA:'+data)

            let res=await getFetch(url,user)
            console.log('USER ACTIVATION',JSON.stringify(res))
            window.location.reload(true);
        }else{
            toast('You can not deactivate an inactive user.',{
                type:'warning',
                position:'top-center',
                transition: Zoom,
                toastId:'userDeactivationID',
                autoClose:1500
            })
        }



    }


    const columns = [


        { title: "First Name", field: "firstName" },
        { title: "Last Name", field: "lastName" },
        { title: "Email Address", field: "email" },
        { title: "Username", field: "login" },
        { title: "Activated", field: "activated" },
        { title: "Date Created", field: "createdDate" },
        { title: "Creator", field: "createdBy" },
        {title: "Authorities", field: "authorities"},
    ];


    const actions =
        [
            {
                icon: TableIcons.Edit,
                tooltip: "Edit",
                onClick: (event, rowData) => handleEditModal(event, rowData),
            },
            {
                icon: TableIcons.Reset,
                tooltip: 'Reset User Password',
                onClick: rowData =>{
                    setSelectedUser(rowData);
                    setShowNewPassModal(true);
                    return;
                },
            },
            {
                icon: TableIcons.Deactivate,
                openIcon: TableIcons.Deactivate,
                tooltip: 'Deactivate User',
                onClick: rowData => {
                    setSelectedUser(rowData)
                    handleUserDeactivation(rowData);
                },
            },
            {

                icon: TableIcons.Activate,
                openIcon: TableIcons.Activate,
                tooltip: 'Activate User',
                onClick: rowData => {
                    setSelectedUser(rowData)
                    handleUserActivation(rowData);
                },
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
                onClick: ()=>openModal(),
            },
            {
                icon: TableIcons.Refresh,
                tooltip: "Refresh",
                isFreeAction: true,
                onClick: ()=>window.location.reload(),
            },
        ];


    return (
        <div>
            <Modal size="lg" variant="warning" show={showNewPassModal} onHide={handleNewPassModalClose}  keyboard={true}>
                <Modal.Header closeButton>
                    <Modal.Title variant="primary">Password Reset for user: {selectedUser?.firstName} {selectedUser?.lastName} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row d-flex justify-content-center">
                        <form onSubmit={handlePassRestForm} className='col-md-6 col-md-offset-3'>
                            <div className="mb-3">
                                <label id="full_name_label" htmlFor="{'newPass'}">New Password</label>
                                <input id={'newPass'} type="password" className="form-control" value={newPassword} onChange={event => setNewPassword(event.target.value)} />
                            </div><br/>
                            <div className="row justify-content-end">
                                {/*<button className="btn btn-danger"> <Link to={'/users-list'}>Back </Link> </button>*/}
                                <button className="btn btn-danger"> Reset </button>
                            </div>
                            <br/><br/>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleNewPassModalClose}>Close</Button>
                    </div>
                </Modal.Footer>
            </Modal>
            <Modal size="lg" variant="primary" show={showListItemModal} onHide={handleModalClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title variant="primary">New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserListItem
                        {...newOrEditUser}

                        addUserHandler={addUserHandler}
                        setShowModal={setShowListItemModal}
                        setUsersData={setData}
                        target={JSON.stringify(newOrEditUser)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleModalClose}>Close</Button>
                    </div>
                </Modal.Footer>
            </Modal>
            <MaterialTable
                title="User List"
                icons={TableIcons}
                columns={columns}
                onPageChange={((page, pageSize) =>{
                    setPage(page);
                    setPageSize(pageSize)
                } )}
                onRowsPerPageChange={(pageSize1 => setPageSize(pageSize1))}
                data={(query) =>(

                    new Promise((resolve, reject) => {
                        let url = "admin/users?";
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
                                    data: result.data,
                                    rowsPerPage:pageSize,
                                    page: page,
                                    totalCount: result.total,
                                });
                            });
                    }))
                }
                options={Options}
                actions={actions}
                detailPanel={[
                    {
                        tooltip: 'Exapnd user details.',
                        render: rowData => {
                            console.log("rowdata :",JSON.stringify(rowData))
                            return (
                                <div
                                    style={{
                                        //fontSize: 100,
                                        textAlign: 'center',
                                        // color: 'blue',
                                        backgroundColor: 'white',
                                    }}
                                >
                                    <div>
                                        <div className="row">
                                            <div className="col-md-4 content-justify-end">First Name</div>
                                            <div className="col-md-4 content-justify-start">{rowData.firstName}</div>
                                        </div>
                                        <div className="row" style={{backgroundColor:'lightgrey'}}>
                                            <div className="col-md-4 content-justify-end">Last Name</div>
                                            <div className="col-md-4 content-justify-start">{rowData.lastName}</div>
                                        </div>
                                        <div className="row" >
                                            <div className="col-md-4 content-justify-end">Email Address</div>
                                            <div className="col-md-4 content-justify-start">{rowData.email}</div>
                                        </div>
                                        <div className="row" style={{backgroundColor:'lightgrey'}}>
                                            <div className="col-md-4 content-justify-end">Username</div>
                                            <div className="col-md-4 content-justify-start">{rowData.login}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 content-justify-end">Activated</div>
                                            <div className="col-md-4 content-justify-start">{rowData.activated}</div>
                                        </div>
                                        <div className="row" style={{backgroundColor:'lightgrey'}}>
                                            <div className="col-md-4 content-justify-end">Date Created</div>
                                            <div className="col-md-4 content-justify-start">{rowData.createdDate}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 content-justify-end">Creator</div>
                                            <div className="col-md-4 content-justify-start">{rowData.createdBy}</div>
                                        </div>
                                        <div className="row" style={{backgroundColor:'lightgrey'}}>
                                            <div className="col-md-4 content-justify-end">Authorities</div>
                                            <div className="col-md-4 content-justify-start">{rowData.authorities}</div>
                                        </div>
                                </div>
                                </div>
    )
},
                    },

                ]}

/>
        </div >

    )

}

export default UsersList;