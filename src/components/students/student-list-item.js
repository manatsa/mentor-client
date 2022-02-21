import React, {useEffect, useRef, useState, Fragment} from "react";
import {ErrorMessage, useFormik} from "formik";
import {Autocomplete, Button, Chip, MenuItem, Select, TextField} from "@mui/material";
import * as yup from 'yup';
import DateFnsUtils from '@date-io/date-fns';
import {Remove} from '@mui/icons-material'
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import ChipInput from "material-ui-chip-input";
import {getFetchWithPropsPlain, postFetch, putFetch} from "../../services/fetcher";
import {useLocation, useNavigate} from 'react-router-dom'
import Levels from "../../utils/constants/levels";
import { alpha } from '@material-ui/core/styles';
import {KeyboardDatePicker} from "material-ui-formik-components";
import ChipInputAutosuggest from "../../utils/form-elements/chip-auto-suggest/chip-input-auto-suggest";
import AutoChipInput from "../../utils/auto-chip-input/aut-chip-input";
import AutoChipWithChildren from "../../utils/auto-chip-with-children/auto-chip-with-children";
import {toast} from "react-toastify";

const StudentListItem = (props) => {

    const login=localStorage.getItem('user');
    const user=(login)?JSON.parse(login):null;
    const navigate=useNavigate();
    const { state } = useLocation();
    const s=(state)?JSON.parse(state):null;
    const [agency, setAgency] = useState(s?.agency||'');
    const [guardians, setGuardians] = useState([]);
    const [guardian, setGuardian] = useState(s?.guardian||'');
    const [firstName, setFirstName]=useState(s?.firstName||'')
    const [lastName, setLastName] =useState(s?.lastName||'');
    const [idNumber,setIdNumber] =useState(s?.idNumber||'');
    const [email, setEmail]=useState(s?.email||'');
    const [phone, setPhone] = useState(s?.phone||'');
    const [ address, setAddress] = useState('')
    const [dob, setDOB] = useState(Date.parse(s?.dob||'1-1-2000'));
    const [school, setSchool] =useState(s?.school||'');
    const [schools, setSchools] =useState([]);
    const [subjectsList,setSubjectList] = useState([]);
    const [agencies, setAgencies] = useState([]);
    const [student, setStudent] =useState(s||new Object());
    const [firstNameError, setFirstNameError] =useState('');
    const [lastNameError, setLastNameError] =useState('');
    const [idNumberError, setIdNumberError] =useState('');
    const [addressError, setAddressError] = useState('');
    const [dobError, setDobError] = useState('');
    const [phoneError, setPhoneError] =useState('');
    const [schoolError, setSchoolError] =useState('');
    const [subjectsError, setSubjectsError] =useState('')
    const [emailError, setEmailError] = useState('');
    const [agencyError, setAgencyError] =useState('');
    const [level, setLevel] = useState(s?.level||'');


    useEffect(async ()=>{

        const fetchSchools=async ()=>{
            let result= await getFetchWithPropsPlain('/schools',user,'Please wait... Fetching list of schools.');
            return result;
        }
        const fetchGuardians=async ()=>{
            let result= await getFetchWithPropsPlain('/guardians',user,'Please wait... Fetching list of Guardians.');
            return result;
        }
        const fetchAgencies=async ()=>{
            let result= await getFetchWithPropsPlain('/agencies',user,'Please wait... Fetching list of Agencies.');
            return result;
        }
        const fetchSubjects=async ()=>{
            let result= await getFetchWithPropsPlain('/subjects',user,'Please wait... Fetching list of subjects.');
            return result;
        }
        const getData=async ()=>{
            let ss=await fetchSubjects();
            let sData=ss.data;
            setSubjectList(sData);
            let ags=await fetchAgencies();
            let aData=ags.data;
            setAgencies(aData);
            let guards=await fetchGuardians();
            let gData=guards.data;
            setGuardians(gData);
            let schs=await fetchSchools();
            let cData=schs.data;
            setSchools(cData);
            console.log('SUBJECTS',subjectsList)
        }
        toast.promise(
            getData(),{
                pending: 'Please wait..Fetching data.',
                success: 'Done loading data.',
                error:'Error loading data.'
            }
        )
    },[student])



    const [subjects, setSubjects] = useState([]);
    const [val, setVal] = useState([]);

    const formRef=useRef();

    const filteredGuardians=guardians?.map(s=>{return {label:s.firstName+' '+s.lastName, value:s.id}}).filter(a=>a.label!=undefined);
    const filteredSchools=schools?.map(s=>{return {label:s.name, value:s.id}}).filter(a=>a.label!=undefined);
    const filteredAgencies=agencies.map(a=>{return {label:a.firstName+' '+a.lastName, value:a.id}}).filter(a=>a.label!=undefined);

    const validateFields=()=>{
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let result=0;
        if(!firstName || firstName.length<2){
            setFirstNameError('Please enter valid  student first name');
            result++;
        }else{
            setFirstNameError('');
        }
        if(!lastName || lastName.length<3){
            setLastNameError('Please enter a valid student last name.');
            result++;
        }else{
            setLastNameError('')
        }
        if(!idNumber || idNumber.length<6){
            setIdNumberError("Please enter a valid student National ID Number.");
            result++;
        }else{
            setIdNumberError('')
        }
        if(!address || address.length<10){
            setAddressError("Address is expected to be 10 characters or more.");
            result++;
        }else{
            setAddressError('')
        }
        if(!phone || phone.length<5){
            setPhoneError("Phone number must be at least 4 characters long.")
            result++;
        }else{
            setPhoneError('')
        }
        if(email && !email.match(regexEmail)){
            setEmailError('This email is has invalid format.');
            result++;
        }else{
            setEmailError('')
        }
        if(!subjects || subjects.length<1){
            setSubjectsError('Every registered student should have at least one subject to study.');
            result++;
        }   else{
            setSubjectsError('')
        }
        if(!school){
            setSchoolError("Please select the student's school.")
            result++;
        }else{
            setSchoolError('')
        }
        if(!agency){
            setAgencyError("Please select agency.");
            result++;
        }else{
            setAgencyError('')
        }

        return result;
    }



    const getSubjectsByLevel=(level)=>{
        //console.log('Subject List : ',JSON.stringify(subjectsList))
        let subs= subjectsList.filter(s=>{
            return s.level==level
        }).map(s=>{
            return {label: s.name, value:s.id}
        }) || [];
        return subs
    }

    const submitHandler=()=>{
        let subIDs=subjects.map(sb=>sb.value);
        //console.log('SUB IDs', subIDs);
        let selectedSubjects=subjectsList.filter(s=>subIDs.includes(s.id));
        //console.log("Selected Subjects :",selectedSubjects);
        let pupil={
            firstName: firstName,
            lastName: lastName,
            idNumber: idNumber,
            dob: dob,
            email: email,
            phone: phone,
            address: address,
            school: schools.find(s=>s.id===school.value),
            subjects: selectedSubjects ,
            agency: agencies.find(a=>a.id===agency.value),
            guardian: guardians.find(g=>g.id===guardian.value),
            level: level
        }
        if(validateFields()==0){
            student.dob=dob;
            student.firstName=firstName;
            student.lastName=lastName;
            student.idNumber=idNumber;
            student.email=email;
            student.phone=phone;
            student.subjects=selectedSubjects;
            student.address=address;
            student.guardian=pupil.guardian;
            student.agency=pupil.agency;
            student.school=pupil.school
            student.level= level
            if(student.id){
                student.modifier=user;
                student.lastModifiedDate=new Date();
                let res=putFetch("/students/"+student.id,user,JSON.stringify(student),"Please wait....saving student info.");
            }else{
                student.creator=user;
                student.createDate=new Date();
                let resp=postFetch('/students', user, JSON.stringify(pupil),"Please wait...saving student info.");
            }
            console.log('STUDENTS:',student)
            navigate("/students-list");
        }else{
            console.log('errors in the form')
        }

    }

   return (
       <div className={"d-flex justify-content-center justify-self-center"}>
           <form style={{width: '80%'}} ref={formRef}>
               <div className="d-flex justify-content-between">
                   <div className="col-md-5 col-sm-12">
                       <div className={'form-group'}>
                           <TextField name={'firstName'} variant={'standard'} value={firstName} onChange={e=>{setFirstNameError('');setFirstName(e.target.value)}}
                               label={'Student First Name'} className={'form-control'} onBlur={e=>{}}/>
                           {firstNameError && <p className={'text-danger'}>{firstNameError}</p>}
                       </div>
                       <br/>
                       <div className="form-group">
                           <TextField name={'lastName'} variant={'standard'} value={lastName} onChange={e=>{setLastNameError('');setLastName(e.target.value)}}
                                      label={'Student Last Name'} className={'form-control'}/>
                           {lastNameError && <p className={'text-danger'}>{lastNameError}</p>}
                       </div>
                       <br/>
                       <div className="form-group">
                           <TextField name={'idNumber'} variant={'standard'} value={idNumber} onChange={e=>{setIdNumberError('');setIdNumber(e.target.value)}}
                                      label={'Student ID Number'} className={'form-control'}/>
                           {idNumberError && <p className={'text-danger'}>{idNumberError}</p>}
                       </div>
                       <br/>
                       <div className="form-group">
                           <MuiPickersUtilsProvider utils={DateFnsUtils}>
                               <Fragment>
                                   <KeyboardDatePicker field={{}} form={formRef} autoOk variant="inline" inputVariant="standard"label="Student date of birth(dd-MM-yyyy)"  openTo={'year'}
                                       format="dd/MM/yyyy" value={dob} disableFuture InputAdornmentProps={{ position: "end" }}onChange={date => setDOB(date)} alpha={'outlinedSuccess'}/>
                               </Fragment>
                           </MuiPickersUtilsProvider>
                           {dobError && <p className={'text-danger'}>{dobError}</p>}
                       </div>
                       <br/>
                       <div className="form-group">
                           <TextField  type={'email'}  variant={'standard'} value={email} onChange={e=>{setEmailError('');setEmail(e.target.value)}}
                                       label={'Student Email address'} className={'form-control'} />
                           {emailError && <p className={'text-danger'}>{emailError}</p>}
                       </div>
                       <br/>
                       <div className="form-group">
                           <TextField  variant={'standard'} value={address} onChange={e=>{setAddressError('');setAddress(e.target.value)}}
                                      label={'Student Address'} className={'form-control'} placeholder={'Enter student address'}/>
                           {addressError && <p className={'text-danger'}>{addressError}</p>}
                       </div>
                       <br/>
                   </div>
{/*//****************************************************************************************************************************************************************************************/}
                   <div className="col-md-5 col-sm-12">
                       <div className="form-group">
                           <TextField type={'tel'} variant={'standard'} value={phone} onChange={e=>{setPhoneError('');setPhone(e.target.value)}}
                                      label={'Student Phone'} className={'form-control'} placeholder={'Enter student phone'}/>
                           {phoneError && <p className={'text-danger'}>{phoneError}</p>}
                       </div>
                        <div className="form-group">
                            <Autocomplete id="school"  freeSolo value={school} filterSelectedOptions options={filteredSchools||['']}
                                          onChange={(e, attr) => {setSchoolError('');setSchool(attr)}} getOptionLabel={(option) => option.label||''}
                                          renderInput={(p) => ( <TextField {...p} variant="standard" alpha={'primary'} placeholder="Student's name of the school" margin="normal" /> )}/>
                            {schoolError && <p className={'text-danger'}>{schoolError}</p>}
                        </div>
                       <br/>
                        <br/>
                        <div className="form-group">
                            <Autocomplete  freeSolo value={guardian} filterSelectedOptions options={filteredGuardians||['']}
                                           onChange={(e, attr) => setGuardian(attr)} getOptionLabel={(o) => o.label||''}
                                           id="guardian" renderInput={(p) => ( <TextField {...p} variant="standard" placeholder="Student's Guardian" margin="normal" /> )}/>
                            {/*{guard && <p className={'text-danger'}>{firstNameError}</p>}*/}
                        </div>
                       <br/>
                       <div className="form-group">
                           <Autocomplete id="level" freeSolo filterSelectedOptions options={Levels.map(l=>{return {label:l, value:l};})}  getOptionLabel={(option) => option.value}
                                         onChange={(e, newValue) => {
                                             if (newValue === null) {
                                                 setVal([]);
                                                 setSubjects([]);
                                             } else {
                                                 setVal(newValue.value);
                                                 setSubjects([]);
                                             }
                                         }}
                                         renderInput={(params) => ( <TextField {...params} value={level} variant="standard" placeholder="Student Level" margin="normal" /> )}/>
                       </div>


                       <div className="form-group">
                           <Autocomplete  multiple id="subject-tags"  freeSolo value={subjects} filterSelectedOptions={true} options={getSubjectsByLevel(val)} getOptionLabel={(option) => option.label}
                                          onChange={(e, attr) => {setSubjectsError('');setSubjects(attr)}}
                                          renderInput={(params) =>{return ( <TextField {...params} value={subjects} variant="standard" placeholder="Student Subjects" margin="normal" /> )}}/>
                           {subjectsError && <p className={'text-danger'}>{subjectsError}</p>}
                       </div>

                       <br/>
                       <div className="form-group">
                           <Autocomplete   id="agency"  freeSolo value={agency} filterSelectedOptions={true} options={filteredAgencies}
                                           onChange={(e, attr) => {setAgencyError('');setAgency(attr)}} getOptionLabel={(option) => option.label||''}
                                           renderInput={(params) => ( <TextField {...params} variant="standard" placeholder="Responsible Agent" margin="normal" /> )}/>
                           {agencyError && <p className={'text-danger'}>{agencyError}</p>}
                       </div>

                       <br/>
                       <div className="row">
                           {/*<Select  value={formik.values.school} label="School for the student" name={'school'}
                                   className={'form-control'}  variant={'standard'}
                                   onChange={formik.handleChange} onBlur={formik.handleBlur}
                                   placeholder={'Select Student School'}>
                               {
                                   schools.map(sch => {
                                       return (
                                           <MenuItem variant={'standard'} key={sch.id} value={sch.id}>{sch.name}</MenuItem>
                                       )
                                   })
                               }
                           </Select>*/}
                       </div>

                       <br/><br/>

                   </div>
               </div>

               <div className={'d-flex justify-content-around'} style={{margin: '0px 60px'}}>
                   <Button type={'button'} variant={'outlined'} color={'error'}
                           onClick={() => navigate("/students-list")}> Cancel </Button>
                   <Button type={'button'} variant={'outlined'} color={'success'} onClick={submitHandler}> Save </Button>
               </div>
           </form>

       </div>

   )

}



export default StudentListItem;