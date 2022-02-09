/* eslint-disable */
/* eslint no-console: ["error", { allow: ["warn"] }] */
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Modal, Button } from 'react-bootstrap';
import Logo from "../assets/assets/cap.svg";
import useAuth from '../auth/useAuth';
import useToastContext from '../context/toast/use-toast-context';
import {
    Home as HomeIcon, Apps as CatalogIcon, AccountCircle, AccountBalance, DeveloperBoard,
    ContactMail, Lock, FolderShared, Code, DoubleArrow, SwapHoriz, CalendarViewDayTwoTone,
} from "@material-ui/icons";

const Navigation = () => {
    /* eslint-disable */
    const { onLogout } = useAuth();
    // localStorage.removeItem('user')
    const login=localStorage.getItem('user');
    const user=(login)?JSON.parse(login):null;
    const { setShowToast, setToastTitle, setToastMessage, setToastMessageType } = useToastContext();
    const adminDropdownTitle = (<div style={{ display: 'inline-block' }}><AccountBalance style={{ color: 'white' }} /> <span> Admin Portal </span></div>);
    const teacherDropdownTitle = (<div style={{ display: 'inline-block' }}><CatalogIcon style={{ color: 'white' }} /> <span> Teacher's Portal </span></div>);
    const userDropdownTitle = (<div style={{ display: 'inline-block' }}><AccountCircle style={{ color: 'white' }} /> <span> {user?.login} </span></div>);
    const sundryDropdownTitle = (<div style={{ display: 'inline-block' }}><CalendarViewDayTwoTone style={{ color: 'white' }} /> <span> Tools Portal </span></div>);
    const studentDropdownTitle = (<div style={{ display: 'inline-block' }}><i className="fa fa-graduation-cap" style={{ color: 'white' }}></i> <span> Student Portal </span></div>);
    const navigate=useNavigate();
    const [showProfile, setShowProfile] = useState(false);

    const handleCloseProfile = () => setShowProfile(false);
    const handleShowProfile = () => setShowProfile(true);
    const handleResetPassword = () => {

        setToastMessage('Test Toast Message')
        setToastMessageType('info');
        setToastTitle('Test Toast Title');
        setShowToast(true);
    }

    const auths = user?.authorities;//.map(a => a.name);


    return (
        <div>

            <Modal
                show={showProfile}
                onHide={handleCloseProfile}
                backdrop="static"
                keyboard={false}
                variant="success"
                style={{ border: '3px dotted green' }}
            >
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
                <Container>
                    <Navbar.Brand href="/">
                        <img src={Logo} alt="MENTOR E-Learning logo" width="80" height="54" ></img> MENTOR E-Learning
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="success" variant='light'>
                        <Nav className="me-auto ">
                            <Nav.Link><NavLink to="/"><HomeIcon /><span className="nav-dropdown">Home</span></NavLink></Nav.Link>

                            {auths?.includes('ROLE_ADMIN') &&

                                <NavDropdown title={adminDropdownTitle} className="nav-dropdown">
                                    <NavDropdown.Header style={{ fontWeight: 'bolder', color: 'black' }}> Relations </NavDropdown.Header>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item>
                                        <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />
                                        <NavLink to="/schools-list">School Admin</NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />
                                        <NavLink to="/students-list">Student Admin </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />
                                        <NavLink to="/teachers-list">Teacher Admin </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />
                                        <NavLink to="/guardians-list">Guardian Admin</NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Header style={{ fontWeight: 'bolder', color: 'black' }}> Finance {"&"} Admin </NavDropdown.Header>
                                    <NavDropdown.Divider style={{ border: '2px solid red' }} />
                                    <NavDropdown.Item>
                                        <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />
                                        <NavLink to="/users-list">User Admin</NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />
                                        <NavLink to="/subjects-list">Subjects Admin </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/financials-list">
                                        <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} /> Finance Admin
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider style={{ border: '2px solid red' }} />
                                </NavDropdown>
                            }

                            {(auths?.includes('ROLE_ADMIN') || auths?.includes('ROLE_TEACHER')) &&
                                <NavDropdown title={teacherDropdownTitle} className="nav-dropdown">
                                    <NavDropdown.Header style={{ fontWeight: 'bolder', color: 'black' }} ><code />Teaching</NavDropdown.Header>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item>
                                        <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />
                                        <NavLink to="/topics-list">Topics Admin </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />
                                        <NavLink to="/lectures-list">Lecture Admin </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />
                                        <NavLink to="/examples-list">Example Admin </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />
                                        <NavLink to="/attachments-list">Attachments Admin </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Header style={{ fontWeight: 'bolder', color: 'black' }}><code />Testing</NavDropdown.Header>
                                    <NavDropdown.Item>
                                        <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />
                                        <NavLink to="/exercises-list">Exercise Admin </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/exams-list">
                                        <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />
                                        <NavLink to="/teachers-list">Exam Admin </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                </NavDropdown>
                            }
                            {(auths?.includes('ROLE_ADMIN') || auths?.includes('ROLE_TEACHER') || auths?.includes('ROLE_STUDENT')) &&
                                <NavDropdown title={studentDropdownTitle} className="nav-dropdown">
                                    <NavDropdown.Item className="success" variant='light'>
                                        <NavLink to="/student-lesson-list">
                                            <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />Lesson Admin
                                        </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className="success" variant='light'>
                                        <NavLink to="/student-exercises-list" >
                                            <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />Exercise Admin
                                        </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className="success" variant='light'>
                                        <NavLink to="/student-exams-list">
                                            <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />Exam Admin
                                        </NavLink>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            }
                            {user?.token &&
                                <NavDropdown title={sundryDropdownTitle} className="nav-dropdown">
                                    <NavDropdown.Item className="success" variant='light'>
                                        <NavLink to="/student-lessons">
                                            <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />New Bulletin
                                        </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className="success" variant='light'>
                                        <NavLink to="/student Exercise" >
                                            <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />Events Calendar
                                        </NavLink>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            }
                        </Nav>
                        <Nav className="ml-auto ">
                            {!user &&
                                <Nav.Link><NavLink to="/login"><Lock /><span className="nav-dropdown">Login</span></NavLink></Nav.Link>
                            }
                            {user &&
                                <NavDropdown title={userDropdownTitle} className="nav-dropdown">
                                    <NavDropdown.Item className="success" variant='light'>
                                        <Nav.Link onClick={handleShowProfile}>
                                            <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />Profile Details
                                        </Nav.Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className="success" variant='light'>
                                        <Nav.Link onClick={handleResetPassword}>
                                            <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />Reset Password
                                        </Nav.Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className="success" variant='light'>
                                        <Nav.Link onClick={onLogout} >
                                            <DoubleArrow style={{ color: 'white', width: '12px', height: '12px' }} />Logout
                                        </Nav.Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            }
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation;