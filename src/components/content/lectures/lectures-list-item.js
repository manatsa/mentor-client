import React, {useEffect, useRef, useState} from "react";
import {useFormik, Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from 'yup';
import  {TextField, InputBase, Select} from '@mui/material';
import {Autocomplete, Button, IconButton, Input} from "@mui/material";
import FileUploader from "../../file-uploader";
import {getFetchWithProps, getFetchWithPropsPlainForUser, postFetch, putFetch} from "../../../services/fetcher";
import {ArrowLeft, DoubleArrow, Feedback, KeyboardDoubleArrowLeft, UploadFile} from "@mui/icons-material";
import Levels from "../../../utils/constants/levels";
import {useLocation, useNavigate} from "react-router-dom";
import {toast, Zoom} from "react-toastify";


const LectureListItem = (props) => {

    const { state } = useLocation();
    console.log("STATE : ",state?.lecture)
    const lecture=state?JSON.parse(state.lecture):null;
    const [picture, setPicture]=useState(null);
    const [imageString, setImageString] =useState(null);
    const [showUploadError, setShowUploadError] = useState(false);
    const [lessons,setLessons] = useState([]);
    const [lesson,setLesson] = useState(props.lecture?.lesson||new Object());
    const [name, setName] = useState('');
    const [lessonError, setLessonError] =useState('')
    const [subject, setSubject] =useState('');
    const [subjects, setSubjects] =useState([]);
    const [unfilteredLessons, setUnfilteredLessons] =useState([])
    const [filteredLessons, setFilteredLessons] =useState([])
    const [filteredSubjects, setFilteredSubjects] =useState([]);
    const [level, setLevel] = useState('');
    const [content, setContent] = useState('');
    const [contentError, setContentError] = useState('');
    const [nameError, setNameError] = useState('');

    const formRef=useRef();
    const navigate=useNavigate();

    const login=localStorage.getItem('user');
    const user=(login)?JSON.parse(login):null;

    useEffect(()=>{
        const fetchSubjects=async ()=>{
            let result= await getFetchWithProps('/subjects',user,'Please wait... Fetching  data.');
            //console.log(result);
            let subs=result.data;
            setSubjects(result?.data||[]);
            setFilteredSubjects(subs?.map(s=> {
                return {label:s.name, value:s.id}
            }) || subjects);
        }

        const getLessons= async ()=>{
            let lessons=await getFetchWithProps('/lessons',user,'Please wait... Fetching  data.');
            let ls=lessons.data;
            setLessons(ls)
            setUnfilteredLessons(ls?.map(l=> {
                return {label: l.name, value: l.id}
            })|| lessons);
        };

        fetchSubjects();
        getLessons();

    },[])

    const getSubjectsByLevel=(level)=>{
        console.log('chosen level : ',JSON.stringify(level))
        let subs= subjects.filter(s=>{
            return s.level==level.value
        }).map(s=>{
            return {label: s.name, value:s.id}
        }) || [];

        setFilteredSubjects(subs)
    }

    const filter=(sub)=>{
        if(sub) {
            let ls = [];
            ls = lessons.filter(l => l.subject.id == sub.value).map(lesson => {
                return {label: lesson.name, value: lesson.id};
            });
            return ls;
        }
        return lessons.map(lesson=>{
            return {label: lesson.name, value: lesson.id};
        });
    }

    const handleBackBtn=()=>{
        navigate('/lectures-list')
    }


    const resetForm=()=>{
        setName('');
        setNameError('')
        setContentError('')
        setContent('');
        setSubject('')

    }
    const submitHandler= async ()=>{

        let response='';
       if(validityCheck()==0){
           if(lecture?.id){
               lecture.modifier=user;
               lecture.lastModifiedDate= new Date();
               lecture.name=name;
               lecture.content=content;
               lecture.picture=imageString?imageString:lecture?.picture;
               lecture.pictureContentType=(picture?.name && picture?.type)?lecture?.pictureContentType:lecture?.pictureContentType;
               lecture.pictureName=picture?.name;
               response=await putFetch('/lectures/'+lecture.id,user,JSON.stringify(lecture),'Please wait...saving lecture.');

           }else{
               let lecture= {
                   dateCreated: new Date(),
                   createdBy:user,
                   name : name,
                   content : content,
                   picture : imageString,
                   pictureContentType : picture?.type,
                   pictureName : picture?.name
               }
               response=await postFetch('/lectures',user,JSON.stringify(lecture),'Please wait...saving lecture.');

           }
       }else{
           toast('Please fill in all required fields',{
               type:'error',
               autoClose: 1000,
               position: 'top-center',
           })
       }

       console.log("RESPONSE", response);

       let success=response.code===200 || response.code===201;
       toast(response.message,{
                type: success?'success':"error",
                autoClose:1000,
                position:'top-center',
                transition: Zoom
            })

        if(success){
            console.log('ready to navigate back')
        }

    }

    const validityCheck = () =>{
        let result=0;
        if(!name){
            setNameError("Name can not be empty!");
            result++;
        }
        if(!lesson || lesson.length<1){
            setLessonError("Please select a lesson to which this lecture belongs.");
            result++;
        }
        if(!picture && !content){
            alert(content)
            setContentError("A lesson should have text content or instructions.")
            result++;
        }
        return result;
    }

    const selectFile = (event) => {

        let file = event.target.files[0];
        let size=(file.size/1024)/1024;
        if(size>2){
            setShowUploadError(true)
            setPicture(null)
            return;
        }else{
            setShowUploadError(false)
        }

        let reader = new FileReader();
        reader.readAsDataURL(file);
        setPicture(file);

        reader.onload = (e) => {
            setImageString(e.target.result.split(';base64')[1]);
        }
        console.log(imageString)
    }

    return (
        <form style={{margin: '20px'}} ref={formRef} method={'POST'}>


            <TextField  value={name} autoFocus={true} variant={'standard'} label={'Name of lecture'}
                       className={'form-control'} onChange={e => {setNameError('');setName(e.target.value)}}/>
            {nameError && <p className={'text-danger'}>{nameError}</p> }
            <br/><br/>

            <div style={{border: '1px solid grey', borderRadius: '10px', padding: '20px'}}>
                <div className="d-flex row" style={{flexGrow: 1, flexDirection: 'row'}}>
                    <div className="form-group row-cols-sm-auto" style={{flex: 0.45}}>
                        <Autocomplete id="level" freeSolo filterSelectedOptions options={Levels.map(l => {
                            return {label: l, value: l};
                        })} getOptionLabel={(option) => option.value}
                                      onChange={(e, newValue) => {
                                          getSubjectsByLevel(newValue)
                                      }} form={formRef} field={{}}
                                      renderInput={(params) => (<TextField {...params} value={level} variant="standard"
                                                                           placeholder="Student Level"
                                                                           margin="normal"/>)}/>
                    </div>
                    <div className="form-group row-cols-sm-auto" style={{flex: 0.45}}>
                        <Autocomplete id="subject" freeSolo value={subject} filterSelectedOptions
                                      options={filteredSubjects || ['']} multiple={false} form={formRef} field={{}}
                                      onChange={(e, attr) => {
                                          setLesson(null);
                                          setSubject(attr)
                                      }} getOptionLabel={(option) => option.label || ''}
                                      renderInput={(p) => (
                                          <TextField {...p} value={subject} variant="standard" label={'Select subject here.'} margin="normal"/>)}/>
                    </div>
                </div>
                <div className="form-group">
                    <Autocomplete freeSolo value={lesson} filterSelectedOptions
                                  options={filter(subject) || unfilteredLessons || ['']} form={formRef} field={{}}
                                  onChange={(e, attr) => setLesson(attr)} getOptionLabel={(o) => o.label || ''}
                                  id="lesson" name={'lesson'} renderInput={(p) => (
                        <TextField name={'lesson'} {...p} value={lesson} variant="standard"
                                   onChange={e => {setLessonError(''); setLesson(e.target.value)}} label={'select lesson here'}
                                   margin="normal"/>)}/>
                    {lessonError && <p className={'text-danger'}>{lessonError}</p>}
                </div>
            </div>
            <br/>

            <div className={"d-flex row"} style={{flex: 1, flexDirection: "row"}}>
                <div className="form-group" style={{flex: 1}}>
                    <InputBase variant={'standard'} value={content} placeholder={'Enter lecture content here'} multiline
                               minRows={12} className={'form-control'}
                               maxRows={30} onChange={e => {setContentError('');setContent(e.target.value)}}/>
                    {contentError && <p className={'text-danger'}>{contentError}</p>}
                </div>
               {/* <div className="form-group" style={{flex: 0.4}}>
                    <FileUploader file={picture} onSelect={selectFile} fileType={'image/png, image/jpeg'} type={'image'}
                                  limit={5} showUploadError={showUploadError}/>
                </div>*/}
            </div>

            <br/>
            <div className={'d-flex justify-content-between'}>
                <Button type={'button'} className={'d-flex justify-self-start'} variant={'outlined'} color={'error'}
                        onClick={handleBackBtn}> <KeyboardDoubleArrowLeft /> Back </Button>
                <Button type={'button'} className={'d-flex justify-self-end'} variant={'outlined'} color={'success'}
                        size={'large'} onClick={submitHandler}><UploadFile/> Upload </Button>
            </div>

        </form>
    )

}

export default LectureListItem