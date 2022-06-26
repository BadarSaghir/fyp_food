import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi-browser'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
function Login() {

    let navigate = useNavigate();

    const [loginError, setLoginError] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState("");
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [loagging, setLoagging] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const handleInputOnChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        let { email, password } = values;

        const eerrors = formValidation();

        if (eerrors) {
            setErrors({ ...eerrors });
        }
        else {
            setErrors({});
            setLoagging(true);
            logIn({
                email,
                password
            });
            // clearErrors();
        }

    }
    var schema = {
        email: Joi.string().required().email().label('Email'),
        password: Joi.string().required().label('Password')
    }
    const formValidation = () => {

        const result = Joi.validate(values, schema, { abortEarly: false });
        if (!result.error) return null;

        let errors = {};
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }
    const logIn = (user) => {
        axios.post('/api/auth/user', { ...user }).then((res) => {
            sessionStorage.setItem("token", res.data.token)
            sessionStorage.setItem("User", JSON.stringify(res.data.user));
            if (res.data.user.role == 'business_owner') {
                navigate('/dashboard');
            }
            else {
                navigate('/');
            }
            toast("You are Logged In successfully!")
            setValues({email:"", password:""});
        }).catch(err => {
            if (err.response.status == 400) {
                setLoginError(true);
                setLoginErrorMessage(err.response.data.msg)
                setTimeout(() => {
                    setLoginError(false);
                    setLoginErrorMessage("")
                }, 5000)
            }

            if (err.response.status == 401) {
                setLoginError(true);
                setLoginErrorMessage(err.response.data.msg)
                setTimeout(() => {
                    setLoginError(false);
                    setLoginErrorMessage("")
                }, 5000)
            }
        })
    }
    return (
        <div ClassName="container">

            <div className="row justify-content-center">

                <div className="col-xl-10 col-lg-12 col-md-9">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-register-image ">
                                </div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>

                                        {loginError && <div class="alert alert-danger" role="alert">
                                            {loginErrorMessage}
                                        </div>}
                                        <form className="user" onSubmit={handleOnSubmit}>
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-user"
                                                    id="exampleInputEmail" aria-describedby="emailHelp"
                                                    placeholder="Email Address..."
                                                    value={values.email}
                                                    name="email"
                                                    onChange={handleInputOnChange}
                                                />
                                                {
                                                    errors.email && <div className=" text-danger px-2">
                                                        Please enter valid email
                                                </div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user"
                                                    id="exampleInputPassword"
                                                    value={values.password}
                                                    name="password"
                                                    onChange={handleInputOnChange}
                                                    placeholder="Password" />
                                                {
                                                    errors.password && <div className=" text-danger px-2">
                                                        please enter your password.
                                                </div>
                                                }

                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <input type="checkbox" className="custom-control-input " id="customCheck" />
                                                    <label className="custom-control-label" for="customCheck">Remember
                                                    Me</label>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn  btn-user custom-button-primary btn-block">
                                                Login
                                        </button>
                                            {/* <hr />
                                            <a href="index.html" className="btn btn-google btn-user btn-block">
                                                <i className="fab fa-google fa-fw"></i> Login with Google
                                        </a>
                                            <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                                <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                        </a> */}
                                        </form>
                                        <hr />
                                        {/* <div className="text-center">
                                            <a className="small" href="forgot-password.html">Forgot Password?</a>
                                        </div> */}
                                        <div className="text-center">
                                            <Link className="small" to="/register">
                                                Create an Account!</Link>
                                        </div>
                                        <div className="text-center pt-2">
                                            <Link className="small" to="/register-business">
                                                Start Selling With Us! Register your business</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Login
