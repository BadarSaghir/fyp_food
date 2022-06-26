import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Header() {
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
        <>
            <nav class="navbar navbar-expand navbar-light bg-white topbar static-top shadow">
                <button id="sidebarToggleTop"
                    class="btn btn-link d-md-none rounded-circle mr-3">
                    <i class="fa fa-bars"></i>
                </button>

                <ul class="navbar-nav ml-auto">
                    <div class="topbar-divider d-none d-sm-block"></div>
                    <li class="nav-item dropdown no-arrow">
                        <Link class="nav-link dropdown-toggle" to="#"
                            id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="mr-2 d-none d-lg-inline text-gray-600 small">{user && user.firstname + " " + user.lastname}</span>
                            <img className="img-profile rounded-circle"
                                src={require('../../../Assets/image/user.jpeg')} />
                        </Link>
                        <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown">
                            <Link class="dropdown-item" to="/orders">
                                <i class="fas fa-archive fa-sm fa-fw mr-2 text-gray-400"></i>
                                Orders
                            </Link>
                            <Link class="dropdown-item" to="/menu">
                                <i class="fas fa-bars fa-sm fa-fw mr-2 text-gray-400"></i>
                                Menu
                            </Link>
                            <Link class="dropdown-item" to="/dashboard">
                                <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                Home
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

                </ul>

            </nav>

            <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <Link class="btn btn-primary" to="login.html">Logout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
