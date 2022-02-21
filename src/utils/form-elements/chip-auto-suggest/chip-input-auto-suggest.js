/*
import React, { useEffect, useState } from "react";
import ChipInput from "material-ui-chip-input";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import ReactAutosuggest from "./react-auto-suggest";
import { withStyles } from "@material-ui/core/styles";

const chipInputAutosuggest=()=>{
const renderInput = (inputProps) => {
    const { value, onChange, chips, ref, ...other } = inputProps;

    return (
        <ChipInput
            clearInputValueOnChange
            onUpdateInput={onChange}
            value={chips}
            inputRef={ref}
            {...other}
        />
    );
};

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);

    return (
        <MenuItem
            selected={isHighlighted}
            component="div"
            onMouseDown={(e) => e.preventDefault()} // prevent the click causing the input to be blurred
        >
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
                    ) : (
                        <span key={String(index)}>{part.text}</span>
                    );
                })}
            </div>
        </MenuItem>
    );
};

const renderSuggestionsContainer = (options) => {
    const { containerProps, children } = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
};

const getSuggestionValue = (suggestion) => {
    return suggestion;
};

const styles = (theme) => ({
    container: {
        flexGrow: 1,
        position: "relative"
    },
    suggestionsContainerOpen: {
        position: "absolute",
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        left: 0,
        right: 0,
        zIndex: 1
    },
    suggestion: {
        display: "block"
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: "none"
    },
    textField: {
        width: "100%"
    }
});





    const handleSuggestionsFetchRequested = ({ value }) => {
        setSuggestion(getSuggestions(value));
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestion([]);
    };

    const handletextFieldInputChange = (event, { newValue }) => {
        setTextFieldInput(newValue);
    };

    const handleAddChip = (chip) => {
        setValues([...values, chip]);
        setTextFieldInput("");
    };

    const handleDeleteChip = (chip, index) => {
        values.splice(index, 1);
        setValues([...values]);
    };


    return (
        <Autosuggest
            theme={{
                container: classes.container,
                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                suggestionsList: classes.suggestionsList,
                suggestion: classes.suggestion
            }}
            renderInputComponent={renderInput}
            suggestions={suggestion}
            onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={handleSuggestionsClearRequested}
            renderSuggestionsContainer={renderSuggestionsContainer}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={(e, { suggestionValue }) => {
                handleAddChip(suggestionValue);
                e.preventDefault();
            }}
            focusInputOnSuggestionClick
            inputProps={{
                chips: values,
                value: textFieldInput,
                onChange: handletextFieldInputChange,
                onAdd: (chip) => handleAddChip(chip),
                onDelete: (chip, index) => handleDeleteChip(chip, index)
            }}
        />
    )
};

const ChipInputAutosuggest = withStyles(styles)(ReactAutosuggest);

export default ChipInputAutosuggest;
*/
