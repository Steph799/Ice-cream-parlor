import React from 'react'
import MyTextField from './MyTextField'
import RenderSelect from './RenderSelect'

function GenericField({ label, value, name, formik, type, min, max, select, options, placeHolder }) {
    return (
        <>
            {select ?
                <RenderSelect
                    label={label}
                    value={value}
                    name={name}
                    formik={formik} 
                    options={options}
                    placeHolder={placeHolder}/> :
                <MyTextField
                    label={label}
                    value={value}
                    name={name}
                    formik={formik}
                    type={type ? type : "text"}
                    max={max}
                    min={min}
                    placeHolder={placeHolder}
                />}
        </>
    )
}

export default GenericField
