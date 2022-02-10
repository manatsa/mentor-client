import React, { Component, useEffect, useState } from "react";
//import MaterialTable from "material-table";
import {Link, useNavigate} from 'react-router-dom'
import MaterialTable from '@material-table/core';
import TableIcons from "../tableIcons";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'
import {getFetch, putFetch, postFetch, getFetchWithProps} from "../../services/fetcher";
import useAuth from "../../auth/useAuth";
import UserListItem from "./users-list-item";
import Form from 'react-bootstrap/Form'
import {toast, Zoom} from "react-toastify";
import {ExportCsv, ExportPdf} from "@material-table/exporters";


const UsersList = () => {


    const [showListItemModal, setShowListItemModal] = useState(false);
    const [newOrEditUser, setNewOrEditUser] = useState();
    const [newPassword, setNewPassword] = useState('');
    const [data, setData] = useState([]);
    const [showNewPassModal, setShowNewPassModal] =useState(false)
    const [selectedUser, setSelectedUser] =useState(null);
    const [dummy, setDummy] =useState("")

    const login=localStorage.getItem('user');
    const user=JSON.parse(login);
    const navigate=useNavigate();

    useEffect(() => {
        const url = "/admin/users";
        const callApi = async () => {
            let res = await getFetchWithProps(url, user,'Getting List of Users, Please wait.');
            //console.log(JSON.stringify(res))
            setData(res);
        };

        callApi();

    }, []);

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
                onClick: (event, rowData) => { return handleEditModal(event, rowData); },
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
                onClick: openModal,
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
                data={data}
                options={options}
                actions={actions}
                detailPanel={[
                    {
                        tooltip: 'Exapnd user details.',
                        render: rowData => {
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
{
    icon: TableIcons.Reset,
        tooltip: 'Reset User Password',
            render: rowData => {
                setSelectedUser(rowData);
                setShowNewPassModal(true);
            },
                    },
{
    icon: TableIcons.Deactivate,
        openIcon: TableIcons.Deactivate,
        tooltip: 'Deactivate User',
            render: rowData => {
                        setSelectedUser(rowData)
                        handleUserDeactivation(rowData);
                    },
                    },
                    {

                    icon: TableIcons.Activate,
                    openIcon: TableIcons.Activate,
                    tooltip: 'Activate User',
                    render: rowData => {
                    setSelectedUser(rowData)
                    handleUserActivation(rowData);
                },
                },
                ]}

/>
        </div >

    )

}

export default UsersList;