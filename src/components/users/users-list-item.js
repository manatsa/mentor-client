import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import validateEmail from "../../utils/validations/email-validation";
import {putFetch, postFetch} from "../../services/fetcher";
import {toast, Zoom} from "react-toastify";



const UserListItem = (props) => {


    const [newOrEditUser, setNewOrEditUser] = useState(props?.target)
    const [firstName, setFirstName] = useState(props?.firstName)
    const [lastName, setLastName] = useState(props?.lastName)
    const [email, setEmail] = useState(props?.email)
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [username, setUsername] = useState(props?.login)
    const [usernameError, setUsernameError] = useState('')
    const [authorities, setAthorities] = useState(props?.authorities)
    const [authoritiesError, setAuthoritiesError] = useState('');
    const r = localStorage.getItem('roles');
    const roles=JSON.parse(r);
    const target=JSON.parse(newOrEditUser);
    const user=JSON.parse(localStorage.getItem('user'));

    const userFormSubmitHandler = async (e) => {
        e.preventDefault();
        let count=0;
        {
            (!firstName || firstName.length < 3) &&
                setFirstNameError('Please enter a valid first name for the user.') && count++;
        }

        {
            !email && validateEmail(email) &&
                setEmailError('Please enter a valid email for the user.') && count++;
        }

        {
            (!lastName || lastName.length < 3) &&
                setLastNameError('Please enter a valid last name for the user.') && count++;
        }

        {
            (!username || username.length < 3) &&
                setUsernameError('Please enter a valid username for the user.') && count++;
        }

        {
            (!authorities || authorities.length<1) &&
                setAuthoritiesError('Please select at least one role for this user.') && count++;
        }

        if(count==0){
            props.setShowModal(false);
           if(user && user?.token) {
                target.firstName=firstName;
                target.lastName=lastName;
                target.login=username;
                target.email=email;
                target.authorities=authorities;
                let res;
                if(target.id){
                    target.lastModifiedDate=Date.now();
                    target.lastModifiedBy=user.id;
                    res=await putFetch('/admin/users',user,JSON.stringify(target))
                    props.addUserHandler(res, false);
                } else{
                    target.createdDate=Date.now();
                    target.createdBy=user.id;
                    target.langKey='en';
                    res=await postFetch('/admin/users',user,JSON.stringify(target));
                    props.addUserHandler(res, true);
                }
                toast(JSON.stringify('User saved successfully!'),{
                    type:'info',
                    autoClose: 2000,
                    position:'top-center'
                })

            }else{
               toast('It seems like your session has expired, please login again',{
                   type: "warning",
                   autoClose: 2000,
                   transition: Zoom,
                   position: "top-center"
               })
           }
        }



    }

    const onFirstNameChange=(e)=>{
        setFirstName(e.target.value)
        setFirstNameError('')
    }

    const onLastNameChange=(e)=>{
        setLastName(e.target.value);
        setLastNameError('')
    }

    const onEmailChange=(e)=>{
        setEmail(e.target.value);
        setEmailError('')
    }

    const onAuthoritiesChange=(e)=>{
        setAthorities([].slice.call(e.target.selectedOptions).map(item => item.value));
        setAuthoritiesError('')
    }



    const options = roles.map((item) => {
        return (
            <option key={item} value={item}>
                {item}
            </option>
        )
    })

    return (
        <Card style={{ border: ' 2px solid lightblue', borderRadius: '20px' }}>
            <Card.Title><h5 className="text-white">Enter new user details below.</h5></Card.Title>
            <Card.Body>
                <Form onSubmit={userFormSubmitHandler}>
                    <div className="mb-3">
                        <label id="full_name_label" htmlFor="full_name">First Name</label>
                        <input id="full_name" name="full_name" type="text" className="form-control" value={firstName} onChange={onFirstNameChange} />
                        {firstNameError &&
                            <p className="text-danger">{firstNameError}</p>
                        }
                    </div>
                    <div className="mb-3">
                        <label id="id_label" htmlFor="id"> Last Name</label>
                        <input id="id" name="id" type="text" className="form-control" value={lastName} onChange={onLastNameChange} />
                        {lastNameError &&
                            <p className="text-danger">{lastNameError}</p>
                        }
                    </div>
                    <div className="mb-3">
                        <label id="email_label" htmlFor="email">Email Address</label>
                        <input id="email" name="email" type="email" className="form-control" value={email} onChange={onEmailChange} />
                        {emailError &&
                            <p className="text-danger">{emailError}</p>
                        }
                    </div>
                    <div className="mb-3">
                        <label id="phone_label" htmlFor="phone">Username</label>
                        <input id="phone" name="phone" type="tel" className="form-control" disabled={target.id?true:false} value={username} onChange={e => setUsername(e.target.value)} />
                        {usernameError &&
                            <p className="text-danger">{usernameError}</p>
                        }
                    </div>
                    <div className="select">
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Select Role(s)</Form.Label>
                            <Form.Control as="select" value={authorities} onChange={onAuthoritiesChange}>
                                {options}
                            </Form.Control>
                        </Form.Group>
                        {authoritiesError &&
                            <p className="text-danger">{authoritiesError}</p>
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

export default UserListItem