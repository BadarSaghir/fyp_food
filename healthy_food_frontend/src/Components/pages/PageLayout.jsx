import React from 'react'
import Footer from '../UIComponents/AdminUI/Footer'
import Header from '../UIComponents/AdminUI/Header'
import SideBar from '../UIComponents/AdminUI/SideBar'

function PageLayout(props) {
    return (
        <div>
            <div id="wrapper">
                <SideBar />
                <div id="content-wrapper" class="d-flex flex-column">
                    <div id="content">
                        <Header />
                        {props.children}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default PageLayout
