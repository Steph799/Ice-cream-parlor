import { Typography } from '@mui/material'
import React from 'react'
import GenericField from './GenericField'

function RowInForm({ header, label1, value1, name1, type1, select1, placeHolder1, formik, label2, value2, options1, name2, type2, min,
     max,  select2, options2, placeHolder2 }) {
    return (
        <>
            {header && <Typography variant="h6" textAlign="center">{header}</Typography>}
            <div style={{ display: "flex", height: "6rem", justifycontent: "center" }}>
                <GenericField
                    label={label1}
                    value={value1}
                    name={name1}
                    formik={formik}
                    options={options1}
                    type={type1}
                    max={max} 
                    min={min}
                    select={select1}
                    placeHolder={placeHolder1}
                />
                <GenericField
                    label={label2}
                    value={value2}
                    name={name2}
                    formik={formik}
                    options={options2}
                    type={type2}
                    max={max}
                    min={min}
                    select={select2}
                    placeHolder={placeHolder2}
                />
            </div>
        </>
    )
}

export default RowInForm
