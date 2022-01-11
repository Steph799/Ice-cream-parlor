import React from 'react'
import Rating from '@mui/material/Rating';
import { rateRangeError, maxRate, postCommentMsg } from '../../shared/constants'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextField from '../utils/MyTextField';
import { Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { addComment} from '../../redux/ducks/commentDuck'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';

const initialValues = {
    name: '',
    title: '',
    content: '',
    rate: 0,
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required!'),
    title: Yup.string().required('Required!'),
    content: Yup.string().required('Required!'),
    rate: Yup.number().min(0, rateRangeError).max(maxRate, rateRangeError),
});


function CreateComment() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const onSubmit = async (values) => {
        try {
            dispatch(addComment(values))
            alert(postCommentMsg);
            navigate(-1)
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "1rem" }}>
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
                            <div style={{ display: "flex", height: "6rem"}}>
                                <MyTextField
                                    label="Name"
                                    value={formik.values.name}
                                    name={'name'}
                                    formik={formik}
                                />
                                <MyTextField
                                    label="Title"
                                    value={formik.values.title}
                                    name="title"
                                    formik={formik}
                                />
                            </div>
                            <Typography component="legend">Rating</Typography>
                            <Rating value={Number(formik.values.rate)} onChange={formik.handleChange} precision={0.5} name="rate" />
                            <MyTextField
                                label="Content"
                                name="content"
                                option="textarea"
                                value={formik.values.content}
                                formik={formik}
                            />

                            <div style={{ marginTop: '1.5rem', width: "100%", display: "flex" }}>
                                <Button
                                    type="submit"
                                    disabled={!(formik.dirty && formik.isValid)}
                                    variant="contained"
                                    color="primary"
                                    style={{ width: "29rem" }} >
                                    Post comment
                                </Button>
                                <Button type="reset" color="error">
                                    Reset
                                </Button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </Container>
    )
}

export default CreateComment
