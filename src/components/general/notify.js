import React, { Component } from "react";
import { Button, Alert } from "react-bootstrap";

export default class Notify extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMessage: 'true'
        }
    }

    setShowMessage(showM) {
        this.setState({
            showMessage: showM
        })
    }

    render() {
        return (
            <div className=" d-flex justify-content-center" >
                {/* style={{ backgroundColor: "transparent" }, { border: "2px solid green" }}> */}
                <Alert show={this.state.showMessage} variant={this.props.type} style={{ width: "50%" }}>
                    <Alert.Heading className="d-flex justify-content-center">{this.props.title}</Alert.Heading>
                    <p className="d-flex justify-content-center">
                        {this.props.message}
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button
                            onClick={() => this.setShowMessage(false)}
                            variant="outline-success"
                        >
                            Close
                        </Button>
                    </div>
                </Alert>
            </div>

        )
    }
} 