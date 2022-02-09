import React, { Component } from "react";
import MaterialTable from "material-table";
import TableIcons from "../tableIcons";
import { Link } from 'react-router-dom';
import CandidateService from "../../services/candidateService";
import CandidatesListItem from "./guardians-list-item";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'

class GuardiansList extends Component {
    candidateService = new CandidateService();
    constructor(props) {
        super(props)
        this.state = {
            data: this.candidateService.getCandidates(),
            showListItemModal: false,
            newItem: true,
            candidate: {},
        }
    }



    handleModalClose = () => {
        this.setState({
            showListItemModal: false,
            data: this.candidateService.getCandidates(),
        })
    }


    openModal = () => {
        this.setState({
            showListItemModal: true,
            newItem: true,
            candidate: {
                fullname: '', email: '', phone: '', address: '', country: 'Zimbabwe', idnumber: '',
            }
        })
    }

    handleEditModal = (e, data) => {
        //let newdata = JSON.stringify(data);
        //alert(data.fullname)
        this.setState({
            showListItemModal: true,
            newItem: false,
            candidate: data,
        })
    }

    addCandidateHandler = (candidate) => {
        let candidatelist = this.state.data;
        candidatelist.push(candidate);

        this.setState({
            data: candidatelist
        })

        alert(JSON.stringify(candidate))

    }

    render() {

        const columns = [

            { title: "ID", field: "id" },
            { title: "Full Name", field: "fullname" },
            // { title: "Email Address", field: "address", type: "numeric" },
            { title: "Email Address", field: "email" },
            { title: "Street Address", field: "address" },
            { title: "Phone Number", field: "phone" },
            { title: "National ID", field: "idnumber" },
            { title: "Corporate Name", field: "corporate" },
            { title: "Country", field: "country" },
        ];

        const options = {
            exportButton: true,
            grouping: true,
            search: true,
            sorting: true,
        }

        const actions =
            [
                {
                    icon: TableIcons.Edit,
                    tooltip: "Edit",
                    onClick: (event, rowData) => { return this.handleEditModal(event, rowData); },
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
                    onClick: this.openModal,
                },
            ];


        return (
            <div>
                <Modal size="lg" variant="primary" show={this.state.showListItemModal} onHide={this.handleModalClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title variant="primary">New Candidate</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CandidatesListItem
                            candidator={this.state.candidate}
                            fullname={this.state.candidate.fullname}
                            email={this.state.candidate.email}
                            phone={this.state.candidate.phone}
                            address={this.state.candidate.address}
                            idnumber={this.state.candidate.idnumber}
                            candidates={this.state.data}
                            addCandidateHandler={this.addCandidateHandler}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" onClick={this.handleModalClose}>Close</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
                <MaterialTable
                    title="Candidate List"
                    icons={TableIcons}
                    columns={columns}
                    data={this.state.data}
                    options={options}
                    actions={actions}
                />
            </div>

        )
    }
}

export default GuardiansList;