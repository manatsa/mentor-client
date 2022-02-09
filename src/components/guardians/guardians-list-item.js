import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import CandidateService from '../../services/candidateService';
import CorporateService from '../../services/corporateService';


class GuardiansListItem extends Component {
    candidateService = new CandidateService();
    corporateService = new CorporateService();

    constructor(props) {
        super(props)

        //alert(JSON.stringify(this.props))
        this.state = {
            corporates: [],
            candidate: this.props.candidator,
            fullname: this.props.fullname,
            email: this.props.email,
            idnumber: this.props.idnumber,
            phone: this.props.phone,
            address: this.props.address,
            country: 'Zimbabwe',
            candidates: this.props.candidates,
            fullnameError: '',
            emailError: '',
            phoneError: '',
            addressError: '',
            idnumberError: '',
            countryError: '',
        };


    }

    componentDidMount() {
        let corps = this.corporateService.getCorporates();
        //console.log("Corps", corps)
        this.setState({
            candidates: this.candidateService.getCandidates(),
            corporates: corps,
        })
    }


    handleFullname = (e) => {
        this.setState({
            fullname: e.target.value
        })
    }

    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleIdNumber = (e) => {
        this.setState({
            idnumber: e.target.value
        })
    }

    handlePhone = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    handleAddress = (e) => {
        this.setState({
            address: e.target.value
        })
    }

    handleCountry = (e) => {
        this.setState({
            country: e.target.value
        })
    }




    candidateFormSubmitHandler = (e) => {
        e.preventDefault();
        {
            (this.state.fullname.length < 6 || this.state.fullname.indexOf(' ') == -1) &&
                this.setState({
                    fullnameError: 'Please enter a valid full name of candidate.'
                })
        }

        {
            !this.state.email &&
                this.setState({
                    emailError: 'Please enter a valid email for the candidate.'
                })
        }

        {
            !this.state.idnumber &&
                this.setState({
                    idnumberError: 'Please enter a valid ID Number for the candidate.'
                })
        }

        {
            !this.state.phone &&
                this.setState({
                    phoneError: 'Please enter a valid phone number for the candidate.'
                })
        }

        {
            !this.state.address &&
                this.setState({
                    addressError: 'Please enter a valid street address for the candidate.'
                })
        }

        // {
        //     !this.state.country &&
        //         this.setState({
        //             countryError: 'Please select a country for the candidate.'
        //         })
        // }

        if (!this.state.fullnameError && !this.state.idnumberError && !this.state.emailError && !this.state.phoneError && !this.state.addressError && !this.state.countryError) {
            this.state.candidate.phone = this.state.phone;
            this.state.candidate.email = this.state.email;
            this.state.candidate.fullname = this.state.fullname;
            this.state.candidate.idnumber = this.state.idnumber;
            this.state.candidate.address = this.state.address;
            this.state.candidate.country = this.state.country;
            //alert(JSON.stringify(this.props.candidate))

            this.setState({
                candidate: this.props.candidator
            })

            this.props.addCandidateHandler(this.state.candidate);

            this.candidateService.addCandidate(this.state.candidate);
            alert("Candidate added")
            console.log("Submitting the form")
        }

    }

    render() {
        return (
            <Card style={{ border: ' 2px solid lightblue', borderRadius: '20px' }}>
                <Card.Title><h5 className="text-white">Enter new candidate details below.</h5></Card.Title>
                <Card.Body>
                    <Form onSubmit={this.candidateFormSubmitHandler}>
                        <div className="mb-3">
                            <label id="full_name_label" htmlFor="full_name">Full Name</label>
                            <input id="full_name" name="full_name" type="text" className="form-control" value={this.state.fullname} onChange={this.handleFullname} />
                            {this.state.fullnameError &&
                                <p className="text-danger">{this.state.fullnameError}</p>
                            }
                        </div>
                        <div className="mb-3">
                            <label id="id_label" htmlFor="id"> National ID</label>
                            <input id="id" name="id" type="text" className="form-control" value={this.state.idnumber} onChange={this.handleIdNumber} />
                            {this.state.idnumberError &&
                                <p className="text-danger">{this.state.idnumberError}</p>
                            }
                        </div>
                        <div className="mb-3">
                            <label id="email_label" htmlFor="email">Email Address</label>
                            <input id="email" name="email" type="email" className="form-control" value={this.state.email} onChange={this.handleEmail} />
                            {this.state.emailError &&
                                <p className="text-danger">{this.state.emailError}</p>
                            }
                        </div>
                        <div className="mb-3">
                            <label id="phone_label" htmlFor="phone">Phone Number</label>
                            <input id="phone" name="phone" type="tel" className="form-control" value={this.state.phone} onChange={this.handlePhone} />
                            {this.state.phoneError &&
                                <p className="text-danger">{this.state.phoneError}</p>
                            }
                        </div>
                        <div className="mb-3">
                            <label id="street_address_label" htmlFor="street_address">Street Address</label>
                            <input id="street_address" name="street_address" type="text" className="form-control" value={this.state.address} onChange={this.handleAddress} />
                            {this.state.addressError &&
                                <p className="text-danger">{this.state.addressError}</p>
                            }
                        </div>
                        {/* <div class="select">
                        <label id="Corporate_label" for="Corporate"></label>
                        <div class="input-group mb-3">
                            <select id="Corporate" name="Corporate" className="form-control form-select" aria-label="Corporate">
                                {this.corporates.map(c => {
                                    <option value={c.name}>{c.name}</option>
                                })}
                            </select>
                        </div>
                    </div> */}
                        <div className="select">
                            <label id="country_label" htmlFor="country"></label>
                            <div className="input-group mb-3">
                                <select id="country" name="country" className="form-control form-select" aria-label="country" value={this.state.country} onChange={this.handleCountry}>
                                    <option>Zimbabwe</option>
                                    <option>South Africa</option>
                                    <option>Botswana</option>
                                </select>
                            </div>
                            {this.state.countryError &&
                                <p className="text-danger">{this.state.countryError}</p>
                            }
                        </div><br />
                        <hr style={{ border: '3px solid blue' }} />
                        <br />
                        <div className="row">
                            <button type="submit" className="btn btn-primary btn-success-outline">Save</button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>


        )
    }
}

export default GuardiansListItem