import React, { Component } from "react";
import { Form } from "react-bootstrap";
import Notify from "./notify";


class Contact extends Component {

    showMessage = true
    constructor(props) {
        super(props)
        this.state = {
            showMessage: true,
            fullname: '',
            fullnameError: '',
            email: '',
            emailError: '',
            phone: '',
            phoneError: '',
            message: '',
            messageError: ''
        }
    }

    formSubmit = (e) => {
        e.preventDefault()
        {
            this.state.fullname.length < 4 &&
                this.setState({
                    fullnameError: "Please enter valid full name here!"
                })
        }
        {
            this.state.phone.length < 6 &&
                this.setState({
                    phoneError: "Please enter valid phone number here!"
                })
        }
        {
            this.state.email.length < 4 &&
                this.setState({
                    emailError: "Please enter valid full name here!"
                })
        }
        {
            this.state.message.length < 4 &&
                this.setState({
                    messageError: "Please enter valid message detailing your thoughts!"
                })
        }

        if (!this.state.messageError && !this.state.fullnameError && !this.state.emailError && !this.state.phoneError) {
            const contact = {
                id: -1,
                fullname: this.state.fullname,
                email: this.state.email,
                phone: this.state.phone,
                message: this.state.message
            }

            console.log(contact)
        }
    }

    fullnameChangeHandler = (e) => {
        this.setState({
            fullname: e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    phoneChangeHandler = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    messageChangeHandler = e => {
        this.setState({
            message: e.target.value
        })
    }

    render() {
        return (
            <div className="d-flex justify-content-center" >
                <Form onSubmit={this.formSubmit} style={{ border: "2px solid blue", padding: "20px", margin: "20px", borderRadius: "20px", width: '50%' }}>
                    <h3 className="text-primary">Please fill in the form below:</h3><hr style={{ border: "2px solid blue" }} /><br />
                    <div className="mb-3">
                        <label id="full_name_label" htmlFor="full_name">Full Name</label>
                        <input type="text" className="form-control" value={this.state.fullname} onChange={this.fullnameChangeHandler} />
                        <p className="text-danger">{this.state.fullnameError}</p>
                    </div>
                    <div className="mb-3">
                        <label id="email_label" htmlFor="email">Email Address</label>
                        <input id="email" name="email" type="email" className="form-control" value={this.state.email} onChange={this.emailChangeHandler} />
                        <p className="text-danger">{this.state.emailError}</p>
                    </div>
                    <div className="mb-3">
                        <label id="phone_label" htmlFor="phone">Phone Number</label>
                        <input id="phone" name="phone" type="tel" className="form-control" value={this.state.phone} onChange={this.phoneChangeHandler} />
                        <p className="text-danger">{this.state.phoneError}</p>
                    </div>
                    <div className="mb-3">
                        <label id="email_label" htmlFor="email">Message</label>
                        <textarea rows="4" className="form-control" value={this.state.message} onChange={this.messageChangeHandler} />
                        <p className="text-danger">{this.state.messageError}</p>
                    </div>

                    <hr style={{ border: "2px solid blue" }} /><br />
                    <div className="row">
                        <button type="submit" className="btn btn-primary btn-danger-outline">Send</button>
                    </div>

                </Form>
            </div>


        )
    }
}

export default Contact