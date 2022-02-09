import React from "react";
import { FormControl, Form } from "react-bootstrap";

const FirstName = (props) => {
    return (
        <div class="mb-3">
            <Form.Group className="mb-3" controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <FormControl type="text" placeholder="Enter first name" />
            </Form.Group>
        </div>
    )
}

export default FirstName