import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../UIComponents/Userui/Header';
import Joi from 'joi-browser'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
function Checkout({ cart, calTotal }) {
    const navigate = useNavigate();
    const [orderError, setOrderError] = useState(false);
    const [price, setPrice] = useState(calTotal(cart))
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        phonenumber: '',
        city: '',
        street: ''
    });
    const [loagging, setLoagging] = useState(false);
    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        phonenumber: '',
        city: '',
        street: ''
    });
    const handleOnSubmit = (e) => {
        e.preventDefault();
        // setPrice(calTotal(cart))
        const eerrors = formValidation();
        console.log(price)
        if (eerrors) {
            setErrors({ ...eerrors });
            console.log("errors")
            console.log(eerrors)
        }
        else {
            setErrors({});
            setLoagging(true);
            const config = {
                headers: {
                    'x-auth-token': sessionStorage.getItem('token'),
                }
            }
            

            axios.post('api/order', { address: { ...values }, cart, price:price }, config).then((res) => {
                console.log(res.data)
                if (res.status === 200) {
                    toast("Order Placed Sucessfully", { type: 'success' });
                    setValues({
                    firstname: '',
                    lastname: '',
                    phonenumber: '',
                    city: '',
                    street: ''})
                }
                navigate('/myorders')
            }).catch(err => {
                if (err.response.status === 500) {
                    // setProductError(true);
                    // setProductErrorMessage("Product Falied To Upload")
                    // setTimeout(() => {
                    //     setProductError(false);
                    //     setProductErrorMessage("")
                    // }, 5000)
                }
            })
        }

    }
    const handleInputOnChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }
    var schema = {
        firstname: Joi.string().required().label('First Name'),
        lastname: Joi.string().required().label('Last Name'),
        phonenumber: Joi.string().required().label('Phone Number'),
        city: Joi.string().required().label('City Address'),
        street: Joi.string().required().label('Street Address'),
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



    return (
        <div>
            <Header cart={cart} />
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Shop in style</h1>
                        <p className="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
                    </div>
                </div>
            </header>
            <section className="py-5">
                <div className="container">
                    <div class="row">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <form className="user" onSubmit={handleOnSubmit} >
                                {orderError && <div class="alert alert-danger" role="alert">
                                    {"oginErrorMessage"}
                                </div>}
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
                                            placeholder="Last Name"
                                            value={values.lastname}
                                            name="lastname"
                                            onChange={handleInputOnChange}
                                        />
                                        {
                                            errors.lastname && <div className=" text-danger px-2">
                                                Please enter your last name
                                                </div>
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-user"
                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                        placeholder="Phone Number"
                                        value={values.phonenumber}
                                        name="phonenumber"
                                        onChange={handleInputOnChange}
                                    />
                                    {
                                        errors.phonenumber && <div className=" text-danger px-2">
                                            Please enter phone number
                                                </div>
                                    }
                                </div>

                                <div className="form-group">
                                    <input type="text" className="form-control form-control-user"
                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                        placeholder="Street Address "
                                        value={values.street}
                                        name="street"
                                        onChange={handleInputOnChange}
                                    />
                                    {
                                        errors.phonenumber && <div className=" text-danger px-2">
                                            Please enter street address
                                                </div>
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-user"
                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                        placeholder="City"
                                        value={values.city}
                                        name="city"
                                        onChange={handleInputOnChange}
                                    />
                                    {
                                        errors.phonenumber && <div className=" text-danger px-2">
                                            Please enter city name
                                                </div>
                                    }
                                </div>
                                <button type="submit" className="btn  btn-user custom-button-primary btn-block">
                                    Place Order
                                </button>
                                {/* <hr />
                                            <a href="index.html" className="btn btn-google btn-user btn-block">
                                                <i className="fab fa-google fa-fw"></i> Login with Google
                                        </a>
                                            <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                                <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                        </a> */}
                            </form> </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            {
                                cart.length === 0 ? (
                                    <>
                                        <p className="text-muted">You have not any items in cart. </p>
                                    </>
                                ) : (
                                        <>
                                            <div class="cart-head">
                                                <div class="table-responsive">
                                                    <table class="table table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">Product</th>
                                                                <th scope="col">Qty</th>
                                                                <th scope="col">Price</th>
                                                                <th scope="col" class="text-right">Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {cart.map((item, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <th scope="row">{index + 1}</th>


                                                                        <td>{item.item.title}</td>
                                                                        <td>
                                                                            <div class="form-group mb-0">
                                                                                {item.quantity}
                                                                            </div>
                                                                        </td>
                                                                        <td>{item.item.price} {"RS"}</td>
                                                                        <td class="text-right">{item.item.price * item.quantity} RS</td>
                                                                    </tr>
                                                                )
                                                            })}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="cart-body">
                                                <div class="row">
                                                    <div class="col-md-12 order-2 order-lg-1 col-lg-5 col-xl-6">
                                                        <div class="order-note">

                                                        </div>
                                                    </div>
                                                    <div class="col-md-12 order-1 order-lg-2 col-lg-7 col-xl-6">
                                                        <div class="order-total table-responsive ">
                                                            <table class="table table-borderless text-right">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Sub Total :</td>
                                                                        <td>{calTotal(cart) + " Rs"}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="f-w-7 font-18"><h4>Amount :</h4></td>
                                                                        <td class="f-w-7 font-18"><h4>{calTotal(cart) + " Rs"}</h4></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                            }
                        </div>
                    </div>
                </div>
                <ToastContainer />

            </section>
        </div>
    )
}

export default Checkout
