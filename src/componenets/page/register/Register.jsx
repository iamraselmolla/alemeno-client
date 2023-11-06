import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthProvider';
import toast from 'react-hot-toast';

const Register = () => {
    const { createUser, logOut } = useContext(AuthContext);
    const googleAuth = new GoogleAuthProvider();

    const [loading, setLoadingStatus] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault()
        setLoadingStatus(true)
        createUser(e.target.email.value, e.target.password.value)
            .then(res => {
                toast.success("Registration Successfull");
                navigate('/login')
            })
            .catch(err => console.log(err.message))




            .catch(err => {
                setLoadingStatus(false)
                return setError(err.message)
            });
    }
    return (
        <section className='py-5 text-center'>
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="px-4 theme_border py-5 rounded">
                            <h1 className="fw-bolder mb-3">
                                Register Now!
                            </h1>
                            <Form onSubmit={handleRegister} className='text-start'>


                                <Form.Group className="mb-3 mt-4" controlId="formBasicEmail2">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control required name="username" type="text" className='rounded-5' placeholder="Username" />

                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicName2">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control required name="email" type="email" className='rounded-5' placeholder="example@gmail.com" />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword2">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required name="password" className='rounded-5' type="password" placeholder="Password" />
                                </Form.Group>


                                <button className={`theme_bg outline-0 border-0 px-5 py-2 w-100 fw-bolder text-white rounded ${loading ? 'd-none' : 'd-block'}`}>
                                    Register
                                </button>
                                <button className={`btn w-100 btn-primary ${loading ? 'd-block' : 'd-none'}`} type="button" disabled>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Registering...
                                </button>

                                {error && <p className='text-danger fw-bold'>{error}</p>}

                            </Form>
                            <div className="d-flex mt-2">
                                Already Registered? <Link className='text-decoration-none ms-2 theme_color fw-bolder' to="/login">Login</Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;