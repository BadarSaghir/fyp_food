import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Menu() {
    const [menuItems, setMenuItems] = useState([])
    const navigate = useNavigate()
    const removeMenu = async(e,item)=>{
      
    console.log(e,item)
    const config = {
            headers: {
                'x-auth-token': sessionStorage.getItem('token'),
            }
        }
        const res= await axios.delete(`api/menuresturent/${item._id}/`, config)
        setMenuItems(res.data)

    }
    const editMenu = async(e,item)=>{console.log(item)
        navigate('/EditProduct',{state:item})
    }


    useEffect(() => {
        const config = {
            headers: {
                'x-auth-token': sessionStorage.getItem('token'),
            }
        }
        axios.get('api/menuresturent', config).then((res) => {  
            setMenuItems(res.data)
        }).catch(err => {
        })
    }, [])
    return (
        <div class=" px-1 py-5 mx-auto">
            <div class="row d-flex justify-content-center">
                <div class="col-xl-11 col-lg-11 col-md-11 col-11 ">
                    <h3>Menu Items</h3>
                    <p class="text-muted">Now publish your food item Is one Click Away
                     .</p>

                    <div className="container mt-5">
                        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 
                    row-cols-xl-3 justify-content-start">
                            {
                                menuItems.map(item => {
                                    return (
                                        <div key={item._id} className="col mb-5" style={{minWidth:"250px"}}>
                                            <div className="card h-100 product-card">
                                                <img className="card-img-top" src={`/api/uploads/${item.ImagePlaceholder[0]}`} width="100%" height="200" alt="..." />
                                                <div className="card-body p-4 pb-0">
                                                    <div className="text-left">


s
                                                        <h5>{item.title}</h5>
                                                       

                                                        <p className="fw-bolder">{item.subTitle}</p>
                                                        <div className="d-flex justify-content-between">
                                                           
                                                          
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <p className="price">{item.Quantity} <span> {item.Unit}</span></p>
                                                            <p className="price">{item.price} <span> {item.currency}</span></p>
                                                           
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                       <button className='btn btn-outline-primary ' onClick={(e)=>{ removeMenu(e,item)}}>Remove</button>
                                                        <button className='btn btn-outline-primary ' onClick={(e)=>{ editMenu(e,item)}}> Edit </button>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )

                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu
