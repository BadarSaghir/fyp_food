import React from 'react'
import { Link } from 'react-router-dom'
function SideBar() {
    return (
        <ul class="navbar-nav custom-bg sidebar sidebar-dark accordion" id="accordionSidebar">
            <Link class="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
                <div class="sidebar-brand-text mx-3">Eat Healthy Food</div>
            </Link>
            <hr class="sidebar-divider my-0" />

            <li class="nav-item active">
                <Link class="nav-link" to="/dashboard">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></Link>
            </li>


            <hr class="sidebar-divider" />

            <div class="sidebar-heading">
                Orders
            </div>
            <li class="nav-item">
                <Link class="nav-link" to="/orders">
                    <i class="fa fa-archive" aria-hidden="true"></i>
                    <span>My Orders</span></Link>
            </li>


            <div class="sidebar-heading">
                Menu
            </div>
            <li class="nav-item">
                <Link class="nav-link" to="/menu">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                    <span>My Menu</span></Link>
            </li>

            <li class="nav-item">
                <Link class="nav-link" to="/addproduct">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                    <span>Add Menu</span></Link>
            </li>

            {/* <li class="nav-item">
                <Link class="nav-link collapsed" to="#"
                    data-toggle="collapse" data-target="#collapseUtilities"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i class="fas fa-fw fa-wrench"></i>
                    <span>Utilities</span>
                </Link>
                <div id="collapseUtilities" class="collapse"
                    aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Custom Utilities:</h6>
                        <Link class="collapse-item" to="utilities-color.html">Colors</Link>
                        <Link class="collapse-item" to="utilities-border.html">Borders</Link>
                        <Link class="collapse-item" to="utilities-animation.html">Animations</Link>
                        <Link class="collapse-item" to="utilities-other.html">Other</Link>
                    </div>
                </div>
            </li> */}

            <hr class="sidebar-divider" />

            <div class="sidebar-heading">
                Settings
            </div>

            <li class="nav-item">
                <Link class="nav-link" to="/">
                    <i class="fa fa-cogs" aria-hidden="true"></i>
                    <span>Settings</span></Link>
                {/* <Link class="nav-link collapsed"
                    to="#" data-toggle="collapse" data-target="#collapsePages"
                    aria-expanded="true" aria-controls="collapsePages">
                    <i class="fas fa-fw fa-folder"></i>
                    <span>Profile Setting</span>
                </Link>
                <div id="collapsePages" class="collapse" aria-labelledby="headingPages"
                    data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Login Screens:</h6>
                        <Link class="collapse-item" to="login.html">Login</Link>
                        <Link class="collapse-item" to="register.html">Register</Link>
                        <Link class="collapse-item" to="forgot-password.html">Forgot Password</Link>
                        <div class="collapse-divider"></div>
                        <h6 class="collapse-header">Other Pages:</h6>
                        <Link class="collapse-item" to="404.html">404 Page</Link>
                        <Link class="collapse-item" to="blank.html">Blank Page</Link>
                    </div>
                </div> */}
            </li>

            {/* <li class="nav-item">
                <Link class="nav-link" to="charts.html">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span>Charts</span></Link>
            </li>

            <li class="nav-item">
                <Link class="nav-link" to="tables.html">
                    <i class="fas fa-fw fa-table"></i>
                    <span>Tables</span></Link>
            </li> */}

            {/* <hr class="sidebar-divider d-none d-md-block " />

            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

            <div class="sidebar-card d-none d-lg-flex"> */}
            {/* <img class="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..." /> */}
            {/* <p class="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
                <Link class="btn btn-success btn-sm" to="https://startbootstrap.com/theme/sb-admin-pro">
                    Upgrade to Pro!</Link>
            </div> */}

        </ul>
    )
}

export default SideBar
