import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi-browser'
import { toast } from 'react-toastify';
export default function RegisterBusiness() {

    const [registerError, setRegisterError] = useState(false);
    const [registerErrorMessage, setRegisterErrorMessage] = useState("");
    const [emialVerification, setEmailVerification] = useState(false);
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        phonenumber: '',
        city: '',
        street: '',
        email: '',
        password: '',
        confirmPassword: ""
    });
    const [loagging, setLoagging] = useState(false);
    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        phonenumber: '',
        city: '',
        street: '',
        email: '',
        password: '',
        confirmPassword: ""
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
            registerAccount({
                ...values
            });
            // clearErrors();
        }

    }
    var schema = {
        firstname: Joi.string().required().label('First Name'),
        lastname: Joi.string().required().label('Last Name'),
        phonenumber: Joi.string().required().label('Phone Number'),
        city: Joi.string().required().label('City Address'),
        street: Joi.string().required().label('Street Address'),
        email: Joi.string().required().email().label('Email'),
        password: Joi.string().required().label('Password'),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')),
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
    const registerAccount = (user) => {
        axios.post('/api/user', { ...user, role: "business_owner" }).then((res) => {
            sessionStorage.setItem("token", res.data.token)
            sessionStorage.setItem("User", JSON.stringify(res.data.user));
            if (res.data.user.isVerified == false) {
                setEmailVerification(true);
            }
            else {
                setEmailVerification(false)
            }
            toast("You are register successfully!")
            setValues({
                firstname: '',
                lastname: '',
                phonenumber: '',
                city: '',
                street: '',
                email: '',
                password: '',
                confirmPassword: ""
            })
        }).catch(err => {
            console.log(err.response)
            if (err.response.status == 400) {
                setRegisterError(true);
                setRegisterErrorMessage(err.response.data.msg)
                setTimeout(() => {
                    setRegisterError(false);
                    setRegisterErrorMessage("")
                }, 5000)
            }

            // if (err.response.status == 401) {
            //     setLoginError(true);
            //     setLoginErrorMessage(err.response.data.msg)
            //     setTimeout(() => {
            //         setLoginError(false);
            //         setLoginErrorMessage("")
            //     }, 5000)
            // }
        })
    }
    return (
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                        <div className="col-lg-7">
                            {
                                emialVerification == false ? (<>
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Register Your Business Account!</h1>
                                        </div>
                                        {registerError && <div class="alert alert-danger" role="alert">
                                            {registerErrorMessage}
                                        </div>}
                                        <form className="user" onSubmit={handleOnSubmit}>
                                            <div className="form-group row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="text" className="form-control form-control-user" id="exampleFirstName"
                                                        placeholder="First Name"
                                                        value={values.firstname}
                                                        name="firstname"
                                                        onChange={handleInputOnChange}
                                                    />
                                                    {
                                                        errors.firstname && <div className=" text-danger px-2">
                                                            Please enter your first name
                                                </div>
                                                    }
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control form-control-user" id="exampleLastName"
                                                        placeholder="Last Name" value={values.lastname}
                                                        name="lastname"
                                                        onChange={handleInputOnChange} />
                                                    {
                                                        errors.firstname && <div className=" text-danger px-2">
                                                            Please enter your first name
                                                </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                                                    placeholder="Email Address"
                                                    value={values.email}
                                                    name="email"
                                                    onChange={handleInputOnChange}
                                                />
                                                {
                                                    errors.email && <div className=" text-danger px-2">
                                                        Please enter your email
                                                </div>
                                                }
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="password" className="form-control form-control-user"
                                                        id="exampleInputPassword" placeholder="Password"
                                                        value={values.password}
                                                        name="password"
                                                        onChange={handleInputOnChange}

                                                    />
                                                    {
                                                        errors.password && <div className=" text-danger px-2">
                                                            Please enter your password
                                                </div>
                                                    }
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="password" className="form-control form-control-user"
                                                        id="exampleRepeatPassword" placeholder="Repeat Password"
                                                        value={values.confirmPassword}
                                                        name="confirmPassword"
                                                        onChange={handleInputOnChange}
                                                    />
                                                    {
                                                        errors.confirmPassword && <div className=" text-danger px-2">
                                                            Password does not match
                                                </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-user" id="exampleInputEmail"
                                                    placeholder="Phone Number"
                                                    value={values.phonenumber}
                                                    name="phonenumber"
                                                    onChange={handleInputOnChange}
                                                />
                                                {
                                                    errors.phonenumber && <div className=" text-danger px-2">
                                                        Please enter your phone number
                                                </div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-user" id="exampleInputEmail"
                                                    placeholder="Street Address"
                                                    value={values.street}
                                                    name="street"
                                                    onChange={handleInputOnChange}
                                                />
                                                {
                                                    errors.street && <div className=" text-danger px-2">
                                                        Please enter your street
                                                </div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-user" id="exampleInputEmail"
                                                    placeholder="City"
                                                    value={values.city}
                                                    name="city"
                                                    onChange={handleInputOnChange}
                                                />
                                                {
                                                    errors.city && <div className=" text-danger px-2">
                                                        Please enter your city
                                                </div>
                                                }
                                            </div>
                                            <button type="submit" className="btn  btn-user custom-button-primary btn-block">
                                                Register Account
                                    </button>
                                            <hr />
                                            {/* <Link href="index.html" className="btn btn-google btn-user btn-block">
                                        <i className="fab fa-google fa-fw"></i> Register with Google
                                </Link>
                                    <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                        <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
                                </a> */}
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <Link className="small" to="/forgot-password">Forgot Password?</Link>
                                        </div>
                                        <div className="text-center">
                                            <Link className="small" to="/login">Already have an account? Login!</Link>
                                        </div>
                                    </div>
                                </>) : (
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Conform Your Email!</h1>

                                                <img src={require('../../Assets/image/send-mail.png')} className="mb-2" width="40" height="40" alt="email icon" />
                                                <p className="text-muted">Thanks for registering with us. An Email Sended to your account please register your email</p>
                                            </div>


                                            <div className="d-flex justify-content-center">
                                                <button type="submit" className="btn  btn-user custom-button-primary">
                                                    Resend Email
                                        </button>
                                            </div>
                                            <div className="text-center">
                                                <Link className="small" to="/login">Have Registered Your email? Login!</Link>
                                            </div>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

