import React from 'react';
import TextField from '@mui/material/TextField';
import TextError from './TextError';
import { ErrorMessage } from 'formik';

function RenderSelect(props) {
    const { value, formik, options, name, label, onChangeExtra } = props;
    const { handleChange, handleBlur } = formik;
    const Label = `Select ${label}`
 
    return (
        <div>
            <TextField
                select
                value={value}     
                onChange={onChangeExtra ? e => { handleChange(e); onChangeExtra(e)}:handleChange}
                onBlur={handleBlur}
                name={name}
                variant="outlined"
                label={(label === "Code") ? label : Label}   
                margin="normal"
                style={{ backgroundColor: "lightGray", marginRight: label==="Role"? 0: "1.5rem", marginBottom: 0,
                 marginTop: 0, width: label === "Code" ? '4rem' : '14rem' }}
                required
                SelectProps={{ native: true }}
            >
                {(label === "Weight in kg" || label === "Flavor" || label==="Role") && <option disabled >  </option>}
                {options.map((option) => <option key={option} value={option} > {option} </option>)}
            </TextField>
            {label !== "Weight in kg" && <ErrorMessage name={name} component={TextError} />}
        </div >
    );
}

export default RenderSelect;