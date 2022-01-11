import React, { useState, useEffect } from 'react';
import {
    minIdVal, minIdDigitsError, creditCardFormatLength, codes, minZipCodeNum, streetNumError,
    zipCodeError, validExpirationDateMsg
} from '../../shared/constants'
import MyTextField from '../utils/MyTextField';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router';
import RenderSelect from '../utils/RenderSelect';
import { addOrder } from '../../redux/ducks/shipmentDuck'
import { useSelector, useDispatch } from 'react-redux'
import RowInForm from '../utils/RowInForm';

const initialValues = {
    firstName: '',
    lastName: '',
    id: '',
    phone: { code: codes[0], phoneNum: '' },
    address: { city: '', streetName: '', houseNum: '', zipCode: '' },
    payment: { nameOnCard: '', cardNum: '', expireDate: '', CVV: '' },
};

const today = new Date();
const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
const validMonth = nextMonth.getMonth() + 1;
const validYear = nextMonth.getFullYear();
const minDate = `${validYear}-${(validMonth < 10 ? `0${validMonth}` : validMonth)}`


const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Required!'),
    lastName: Yup.string().required('Required!'),
    id: Yup.number().integer().min(minIdVal, minIdDigitsError).required('Required!'),

    phone: Yup.object().shape({
        phoneNum: Yup.number().integer().required('Required!')
    }),

    address: Yup.object().shape({
        city: Yup.string().required('Required!'),
        streetName: Yup.string().required('Required!'),
        houseNum: Yup.number().integer().positive(streetNumError).required('Required!'),
        zipCode: Yup.number().integer().min(minZipCodeNum, zipCodeError)
    }),

    payment: Yup.object().shape({
        nameOnCard: Yup.string().required('Required!'),
        cardNum: Yup.string().min(creditCardFormatLength, 'Invalid Credit card format')
            .matches(/^\(?([0-9]{4})\)?[-]([0-9]{4})[-]([0-9]{4})[-]([0-9]{4})$/, 'Invalid Credit card format').required('Required!'),
        expireDate: Yup.date().min(today, validExpirationDateMsg).required('Required!'),
        CVV: Yup.number().integer().min(100).max(999).required('Required!')
    })
});

function BuyForm() {
    const navigate = useNavigate();
    const shipmentState = useSelector(state => state.shipment)
    const dispatch = useDispatch()
    const params = useParams();
    const { weight, flavors, time, price } = params
    const [savedValues, setSavedValues] = useState(null)

   
    useEffect(() => {
        if (localStorage.getItem("buyer")) {
            const buyer = JSON.parse(localStorage.getItem("buyer")) 
        
            const newValues = {
                firstName: buyer.firstName,
                lastName: buyer.lastName,
                id: buyer.id,
                phone: { code: buyer.phone.code, phoneNum: buyer.phone.phoneNum },
                address: {
                    city: buyer.address.city, streetName: buyer.address.streetName, houseNum: buyer.address.houseNum,
                    zipCode: buyer.address.zipCode
                },
                payment: { nameOnCard: '', cardNum: '', expireDate: '', CVV: '' },
            }
            setSavedValues(newValues)
        }
    }, [])

    useEffect(() => {
        if (shipmentState.order) {
            const { token, lastDigits } = shipmentState.order
            localStorage.setItem("token", token)
            navigate(`/revieworder/${weight}/${flavors}/${time}`, { state: lastDigits })
        }
    }, [shipmentState])

    const goBack = (values) => {
        localStorage.setItem("buyer", JSON.stringify(values))
        navigate(`/deliveries/:${weight}/:${flavors}/:${time}`)
    }


    const onSubmit = async (values) => {
        const date = new Date()
        const copyParams = { ...params, time: `${today.getDate()}/${today.getMonth() + 1}/${date.getFullYear()} ${params.time}`}
        console.log(params)
        const data = { order: copyParams, buyer: values }
        try {
            dispatch(addOrder(data))
        } catch (error) {
            alert(error.message)
        }
    };
 
    return (
        <Container maxWidth="sm" style={{ marginTop: "1rem" }} >
            <Typography variant="h5" textAlign="center">Please fill all the fields</Typography>
            <br />
            <Formik
                initialValues={savedValues || initialValues}
                validationSchema={validationSchema} //validate
                onSubmit={async (values) => {
                    await onSubmit(values);
                }}
                enableReinitialize
            >
                {(formik) => {
                    return (
                        <Form justifycontent="center">
                            <RowInForm header="Identification" label1="First name" value1={formik.values.firstName} name1={'firstName'}
                                formik={formik} label2="Last name" value2={formik.values.lastName} name2="lastName" />

                
                            <div style={{ display: "flex", height: "6rem", justifyContent: "center" }}>
                                <MyTextField
                                    label="Id"
                                    value={formik.values.id >= 0 ? formik.values.id : 0}
                                    name="id"
                                    formik={formik}
                                    type="number"
                                />
                                <RenderSelect options={codes} label="Code"
                                    value={formik.values.phone.code}
                                    name="phone.code"
                                    formik={formik} />
                                <MyTextField
                                    label="Phone number"
                                    value={formik.values.phone.phoneNum}
                                    name="phone.phoneNum"
                                    formik={formik}
                                    type="tel"
                                />
                            </div>

                            <RowInForm header="Address" label1="City" value1={formik.values.address.city} name1={'address.city'}
                                formik={formik} label2="Street" value2={formik.values.address.streetName} name2="address.streetName" />

                            <RowInForm label1="House number" value1={formik.values.address.houseNum >= 0 ? formik.values.address.houseNum : 0}
                                name1={'address.houseNum'} type1="number" formik={formik} label2="Zip code" type2="number"
                              value2={formik.values.address.zipCode >= 0 ? formik.values.address.zipCode : 0} name2="address.zipCode" />

                            <RowInForm header="Payment" label1="Name of card" value1={formik.values.payment.nameOnCard}
                                name1={'payment.nameOnCard'} formik={formik} label2="Card number"
                                value2={formik.values.payment.cardNum} name2="payment.cardNum" placeHolder2="1111-2222-3333-4444"/>

                            <RowInForm label1="Expire date" value1={formik.values.payment.expireDate}
                                name1={'payment.expireDate'} type1="month"  formik={formik} label2="CVV" 
                                min={minDate} value2={formik.values.payment.CVV} name2="payment.CVV" type2="number" />
                               

                            <div style={{ marginTop: '1rem' }}>
                                <Button
                                    type="submit"
                                    disabled={!(formik.dirty && formik.isValid)}
                                    variant="contained"
                                    color="primary"
                                    style={{ width: "8rem", marginRight: '0.5rem' }}
                                >
                                    Pay
                                </Button>
                                <Button
                                    variant="contained"
                                    color="warning"
                                    style={{ width: "8rem", marginRight: '0.5rem' }}
                                    onClick={() => goBack(formik.values)}
                                >
                                    Go back
                                </Button>
                                <Button type="reset" color="error">
                                    Reset
                                </Button>
                                <div>Total: {price}$</div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </Container>
    );
}

export default BuyForm;
