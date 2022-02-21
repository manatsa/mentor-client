import React, {useState, useEffect, useRef} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Modal, Button } from 'react-bootstrap';
import Logo from "../assets/assets/cap.svg";
import useAuth from '../auth/useAuth';
import useToastContext from '../context/toast/use-toast-context';
import {LinkContainer} from 'react-router-bootstrap';
import {MenuItem, Menu, Link} from "@mui/material";
import {Home as HomeIcon, Apps as CatalogIcon, AccountCircle, AccountBalance, Lock, DoubleArrow, SwapHoriz, CalendarViewDayTwoTone,} from "@material-ui/icons";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Supernav = () => {

    //localStorage.removeItem('user')
    const login=localStorage.getItem('user');
    // console.log("User String :",login)
    let  user=null;
    try{
        user=(login)?JSON.parse(login):null;
    }catch(e){
        console.log('USER ERROR :',e);
    }

    const adminDropdownTitle = (<div style={{ display: 'inline-block' }}><AccountBalance style={{ color: 'white' }} /> <span> Admin Portal </span></div>);
    const teacherDropdownTitle = (<div style={{ display: 'inline-block' }}><CatalogIcon style={{ color: 'white' }} /> <span> Teacher's Portal </span></div>);
    const userDropdownTitle = (<div style={{ display: 'inline-block' }}><AccountCircle style={{ color: 'white' }} /> <span> {user?.login} </span></div>);
    const sundryDropdownTitle = (<div style={{ display: 'inline-block' }}><CalendarViewDayTwoTone style={{ color: 'white' }} /> <span> Tools Portal </span></div>);
    const studentDropdownTitle = (<div style={{ display: 'inline-block' }}><i className="fa fa-graduation-cap" style={{ color: 'white' }}></i> <span> Student Portal </span></div>);
    const navigate=useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const [showUserMenu, setShowUserMenu] =useState(false);
    const adminRef=useRef();

    const handleCloseProfile = () => {
        document.querySelector('#userDropDown').click();
        setShowProfile(false);
    }
    const handleShowProfile =  () => {
        document.querySelector('#userDropDown').click();
        navigate("/profile")
    }
    const handleResetPassword = () => {
        document.querySelector('#userDropDown').click();
        navigate("/reset-password")
    }

    const auths = user?.authorities;//.map(a => a.name);


    const handleLogout=e=>{
        localStorage.removeItem("user");
        document.querySelector('#userDropDown').click();
        navigate("/login")
    }
    const handleClick = (event) => {
        //setAdminAnchor(adminRef);
    };
    const handleLogin=()=>{
        navigate("/login")
    }

    const handleAdminClicked=()=>{
        document.querySelector('#adminDropDown').click();
    }
    const handleTeacherClicked=()=>{
        document.querySelector('#teacherDropDown').click();
    }
    const handleStudentClicked=()=>{
        document.querySelector('#studentDropDown').click();
    }
    const handleToolsClicked=()=>{
        document.querySelector('#toolsDropDown').click();
    }




    return (
        <div>

            <Modal show={showProfile} onHide={handleCloseProfile} backdrop="static" keyboard={false} variant="success" style={{ border: '3px dotted green' }} >
                <Modal.Header closeButton>
                    <Modal.Title>USER PROFILE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table>

                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <Button  variant="success" onClick={handleCloseProfile}>Close</Button>
                    </div>
                </Modal.Footer>
            </Modal>
            <Navbar bg="success" variant="dark" expand="md" >
                    <Navbar.Brand href="/">
                        <img src={Logo} alt="MENTOR E-Learning logo" width="80" height="54" ></img> MENTOR ELS
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="success" variant='light'>
                        <Nav className="me-auto ">

                            {auths?.includes('ROLE_ADMIN') &&

                            <NavDropdown title={adminDropdownTitle} className="nav-dropdown" id={'adminDropDown'}>
                                <NavDropdown.Header style={{ fontWeight: 'bolder', color: 'black' }}> Relations </NavDropdown.Header>
                                <NavDropdown.Divider />
                                <LinkContainer to="/schools-list">
                                    <MenuItem onClick={handleAdminClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} /> Schools Admin</MenuItem>
                                </LinkContainer>
                                <LinkContainer to="/students-list">
                                    <MenuItem onClick={handleAdminClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} /> Student Admin </MenuItem>
                                </LinkContainer>
                                <LinkContainer to="/teachers-list">
                                    <MenuItem onClick={handleAdminClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} />Teacher Admin </MenuItem>
                                </LinkContainer>
                                <LinkContainer to="/guardians-list">
                                    <MenuItem onClick={handleAdminClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} /> Guardian Admin </MenuItem>
                                </LinkContainer>
                                <LinkContainer to="/agencies-list">
                                    <MenuItem onClick={handleAdminClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} /> Agency Admin </MenuItem>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <NavDropdown.Header style={{ fontWeight: 'bolder', color: 'black' }}> Finance {"&"} Admin </NavDropdown.Header>
                                <NavDropdown.Divider style={{ border: '2px solid red' }} />
                                <LinkContainer to="/users-list">
                                    <MenuItem onClick={handleAdminClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} /> User Admin </MenuItem>
                                </LinkContainer >
                                <LinkContainer to="/subjects-list">
                                    <MenuItem onClick={handleAdminClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} /> Subjects Admin </MenuItem>
                                </LinkContainer>
                                <LinkContainer to="/financials-list">
                                    <MenuItem onClick={handleAdminClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} />  Finance Admin </MenuItem>
                                </LinkContainer>
                                <NavDropdown.Divider style={{ border: '2px solid red' }} />
                            </NavDropdown>
                            }

                            {(auths?.includes('ROLE_ADMIN') || auths?.includes('ROLE_TEACHER')) &&
                            <NavDropdown title={teacherDropdownTitle} className="nav-dropdown" id={'teacherDropDown'}>
                                <NavDropdown.Header style={{ fontWeight: 'bolder', color: 'black' }} ><code />Teaching</NavDropdown.Header>
                                <NavDropdown.Divider />
                                <LinkContainer to="/topics-list">
                                    <MenuItem onClick={handleTeacherClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} /> Topics Admin </MenuItem>
                                </LinkContainer>
                                <LinkContainer to="/lectures-list">
                                    <MenuItem onClick={handleTeacherClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} /> Lecture Admin  </MenuItem>
                                </LinkContainer>
                                <LinkContainer to="/examples-list">
                                    <MenuItem onClick={handleTeacherClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} /> Example Admin </MenuItem>
                                </LinkContainer>
                                <LinkContainer to="/attachments-list">
                                    <MenuItem onClick={handleTeacherClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} /> Attachments Admin </MenuItem>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <NavDropdown.Header style={{ fontWeight: 'bolder', color: 'black' }}><code />Testing</NavDropdown.Header>
                                <LinkContainer to="/exercises-list">
                                    <MenuItem onClick={handleTeacherClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} /> Exercise Admin  </MenuItem>
                                </LinkContainer>
                                <LinkContainer to="exams-list">
                                    <MenuItem onClick={handleTeacherClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} /> Exam Admin </MenuItem>
                                </LinkContainer>
                                <NavDropdown.Divider />
                            </NavDropdown>
                            }
                            {(auths?.includes('ROLE_ADMIN') || auths?.includes('ROLE_TEACHER') || auths?.includes('ROLE_STUDENT')) &&
                            <NavDropdown title={studentDropdownTitle} className="nav-dropdown" id={'studentDropDown'}>
                                <LinkContainer to="/student-lesson-list">
                                    <MenuItem onClick={handleStudentClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} /> Lesson Admin </MenuItem>
                                </LinkContainer>
                                <LinkContainer to="/student-exercises-list">
                                    <MenuItem onClick={handleStudentClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} /> Exercise Admin </MenuItem>
                                </LinkContainer>
                                <LinkContainer to="/student-exams-list">
                                    <MenuItem onClick={handleStudentClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} /> Exam Admin </MenuItem>
                                </LinkContainer>
                            </NavDropdown>
                            }
                            {user?.token &&
                            <NavDropdown title={sundryDropdownTitle} className="nav-dropdown" id={'toolsDropDown'}>
                                <LinkContainer to="/student-lessons">
                                    <MenuItem onClick={handleToolsClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }}  /> New Bulletin </MenuItem>
                                </LinkContainer>
                                <LinkContainer to="/student Exercise">
                                    <MenuItem onClick={handleToolsClicked}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }}  /> Events Calendar </MenuItem>
                                </LinkContainer>
                            </NavDropdown>
                            }
                        </Nav>
                        <Nav className="ml-auto " style={{margin:'0 30px'}}>
                            {!user &&
                            <MenuItem onClick={handleLogin}>Login</MenuItem>
                            }
                            {user &&
                            <NavDropdown title={userDropdownTitle} className="nav-dropdown" style={{margin:'0px 30px'}} id={'userDropDown'}>

                                    <MenuItem onClick={handleShowProfile}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} /> Profile Details</MenuItem>
                                    <MenuItem onClick={handleResetPassword}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }} /> Reset Password</MenuItem>
                                    <MenuItem onClick={handleLogout}><DoubleArrow style={{ color: '#198754', width: '12px', height: '12px' }}  /> Logout </MenuItem>


                            </NavDropdown>
                            }
                        </Nav>

                    </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Supernav;