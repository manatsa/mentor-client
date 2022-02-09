import React, { Component } from "react";
import CorporateService from "../../services/corporateService";
import MaterialTable from "material-table";
import TableIcons from "../tableIcons";

class TeachersList extends Component {

    corporateService = new CorporateService();

    constructor(props) {
        super(props)
        this.state = {
            data: this.corporateService.getCorporates(),
        }
    }




    render() {

        const columns = [

            { title: "ID", field: "id" },
            { title: "Full Name", field: "name" },
            // { title: "Email Address", field: "address", type: "numeric" },
            { title: "Physical Address", field: "address" },
            { title: "Classification", field: "type" },

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
                <MaterialTable
                    title={"Corporates List"}
                    columns={columns}
                    data={this.state.data}
                    actions={actions}
                    options={options}
                    icons={TableIcons}
                />
            </div>
        )
    }
}

export default TeachersList