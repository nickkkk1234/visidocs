import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Home: React.FC = () => {
    const initialValues = {
        title: '',
        description: ''
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required')
    });

    const onSubmit = (values: any) => {
        console.log('Form data', values);
    };

    return (
        <div>
            <h1>Simple Form</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="title">Title</label>
                        <Field type="text" id="title" name="title" />
                        <ErrorMessage name="title" component="div" />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <Field type="text" id="description" name="description" />
                        <ErrorMessage name="description" component="div" />
                    </div>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
};

export default Home;