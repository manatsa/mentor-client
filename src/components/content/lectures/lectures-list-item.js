import React from "react";
import {useFormik, Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from 'yup';
import  {TextField, InputBase} from 'formik-mui';
import {Button} from "@mui/material";
import { DatePicker } from 'formik-mui-lab';
import {useNavigate} from 'react-router-dom'

const LectureListItem = () => {
    const navigate=useNavigate();
    const handleBackBtn=()=>{
        navigate('/lectures-list');
    }
    const initValues={
        name:'',
        content: ''
    }

    const submitHandler=(values,props)=>{

        const {setSubmitting,lecture}=props;
        setSubmitting(false);
        if(lecture?.id){
            lecture.name=values.name;
            lecture.content=values.content;
            lecture.createdBy=props.user?.id;
            lecture.createDate=Date.now();
        }else{
            lecture.name=values.name;
            lecture.content=values.content;
        }

    }

    const validityCheck = yup.object({
        name: yup.string().required('Name is required.'),
        content: yup.string().required("Lecture content cannot empty!").min(10,"Lecture content is expected to be larger than 9 characters"),

    })

    return (
        <Formik initialValues={initValues}
                onSubmit={submitHandler}
                validationSchema={validityCheck}
                enableReinitialize={true}
                validateOnMount={true}
                validateOnChange={false}
                >
            {
                (formProps)=>{
                    console.log(formProps)
                    return <Form style={{margin:'20px'}}>
                        <div className={'form-group'}>
                            <Field name={'name'}  autoFocus={true} component={TextField} variant={'standard'} label={'Name of lesson'} className={'form-control'} /><br/><br/>
                        </div>

                        <div className="form-group">
                            <Field name={'content'} component={InputBase} variant={'standard'} placeholder={'Enter lecture content here'} multiline  minRows={15} className={'form-control'} maxRows={30} />
                            <ErrorMessage name={'content'} render={msg=><p className={'text-danger'}>{msg}</p>}  />
                        </div>

                        <br/>

                        <div className={'d-flex justify-content-between'}>
                            <Button type={'button'} className={'d-flex justify-self-start'}  variant={'outlined'} color={'error'} onClick={handleBackBtn}> Cancel </Button>
                            <Button type={'submit'} className={'d-flex justify-self-end'} variant={'outlined'} color={'success'} size={'large'} > Save </Button>
                        </div>

                    </Form>
                }
            }

        </Formik>

    )

}

export default LectureListItem