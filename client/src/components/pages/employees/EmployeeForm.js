import { Button, Container, Typography } from '@mui/material';
import React from 'react'
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import {
    minIdVal, minIdDigitsError, codes, minZipCodeNum, streetNumError, today, maxDate, isLegalAge, roles, zipCodeError,
    minPasswordLength, minPasswordDigitsError, convertDate, goBackMsg, legalAgeMsg, updateEmployeeMsg, addedEmployeeMsg
} from '../../../shared/constants'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'
import RowInForm from '../../utils/RowInForm';
import { AccessDenied } from '../../utils/AccessDenied';
import { editEmployee, addEmployee } from '../../../redux/ducks/employeeDuck';//redux/ducks/employeeDuck
import { useDispatch } from 'react-redux';
import axios from 'axios';

const initialValues = {
    firstName: '',
    lastName: '',
    id: '',
    email: '',
    phone: { code: codes[0], phoneNum: '' },
    address: { city: '', streetName: '', houseNum: '', zipCode: '' },
    role: '',
    hireDate: '',
    birthDate: '',
    password: ''
};


const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Required!'),
    lastName: Yup.string().required('Required!'),
    id: Yup.number().min(minIdVal, minIdDigitsError).required('Required!'),
    email: Yup.string().email('Invalid email format').required('Required!'),
    phone: Yup.object().shape({
        phoneNum: Yup.number().integer().required('Required!')
    }),

    address: Yup.object().shape({
        city: Yup.string().required('Required!'),
        streetName: Yup.string().required('Required!'),
        houseNum: Yup.number().integer().positive(streetNumError).required('Required!'),
        zipCode: Yup.number().integer().min(minZipCodeNum, zipCodeError),
    }),

    role: Yup.string().required('Required!'),
    hireDate: Yup.date().max(today).required('Required!'),
    birthDate: Yup.date().required('Required!'),
    password: Yup.string().min(minPasswordLength, minPasswordDigitsError).required('Required!')
});


export const constructAddress = (fullAddress) => {
    const addressObj = {}
    const indexToContinue = FillAddressObj(addressObj, fullAddress, "street", "houseNumber", 0)

    FillAddressObj(addressObj, fullAddress, "city", "zipCode", indexToContinue)
    return addressObj;
}

const FillAddressObj = (addressObj, addressArr, prop1, prop2, index) => {
    addressObj[prop1] = ''
    for (let i = index; i < addressArr.length; i++) {
        if (addressArr[i] === 'Zip' || addressArr[i] === 'code:') continue
        if (Number(addressArr[i][0])) {
            const arr = addressArr[i].split(',')
            addressObj[prop2] = arr[0];

            return i + 1;
        }
        addressObj[prop1] += `${addressArr[i]} `;
    }
}

function EmployeeForm() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const dispatch = useDispatch();
    const employee = state && state.employee
    const index = state && state.index
    const token = localStorage.getItem('adminToken');
    let savedValues = null;

    if (employee) {
        const phoneData = employee.phone.split('-')
        const addressObject = constructAddress(employee.address.split(' '))

        savedValues = {
            firstName: employee.firstName,
            lastName: employee.lastName,
            id: employee.id,
            email: employee.email,
            phone: { code: phoneData[0], phoneNum: phoneData[1] },
            address: {
                city: addressObject.city, streetName: addressObject.street, houseNum: Number(addressObject.houseNumber),
                zipCode: Number(addressObject.zipCode)
            },
            role: employee.role,
            hireDate: convertDate(new Date(employee.hireDate)),
            birthDate: convertDate(new Date(employee.birthDate)),
            password: employee.password
        }
    }

    const goBack = () => {
        if (window.confirm(goBackMsg)) navigate(-1);
    }

    const onSubmit = async (values) => {
        console.log(values)

        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('adminToken');
        if (!isLegalAge(new Date(values.birthDate))) {
            alert(legalAgeMsg);
            return;
        }

        try {
            dispatch(employee ? editEmployee(values, employee._id, index) : addEmployee(values))
            const msg = employee ? updateEmployeeMsg : addedEmployeeMsg

            alert(`${msg} successfully`)
            navigate(-1);
        } catch (error) {
            alert(error)
        }
    };

    return (
        <>
            {token ? <Container maxWidth="sm" style={{ marginTop: "1rem" }} >
                <Typography variant="h5" textAlign="center">Please fill all the fields</Typography>
                <br />
                <Formik
                    initialValues={savedValues || initialValues}
                    validationSchema={validationSchema} //validate
                    onSubmit={async (values,) => { await onSubmit(values); }}
                    enableReinitialize
                >
                    {(formik) => {
                        return (
                            <Form justifycontent="center">
                                <RowInForm header="Identification" label1="First name" value1={formik.values.firstName} name1={'firstName'}
                                    formik={formik} label2="Last name" value2={formik.values.lastName} name2="lastName" />

                                <RowInForm label1="Id" value1={formik.values.id >= 0 ? formik.values.id : 0} name1={'id'}
                                    formik={formik} type1="number" label2="Email" value2={formik.values.email} name2="email" type2="email" />
                                <br />
                                <RowInForm label1="Code" value1={formik.values.phone.code} name1='phone.code' select1={true} options1={codes}
                                    formik={formik} label2="Phone number" value2={formik.values.phone.phoneNum} name2="phone.phoneNum"
                                    type2="tel" />

                                <RowInForm header="Address" label1="City" value1={formik.values.address.city} name1={'address.city'}
                                    formik={formik} label2="Street" value2={formik.values.address.streetName} name2="address.streetName" />

                                <RowInForm label1="House number"
                                    value1={formik.values.address.houseNum >= 0 ? formik.values.address.houseNum : 0} name1={'address.houseNum'}
                                    type1="number" label2="Zip code" name2="address.zipCode" type2="number" formik={formik}
                                    value2={formik.values.address.zipCode >= 0 ? formik.values.address.zipCode : 0} />

                                <RowInForm header="Other details" label1="Hire date" value1={formik.values.hireDate} name1={'hireDate'}
                                    formik={formik} type1="date" max={maxDate} label2="Role" value2={formik.values.role} name2="role"
                                    options2={roles} select2={true} />

                                <RowInForm label1="Date of birth" value1={formik.values.birthDate} name1={'birthDate'} formik={formik}
                                    type1="date" label2="Password" value2={formik.values.password} name2="password" type2="password" />

                                <div style={{ marginTop: '1rem' }}>
                                    <Button
                                        type="submit"
                                        disabled={!(formik.dirty && formik.isValid)}
                                        variant="contained"
                                        color="primary"
                                        style={{ width: "10rem", marginRight: '0.5rem' }}
                                    >
                                        {employee ? "Save data" : "Add employee"}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        style={{ width: "8rem", marginRight: '0.5rem' }}
                                        onClick={goBack}
                                    >
                                        Go back
                                    </Button>
                                    <Button type="reset" color="error">
                                        Reset
                                    </Button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </Container> : <AccessDenied />}
        </>

    )
}

export default EmployeeForm
