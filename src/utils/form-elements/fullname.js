import React from "react";

const Fullname = (props) => {
    return (
        <div class="mb-3">
            <Form.Group className="mb-3" controlId="full_name">
                <Form.Label>Full Name</Form.Label>
                <FormControl type="text" placeholder="Enter fullname" />
            </Form.Group>
        </div>
    )
}

export default Fullname;