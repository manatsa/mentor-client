import React  from "react";
import {Formik, Field, ErrorMessage, Form, useFormik} from 'formik';
import {TextField, InputBase} from  'formik-mui'
//import {Button} from "@material-ui/core";
 import {Button, TextareaAutosize} from "@mui/material";
 import * as Yup from 'yup'

const SchoolItem = (props) =>{

     const school=JSON.parse(props.school);

    const onSubmit=values=>{
        console.log(values)
    }
    const initialValues={
        name: school?.name,
        email:school?.email,
        address:school?.address,
        phone:school?.phone,
    }

    const validationSchema=Yup.object({
        name: Yup.string().required("Name of school is required!"),
        email: Yup.string().email("Email format is invalid").required("Email address is required!"),
        address: Yup.string().required("Physical address of the school is required!")
    })



    return(
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
            <Form color={'primary'}>
                <div className={'form-group'}>
                    <Field  name={'name'}className={'form-control'} autoFocus={true} component={TextField} label={'School Name'} variant={'standard'} />
                    {/*<ErrorMessage name={'name'} className={'text-danger'} render={msg=><p className={'text-danger'}>{msg}</p> }  />*/}
                </div>
                <div className={'form-group'}>
                    <Field type={'email'} name={'email'} className={'form-control'} variant={'standard'} label={'School Email Address'} component={TextField} />
                    {/*<ErrorMessage name={'email'}  render={msg=><p className={'text-danger'}>{msg}</p>} />*/}
                </div>
                <div><br/>
                    {/*<label htmlFor={'address'}>Physical Address</label>*/}
                    <Field  name={'address'} component={InputBase} multiline={true} rows={5} placeholder={'Enter physical address'} className={'form-control'} variant={'standard'} label={'School Address'} />
                    {/*<ErrorMessage name={'address'} render={msg=><p className={'text-danger'}>{msg}</p>} />*/}
                </div>
                <div>
                    <Field  type={'text'}  name={'phone'} variant={'standard'} className={'form-control'} label={'School Phone'} component={TextField}/>
                    {/*<ErrorMessage name={'phone'} render={msg=><p className={'text-danger'}>{msg}</p> }  />*/}
                </div>

                <br/>
                <div className={'d-flex justify-content-end'}>
                    <Button variant={'outlined'} color={'success'} type={'submit'} className={'btn btn-outline-primary'}>Submit</Button>
                </div>

            </Form>
        </Formik>
    )
}

export default  SchoolItem;