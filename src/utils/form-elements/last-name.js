import React from "react";
import { FormControl, Form } from "react-bootstrap";

const LastName = (props) => {
    return (
        <div class="mb-3">
            <Form.Group className="mb-3" controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <FormControl type="text" placeholder="Enter last name" />
            </Form.Group>
        </div>
    )
}

export default LastName