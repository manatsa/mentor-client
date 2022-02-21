import {useEffect, useState} from "react";

const ReactAutosuggest = (props) => {
    const {data, classes, ...other} = props;
    const [suggestion, setSuggestion] = useState([]);
    const [values, setValues] = useState([]);
    const [textFieldInput, setTextFieldInput] = useState("");

    useEffect(() => {
        setSuggestion(data);
    }, []);

    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;

        return inputLength === 0
            ? []
            : data.filter((suggestion) => {
                const keep =
                    count < 5 &&
                    suggestion.toLowerCase().slice(0, inputLength) === inputValue;

                if (keep) {
                    count += 1;
                }

                return keep;
            });
    }
}
export default ReactAutosuggest;


