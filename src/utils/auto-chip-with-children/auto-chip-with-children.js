import React, {useState} from 'react';
import {Autocomplete, TextField} from "@mui/material";

function AutoChipWithChildren(props) {
    const [val, setVal] =useState([])
    return (
        <div>
            <Autocomplete id="level" freeSolo filterSelectedOptions options={props.firstOptions}  getOptionLabel={(option) => option.label}
                          onChange={(e, newValue) => {
                              if (newValue === null) {
                                  props.setVal([]);
                                  props.setValue([]);
                              } else {
                                  props.setVal(newValue.value);
                                  props.setValue([]);
                              }
                          }}
                          renderInput={(params) => ( <TextField {...params} variant="standard" placeholder={props.placeholder} margin="normal" /> )}/>

        <Autocomplete  multiple id="subject-tags"  freeSolo value={props.value} filterSelectedOptions={true} options={props.mapFirstToSecondOptions(props.val)} getOptionLabel={(option) => option.label}
                       onChange={(e, v) => {props.setValueError('');props.setValue(v)}}
                       renderInput={(params) => ( <TextField {...params} variant="standard" placeholder="Student Subjects" margin="normal" /> )}/>
        </div>
    );
}

export default AutoChipWithChildren;