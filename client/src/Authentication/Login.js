import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Authenticate.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import { AppContext } from '../App';
import axios from 'axios';

function Login() {

    const { darkMode, setUserAuth } = useContext(AppContext);
    let navigate = useNavigate();

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    })

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/auth/login', data)
            .then((res) => {
                localStorage.setItem('accessToken', res.data.token);
                setUserAuth({
                    userName: res.data.userName,
                    fullName: res.data.fullName,
                    userImg: res.data.userImg,
                    state: true
                })
                navigate('/')
            })
            .catch((err) => console.log(err.response.data.error))
    }

    return (
        <div className='login-container authenticate-container'>
            <div className="login_leftSide">
                <img
                    src="https://i.imgur.com/P3Vm1Kq.png"
                    alt="Instagram Screenshots"
                />
            </div>

            <div className="login_rightSide">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form className="login-form">
                        <img
                            className="sidenav__logo"
                            src={
                                darkMode ?
                                    'https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png'
                                    :
                                    '/black_insta_logo.png'
                            }
                            alt="Instagram Logo"
                        />
                        <div className="authenticate-field-box">
                            <Field
                                className="authenticate-field"
                                name="email"
                                placeholder="Email address"
                                type="email"
                                autoComplete="off"
                            />
                            <ErrorMessage name='email' component='p' />
                        </div>
                        <div className="authenticate-field-box">
                            <Field
                                className="authenticate-field"
                                name='password'
                                placeholder='Password'
                                type='password'
                            />
                            <ErrorMessage name='password' component='p' />
                            <span className='forgot-password'>
                                Forgotten your password?
                            </span>
                        </div>

                        <div className="authenticate-field-box">
                            <button type="submit" className='authenticate-btn'>
                                Log in
                            </button>
                        </div>
                        <div className="decoration">
                            <div className="line-decoration" />
                            <span>
                                OR
                            </span>
                            <div className="line-decoration" />
                        </div>

                        <div className="authenticate-with-facebook">
                            <button type="submit" className='authenticate-btn'>
                                <i class="ri-facebook-box-fill facebook-icon"></i>
                                Continue Using Facebook
                            </button>
                        </div>
                    </Form>
                </Formik>

                <div className="not-have-account">
                    <span>
                        Don't have an account?
                        <Link to='/register' className='signup-link'>
                            Sign up
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Login
