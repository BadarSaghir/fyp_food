import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './display.css'
export default function Header({ cart, handleRemoveItemFromCart }) {
    let navigate = useNavigate();

    useEffect(() => {
        setUser(
            JSON.parse(sessionStorage.getItem("User"))
        )
    }, [])

    const logOut = () => {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("User");
        navigate("/login")
    }
    const [user, setUser] = useState({})
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className=" d-flex justify-content-between" style={{
                width: '100%'
            }} >
                <Link className="navbar-brand display" to="#!">Eat Healthy Food</Link>
                <button className="navbar-toggler display" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">

                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"> <i class="fa fa-shopping-cart" aria-hidden="true"></i>  {cart.length} - Items<span class="caret"></span></a>
                            <ul class="dropdown-menu dropdown-cart" role="menu">
                                {
                                    cart.map((item) => {
                                        return (
                                            <li key={item.item._id}>
                                                <span class="item">
                                                    <span class="item-left">
                                                        <img src="http://lorempixel.com/50/50/" alt="" />
                                                        <span class="item-info">
                                                            <span>{item.item.title}</span>
                                                            <span>{item.item.price} {item.item.currency}</span>
                                                        </span>
                                                    </span>
                                                    <span class="item-right">
                                                        <button onClick={() => {
                                                            handleRemoveItemFromCart(item.item._id)
                                                        }} class="btn btn-xs btn-danger pull-right "> <i class="fa fa-trash" aria-hidden="true"></i></button>
                                                    </span>
                                                </span>
                                            </li>

                                        )
                                    })
                                }

                                <li class="divider"></li>
                                <li><Link class="btn btn-block btn-outline-dark mt-auto custom-button-primary" to="/cart">View Cart</Link></li>
                            </ul>
                        </li>
                    </ul>


                    {user ? (< ul class="navbar-nav ml-1 ">
                        <div class="topbar-divider d-none d-sm-block"></div>
                        <li class="nav-item dropdown no-arrow">
                            <Link class="nav-link dropdown-toggle" to="#"
                                id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                <img className="img-profile rounded-circle"
                                    src={require('../../../Assets/image/user.jpeg')} width="30" height="30" />
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small"> {user && user.firstname + " " + user.lastname}</span>
                            </Link>
                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">

                                <Link class="dropdown-item" to="/">
                                    <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                     Home
                                </Link>
                                <Link class="dropdown-item" to="/myorders">
                                    <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                     My Orders
                                </Link>

                                <div class="dropdown-divider"></div>
                                <Link class="dropdown-item" to="#" onClick={(e) => {
                                    e.preventDefault();
                                    logOut();
                                }}>
                                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                 Logout
                                </Link>
                            </div>
                        </li>

                    </ul>) : (<Link to="/login" class="btn custom-button-primary-outline ml-3">Login</Link>)}
                </div>
            </div>
        </nav >
    )
}
