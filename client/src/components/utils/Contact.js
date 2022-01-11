import React from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextField from './MyTextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IcecreamIcon from '@mui/icons-material/Icecream';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { subjects, msgArrived } from '../../shared/constants';
import RenderSelect from './RenderSelect';
import {useDispatch } from 'react-redux'
import { addMessage } from '../../redux/ducks/messageDuck'
import '../../index.css';

const initialValues = {
    name: '',
    email: '',
    subject: subjects[0],
    subscribe: false,
    issue: ''
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid email format').required('Required!'),
    issue: Yup.string().required('Required!'),
});

function Contact() {
    const dispatch = useDispatch()

    const onSubmit = async (values) => {
        try {
            dispatch(addMessage(values))
            alert(msgArrived);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Container className='contact'  >
            <Typography variant="h6">Contact us</Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema} //validate
                onSubmit={async (values, { resetForm }) => {
                    await onSubmit(values);
                    resetForm();
                }}
                enableReinitialize
            >
                {(formik) => {
                    return (
                        <Form >
                            <div className="contactForm">
                                <MyTextField
                                    label="Name"
                                    value={formik.values.name}
                                    name={'name'}
                                    formik={formik}
                                />
                                <MyTextField
                                    label="Email"
                                    value={formik.values.email}
                                    name="email"
                                    formik={formik}
                                    type="email"
                                    id="email"
                                />
                                <h3 style={{ textAlign: "center", fontSize: "1rem" }}>Fill out the contact form to
                                    get in touch with us!<br />Please provide as much information as possible for us to help you with your
                                    enquiry.<br />We pledge to respond within 3 business days.</h3>
                            </div>
                            <div className="contactForm">
                                <RenderSelect
                                    label="Subject"
                                    value={formik.values.subject}
                                    options={subjects}
                                    name="subject"
                                    formik={formik}
                                />
                                <FormControlLabel
                                    checked={formik.values.subscribe}
                                    onChange={formik.handleChange}
                                    name="subscribe"
                                    control={<Checkbox />}
                                    label={<Typography style={{ width: '15rem' }}>Don't miss out! Tick this box to receive exclusive offers via mail</Typography>}
                                />

                            </div>
                            <div className="thirdSection">
                                <MyTextField
                                    label="Your message"
                                    name="issue"
                                    option="textarea"
                                    value={formik.values.issue}
                                    formik={formik}
                                    id="issue"
                                />
                                <IcecreamIcon className="icecreamIcon" style={{ fontSize: '8rem' }} />
                            </div>
                            <div style={{ marginTop: '1rem', width: "100%", display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <Button
                                        type="submit"
                                        disabled={!(formik.dirty && formik.isValid)}
                                        variant="contained"
                                        color="success"
                                        style={{ width: "29rem" }} >
                                        Send message
                                        <DoubleArrowIcon />
                                    </Button>
                                    <Button type="reset" color="error">
                                        Reset
                                    </Button>
                                </div>                      
                                <span >Address: Golda street 32, Netanya, Israel</span>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </Container>
    )
}

export default Contact

