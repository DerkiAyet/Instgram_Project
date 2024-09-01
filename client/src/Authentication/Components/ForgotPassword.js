import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../Styles/ResetPassword.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import axios from 'axios';

function ForgotPassword() {

  const initialValues = {
    email: '',
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  })

  const [messageSent, setMessageSent] = useState(false);

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/password/forgot-password', data)
      .then(() => {
        setMessageSent(true)
      })
      .catch((err) => console.log(err.response.data.error))
  }

  return (
    <div className='forgot-password-container'>

      <div className="forgot-password-box">

        {
          !messageSent &&
          <div className="success-message-container">
            <div className="success-message-box">
              <div className="success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="success-text">Check your email we have sent you the link!</div>
            </div>
          </div>
        }

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="forgot-password-form">

            <div className="icon-container">
              <div className="icon-circle">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.6} stroke="currentColor" className="size-6 login-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <span className="page-title">
                Trouble Loggin In?
              </span>
            </div>

            <span className="intro-txt">
              Enter your email and we'll send you a link to get back into your account.
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
              <button type="submit" className='authenticate-btn'>
                Send Login Link
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
              <Link to={'/register'} className='authenticate-btn'>
                Create New Account
              </Link>
            </div>
          </Form>
        </Formik>
        <div className="back-to-login">
          <Link to='/login' className='login-link'>
            Back to Login
          </Link>
        </div>
      </div>

    </div>
  )
}

export default ForgotPassword
