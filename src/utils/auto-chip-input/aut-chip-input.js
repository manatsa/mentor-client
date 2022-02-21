import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AutoChipInput=(props)=> {
    const [val, setVal] = useState([]);

    const valHtml = val.map((option, index) => {
        // This is to handle new options added by the user (allowed by freeSolo prop).
        const label = option.label || option;
        return (
            <Chip
                key={index}
                label={label}
                deleteIcon={<RemoveIcon />}
                onDelete={() => {
                    //setVal(val.filter(entry => entry !== option));
                    props.setValue(props.value.filter(entry => entry !== option));
                }}
            />
        );
    });

    return (
        <div style={{ width: 500 }}>
            <Autocomplete
                multiple={props.multiple}
                id="tags-standard"
                freeSolo
                filterSelectedOptions
                options={props.options}
                onChange={(e, newValue) => {props.setValue(newValue)}}
                getOptionLabel={option => option.label}
                renderTags={() => {}}
                value={props.value}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="standard"
                        placeholder={props.placeholder}
                        margin="normal"
                        fullWidth
                    />
                )}
            />
            <div className="text-primary">{valHtml}</div>
        </div>
    );
}

export default  AutoChipInput;