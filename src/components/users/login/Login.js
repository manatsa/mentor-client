import React, { useState, useRef, useEffect } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Spinner } from "react-bootstrap";
import useAuth from '../../../auth/useAuth';
import useLoginContext from '../../../context/login/use-login-context';




export default function Login() {

    // alert('logging')
    const [username, setUserName] = useState('');
    const { showLoginWait, setShowLoginWait, showLoginError } = useLoginContext();
    const [usernameError, setUserNameError] = useState();
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState();
    const { user, onLogin } = useAuth();

    const navigate = useNavigate();
    const formFocusRef = useRef();
    useEffect(() => {
        formFocusRef.current.focus();
    }, []);


    const usernameChange = e => {
        setUserName(e.target.value)
        setUserNameError('');
    }

    const passwordChange = e => {
        setPassword(e.target.value)
        setPasswordError('')
    }

    const handleSubmit = async e => {
        e.preventDefault();
        let counter = 0;
        setShowLoginWait(true);

        if (!username || username.length <= 3) {
            setUserNameError('Please enter a valid username!')
            counter++;
        } else {
            setUserNameError('')
        }
        if (!password || password.length <= 3) {
            setPasswordError('Please enter a valid password!')
            counter++;
        } else {
            setPasswordError('')
        }

        if (counter < 1) {
            onLogin({ username: username, password: password })
        } else {
            console.log("Login failed")
        }

        return;
    }

    const formStyle = {
        border: "2px solid darkgreen",
        margin: "30px",
        padding: "30px",
        boxShadow: "0px 0px 30px violet",
        borderRadius: "20px"
    }

    const inputSuccessStyle = {
        border: '1px solid green',
        borderRadius: '3px'
    }

    const inputErrorStyle = {
        border: '1px solid red',
        borderRadius: '5px'
    }
    return (
        <div className="col-md-12 ">

            <div className="d-flex justify-content-center  align-middle">



                <Form onSubmit={handleSubmit} method="POST" style={formStyle} className="col-md-5 col-sm-12 align-middle">

                    <div className='d-flex justify-content-center col-md-12'>
                        <span style={{ fontSize: '20px' }} className="text-success">Login Details</span>
                    </div>
                    {showLoginError &&
                        <div className='d-flex justify-content-center col-md-12'>
                            <span style={{ fontSize: '16px' }} className="text-danger">Login was not successful. Please contact administrator if the error persists!</span>
                        </div>
                    }


                    {!user && showLoginWait &&
                        <div className='d-flex justify-content-end col-md-12'>
                            <div id="load">
                                <div>G</div>
                                <div>N</div>
                                <div>I</div>
                                <div>D</div>
                                <div>A</div>
                                <div>O</div>
                                <div>L</div>
                            </div>
                            <Spinner animation="border" variant='danger' />
                            <Spinner animation="grow" variant='success' />
                            <Spinner animation="border" variant='danger' />
                        </div>
                    }
                    <Form.Group className="form-group">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            value={username}
                            type="text"
                            placeholder="Enter username"
                            onChange={usernameChange}
                            autoComplete={'true'}
                            style={usernameError ? inputErrorStyle : inputSuccessStyle}
                        />
                        {usernameError &&
                            <Form.Label className="text-danger">{usernameError}</Form.Label>}
                    </Form.Group>

                    <br />
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            ref={formFocusRef}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={passwordChange}
                            autoComplete={'true'}
                            style={passwordError ? inputErrorStyle : inputSuccessStyle}
                        />
                        {passwordError &&
                            <Form.Label className="text-danger">{passwordError}</Form.Label>}
                    </Form.Group>
                    <br /><hr /><br />
                    <div className="row justify-content-between col-md-12 col-sm-12">
                        <div className="col-md-3 ">
                            <Link to="/signup" >Sign Up</Link>
                        </div>
                        <div className="col-md-3  ">
                            <Button type="Submit" className="btn btn-success">Login</Button>
                        </div>

                    </div>

                </Form>



            </div>

        </div>
    )
}
