import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../UIComponents/Userui/Header';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

function ProductPage({ cart, handleRemoveItemFromCart, handleAddItemToCart }) {
    const { id } = useParams()
    const [item, setItem] = useState({});
    useEffect(() => {
        axios.get(`/api/menu/${id}`).then((res) => {
            setItem(res.data)
        })
    }, [])
    return (
        <div>
            <Header cart={cart} handleRemoveItemFromCart={handleRemoveItemFromCart} />
            < section className="py-5" >
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6">
                            {item && <img className="card-img-top mb-5 mb-md-0" src={`/api/uploads/${item.ImagePlaceholder[0]}`} width="600" height="700" alt="image" />}
                        </div>
                        <div className="col-md-6">
                            <h1 className="display-5 fw-bolder">{item.title}</h1>
                            <div className="small mb-1">{item.subTitle}</div>
                            <div className="fs-5 mb-5">
                                <span className="text-decoration-line-through">{item.price}</span>
                                <span> {item.currency}</span>
                            </div>
                            <p className="lead text-justify">{item.description}</p>
                            <div className="d-flex">

                                <button onClick={() => {
                                    handleAddItemToCart(item)
                                }} className="btn custom-button-primary flex-shrink-0" type="button">
                                    <i className="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            {/* <section className="py-5 bg-light">
                <div className="container px-4 px-lg-5 mt-5">
                    <h2 className="fw-bolder mb-4">Related products</h2>
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        <div className="col mb-5">
                            <div className="card h-100">
                                <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">Fancy Product</h5>
                                    </div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center"><Link
                                        className="btn btn-outline-dark mt-auto" to="#">View options</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col mb-5">
                            <div className="card h-100">
                                <div className="badge bg-dark text-white position-absolute"
                                    style={{ top: "0.5rem", right: "0.5rem" }}>Sale</div>
                                <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">Special Item</h5>
                                        <div className="d-flex justify-content-center small text-warning mb-2">
                                            <div className="bi-star-fill"></div>
                                            <div className="bi-star-fill"></div>
                                            <div className="bi-star-fill"></div>
                                            <div className="bi-star-fill"></div>
                                            <div className="bi-star-fill"></div>
                                        </div>
                                        <span className="text-muted text-decoration-line-through">$20.00</span>
                                    $18.00
                                </div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        <Link className="btn btn-outline-dark mt-auto" to="#">
                                            Add to cart</Link></div>
                                </div>
                            </div>
                        </div>
                        <div className="col mb-5">
                            <div className="card h-100">
                                <div className="badge bg-dark text-white position-absolute"
                                    style={{ top: "0.5rem", right: "0.5rem" }}>Sale</div>
                                <img className="card-img-top"
                                    src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">Sale Item</h5>
                                        <span className="text-muted text-decoration-line-through">$50.00</span>
                                    $25.00
                                </div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center"
                                    ><Link className="btn btn-outline-dark mt-auto" to="#">Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col mb-5">
                            <div className="card h-100">
                                <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">Popular Item</h5>
                                        <div className="d-flex justify-content-center small text-warning mb-2">
                                            <div className="bi-star-fill"></div>
                                            <div className="bi-star-fill"></div>
                                            <div className="bi-star-fill"></div>
                                            <div className="bi-star-fill"></div>
                                            <div className="bi-star-fill"></div>
                                        </div>
                                    $40.00
                                </div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        <Link className="btn btn-outline-dark mt-auto" to="#">Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </div>
    )
}

export default ProductPage
