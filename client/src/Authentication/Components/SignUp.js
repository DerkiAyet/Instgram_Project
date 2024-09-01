import React, { useContext } from 'react'
import '../Styles/Authenticate.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { AppContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

function SignUp() {

    const { darkMode, setUserAuth } = useContext(AppContext)

    const initialValues = {
        email: '',
        fullName: '',
        userName: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        fullName: Yup.string().required(),
        userName: Yup.string().required(),
        password: Yup.string().required()
    })

    let navigate = useNavigate();

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/auth/signup', data)
        .then((res) => {
            localStorage.setItem('accessToken', res.data.token);
            setUserAuth({
                userName: data.userName,
                fullName: data.fullName,
                userImg: null,
                state: true
            })
            navigate('/')
        })
        .catch((err) => console.log(err.response.data.error))
    }

    return (
        <div className='authenticate-container signup-container'>
            <div className="signup-box">
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
                        <span className="intro-txt">
                            Sign up to see photos and videos from your freinds.
                        </span>
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
                                name='fullName'
                                placeholder='Full Name'
                                type='text'
                            />
                            <ErrorMessage name='fullName' component='p' />
                        </div>
                        <div className="authenticate-field-box">
                            <Field
                                className="authenticate-field"
                                name='userName'
                                placeholder='Username'
                                type='text'
                            />
                            <ErrorMessage name='userName' component='p' />
                        </div>
                        <div className="authenticate-field-box">
                            <Field
                                className="authenticate-field"
                                name='password'
                                placeholder='Password'
                                type='password'
                            />
                            <ErrorMessage name='password' component='p' />
                        </div>

                        <div className="authenticate-field-box">
                            <button type="submit" className='authenticate-btn'>
                                Sign up
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
                        Already have an account?
                        <Link to='/login' className='signup-link'>
                            Log in
                        </Link>
                    </span>
                </div>
            </div>

        </div>
    )
}

export default SignUp
