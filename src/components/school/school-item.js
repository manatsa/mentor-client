import React  from "react";
import {Formik, Field, ErrorMessage, Form, useFormik} from 'formik';
import {TextField, InputBase} from  'formik-mui'
//import {Button} from "@material-ui/core";
 import {Button, TextareaAutosize} from "@mui/material";
 import * as Yup from 'yup'
import {putFetch, postFetch} from "../../services/fetcher";

const SchoolItem = (props) =>{

     const school=JSON.parse(props.school||{});

    const onSubmit= async values=>{
        let logger=props.user;
        let auths=logger.authorities;
        logger.authorities=auths;

        if(school?.id){
            school.modifier=logger;
            console.log("Editing School:",JSON.stringify(school))
            school.name=values.name;
            school.email=values.email;
            school.address=values.address
            school.phone=values.phone;
            school.modifier=props.user;
            let res=await putFetch('/schools/'+school.id, logger, JSON.stringify(school),"Updating school...Please wait");
            console.log('Existing Object: ',JSON.stringify(res))
        }else{
          let  sch= {
                creator : props.logger,
                name : values.name,
                email : values.email,
                address : values.address,
                phone : values.phone
            }
            console.log('Sch Object :',JSON.stringify(sch));
            let res=await postFetch('/schools', logger, JSON.stringify(sch),"Updating school...Please wait");
            console.log('New Object :',JSON.stringify(res));

        }

        props.setShowModalDialog(false);

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
                <br/>
                <div className={'form-group'}>
                    {/*<label htmlFor={'address'}>Physical Address</label>*/}
                    <Field  name={'address'} component={InputBase} multiline={true} rows={5} placeholder={'Enter physical address'} className={'form-control'} variant={'standard'} />
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