import React from 'react';
import { ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import TextError from './TextError';
import '../../index.css'

function MyTextField(props) {
    const { handleChange, handleBlur } = props.formik;
    const { value, name, label, id, type, option, placeHolder, min, max } = props;
    const isTextArea = option === 'textarea'
    const formControlClass = isTextArea ? "textAreaControl" : name === "time" ? "time": "form-control" 

    return (
        <div className={formControlClass} >
            <TextField
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                required={label !== "Zip code"}
                name={name}
                id={id}
                label={label}
                InputProps={type === 'month' || type === 'time' || type === 'date' ? { inputProps: { min: min, max: max} } : null}
                type={'text' && type}
                multiline={isTextArea}
                minRows={isTextArea ? 2 : null}
                maxRows={isTextArea ? 4 : null}
                autoFocus={name === 'firstName'}
                style={{ width: "100%" }}
                placeholder={placeHolder}
            />
            <ErrorMessage name={name} component={TextError} sx={{  width: '100%' }} />
        </div>
    );
}

export default MyTextField;