import React from "react";

const Email = (props) => {
    return (
        <Form.Group className="mb-3" controlId="email_address">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name123@domain.com" />
        </Form.Group>
    )
}