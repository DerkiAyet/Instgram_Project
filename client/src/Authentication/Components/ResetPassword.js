import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../Styles/ResetPassword.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import axios from 'axios';
import { AppContext } from '../../App';

function ResetPassword() {

    const { token } = useParams();
    const { setUserAuth } = useContext(AppContext)

    const initialValues = {
        password: '',
        passwordConfirm: ''
    }

    const validationSchema = Yup.object().shape({
        password: Yup.string().min(6, 'Password must be at least 6 characters long').required(),
        passwordConfirm: Yup.string().min(6, 'Password must be at least 6 characters long').required('this field is required')
    })

    let navigate = useNavigate();

    const [ passwordError, setPasswordError ] = useState(false);

    const onSubmit = (data) => {
        if (data.password === data.passwordConfirm) {
            axios.post(`http://localhost:3001/password/reset-password/${token}`, { password: data.password })
                .then((res) => {
                    if (res.data.tokenExpired) {
                        alert('Token Expired')
                    } else {
                        localStorage.setItem('accessToken', res.data.accessToken);
                        setUserAuth({
                            userName: res.data.userName,
                            fullName: res.data.fullName,
                            userImg: res.data.userImg,
                            state: true
                        })
                        navigate('/')
                    }
                })
                .catch((err) => console.log(err.response.data.serverError))
        } else {
           setPasswordError(true)
        }

    }

    return (
        <div className='forgot-password-container'>

            <div className="forgot-password-box">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form className="reset-password-form">

                        <div className="icon-container">
                            <div className="icon-circle">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.6} stroke="currentColor" className="size-6 login-icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>


                            </div>
                            <span className="page-title" style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>
                                Reset Password
                            </span>
                        </div>

                        <div className="authenticate-field-box" style={{ marginBottom: '10px' }}>
                            <Field
                                className="authenticate-field"
                                name="password"
                                placeholder="New Password"
                                type="password"
                                autoComplete="off"
                            />
                            <ErrorMessage name='password' component='p' />
                        </div>

                        <div className="authenticate-field-box">
                            <Field
                                className="authenticate-field"
                                name="passwordConfirm"
                                placeholder="New Password Confirmation"
                                type="password"
                                autoComplete="off"
                            />
                            <ErrorMessage name='passwordConfirm' component='p' />
                            {
                                passwordError &&
                                <p>Please ensure both password fields are identical</p>
                            }
                        </div>

                        <div className="authenticate-field-box">
                            <button type="submit" className='authenticate-btn'>
                                Reset Password
                            </button>
                        </div>
                    </Form>
                </Formik>
                <div className="create-account">
                    <Link to='/register' className='login-link'>
                        Create Account
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default ResetPassword
