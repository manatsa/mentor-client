import React, { Component } from "react";
import AttachmentsListItem from "./attachments-list-item";

class AttachmentsList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h3>attachments List</h3>
                <AttachmentsListItem />
            </div>

        )
    }
}

export default AttachmentsList;