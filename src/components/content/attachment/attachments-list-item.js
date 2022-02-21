import React, {useEffect, useRef, useState} from "react";
import {Button, TextField} from "@mui/material";
import FileUploader from "../../file-uploader";
import {getFetchWithProps, postFetch, putFetch} from "../../../services/fetcher";
import {UploadFile} from "@mui/icons-material";
import {Autocomplete} from 'material-ui-formik-components'
import {toast} from "react-toastify";
import Levels from "../../../utils/constants/levels";


const AttachementListItem = (props) => {

    const [document, setDocument]=useState(null);
    const [attachmentString, setAttachmentString] =useState(null);
    const [showUploadError, setShowUploadError] = useState(false);
    const attachment=props.attachment?JSON.parse(props.attachment):{};
    const[lessons,setLessons] = useState([]);
    const[lesson,setLesson] = useState(attachment?.lesson||new Object());
    const [name, setName] = useState('');
    const [lessonError, setLessonError] =useState(false)
    const [subject, setSubject] =useState('');
    const [subjects, setSubjects] =useState([]);
    const [unfilteredLessons, setUnfilteredLessons] =useState([])
    const [filteredLessons, setFilteredLessons] =useState([])
    const [filteredSubjects, setFilteredSubjects] =useState([]);
    const [level, setLevel] = useState('');

    const user=JSON.parse(props.user)

    const formRef=useRef();


    useEffect(()=>{
        const fetchSubjects=async ()=>{
            let result= await getFetchWithProps('/subjects',user,'Please wait... Fetching  data.');
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

    const filter=(sub)=>{
        let ls=[];
        ls=lessons.filter(l=>l.subject.id==sub.value).map(lesson=>{
            return {label: lesson.name, value: lesson.id};
        });
        return ls;
    }

    const getSubjectsByLevel=(level)=>{
        let subs= subjects.filter(s=>{
            return s.level==level.value
        }).map(s=>{
            return {label: s.name, value:s.id}
        }) || [];

        setFilteredSubjects(subs)
    }

    const handleBackBtn=()=>{
        props.setShowModalDialog(false)
    }

    const selectFile = (event) => {

        let file = event.target.files[0];
        let size=(file.size/1024)/1024;
        if(size>10){
            setShowUploadError(true)
            setDocument(file)

            return;
        }else{
            setShowUploadError(false)
        }

        let reader = new FileReader();
        reader.readAsDataURL(file);
        setDocument(file);
        reader.onload = (e) => {
            setAttachmentString(e.target.result);
        }
        //console.log(attachmentString)
    }

    const submitHandler= async ()=>{

        console.log(lesson)
        const result=attachmentString?.split('base64,')[1];

         let lessonz=lessons?.filter(l=>l.name==lesson)[0];
        console.log(lessonz)
        if(attachment?.id){
            attachment.modifier=user;
            if(attachment){
                attachment.lastModifiedDate=new Date();
                attachment.modifier=user;
                attachment.contentType=document?.type||attachment?.type||"";
                attachment.content=result?result:attachment.content||"";
                attachment.name=document?.name|| attachment?.name||"";
                attachment.lesson= lessonz || attachment?.lesson;
            }

            if(!attachment?.lesson){
                toast('Lesson cannot be empty!',{
                    autoClose: 1000,
                    type:'error',
                    position: 'top-center'
                })
                return
            }
            let res=await putFetch('/attachments/'+attachment.id,user,JSON.stringify(attachment),'Please wait...saving attachment.');
            //window.location.reload(false);

        }else{
            let attachment= {

                creator:user,
                createDate : new Date(),
                name : document?.name,
                contentType: document?.type,
                content : result,
                lesson: lessonz
            }

            if(!attachment?.lesson){
                toast('Lesson cannot be empty!',{
                    autoClose: 1000,
                    type:'error',
                    position: 'top-center'
                })
                return
            }
            let res=await postFetch('/attachments',user,JSON.stringify(attachment),'Please wait...saving attachment.');
            //window.location.reload(false);
            console.log(res)
        }


    }



    return (
        <div>
                            <form noValidate autoComplete="off" ref={formRef} onSubmit={submitHandler} method={'POST'}>


                                <div className="form-group">
                                    <Autocomplete id="level" freeSolo filterSelectedOptions options={Levels.map(l=>{return {label:l, value:l};})}  getOptionLabel={(option) => option.value}
                                                  onChange={(e, newValue) => {getSubjectsByLevel(newValue)}} form={formRef} field={{}}
                                                  renderInput={(params) => ( <TextField {...params} value={level} variant="standard" placeholder="Student Level" margin="normal" /> )}/>
                                </div>

                                <div className="form-group">
                                    <Autocomplete id="subject"  freeSolo value={subject} filterSelectedOptions options={filteredSubjects||['']} multiple={false} form={formRef} field={{}}
                                                  onChange={(e, attr) => {setLesson(null);setSubject(attr)}} getOptionLabel={(option) => option.label||''}
                                                  renderInput={(p) => (
                                                      <TextField {...p} value={subject} variant="standard" label={'Select subject here.'}  margin="normal" /> )}/>
                                </div>
                                <br/>
                                <br/>
                                <div className="form-group">
                                    <Autocomplete  freeSolo value={lesson} filterSelectedOptions options={filter(subject)||unfilteredLessons|| ['']} form={formRef} field={{}}
                                                   onChange={(e, attr) => setLesson(attr)} getOptionLabel={(o) => o.label||''}
                                                   id="guardian" renderInput={(p) => (
                                                       <TextField {...p} value={lesson} variant="standard" onChange={e=>{
                                                           setLessonError(''); setLesson(e.target.value)
                                                       }}  label={'select lesson here'} margin="normal" /> )}/>
                                    {lessonError && <p className={'text-danger'}>{lessonError}</p>}
                                </div>

                            <div className="row">
                                <FileUploader file={document} onSelect={selectFile} limit={10} showUploadError={showUploadError}
                                              //application/vnd.ms-excel,image/png, image/jpeg, image/jpg,
                                fileType={'.pdf, .xlsx, .png, .docx, .mp3'}
                                              />
                            </div>
                            <br/>
                            <div className={'d-flex justify-content-between'}>
                                <Button type={'button'} className={'d-flex justify-self-start'} variant={'outlined'}
                                        color={'error'}
                                        onClick={handleBackBtn}> Cancel </Button>
                                <Button type={'submit'} className={'d-flex justify-self-end'} variant={'outlined'}
                                        color={'success'}
                                        size={'large'}> <UploadFile/> Upload </Button>
                            </div>
                        </form>


        </div>


    )

}

export default AttachementListItem