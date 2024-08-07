import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Fragment } from 'react'

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log({ email, password })
    }

    return (
        <Fragment>
            <section className='container'>
                <h1 className='large text-primary'>Sign In</h1>
                <p className='lead'>
                    <i className='fas fa-user'></i> Sign Into Your Account
                </p>
                <form className='form' onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='email'
                            placeholder='Email Address'
                            name='email'
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            minLength='6'
                            value={password}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <input
                        type='submit'
                        className='btn btn-primary'
                        value='Login'
                    />
                </form>
                <p className='my-1'>
                    Don't have an account? <Link to='/register'>Sign Up</Link>
                </p>
            </section>


        </Fragment>
    )
}

export default Login
