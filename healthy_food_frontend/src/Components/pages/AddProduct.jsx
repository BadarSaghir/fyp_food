import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Joi from 'joi-browser'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddProduct() {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        console.log(selectedFile)

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])



    const [productError, setProductError] = useState(false);
    const [productErrorMessage, setProductErrorMessage] = useState("")
    const [values, setValues] = useState({
        title: '',
        subTitle: '',
        description: '',
        price: '',
        Quantity: '',
        Unit: '',
        category:''
    });
    const [loagging, setLoagging] = useState(false);
    const [errors, setErrors] = useState({
        title: '',
        subTitle: '',
        description: '',
        price: '',
        Quantity: '',
        Unit: '',
        category:''
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


        const eerrors = formValidation();

        if (eerrors) {
            setErrors({ ...eerrors });

            console.log(eerrors)
        }
        else {
            setErrors({});
            setLoagging(true);

            addMenuItem({
                ...values
            });
            // clearErrors();
        }

    }
    var schema = {
        title: Joi.string().required().label('Title'),
        subTitle: Joi.string().required().label('Sub Title'),
        description: Joi.string().required().label('Description'),
        price: Joi.number().required().min(1).label('City Address'),
        Quantity: Joi.number().required().label('Unit Quantity'),
        Unit: Joi.string().required().label('Unit'),
        category:Joi.string().required().label('Category')
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
    const addMenuItem = (item) => {

        // const config = {
        //     headers: {
        //         // 'content-type': 'multipart/form-data'
        //         'x-auth-token': sessionStorage.getItem('token'),
        //     }
        // }
        // axios.post('api/menu', { ...item }, config).then((res) => {
        //     if (res.status == 200) {
        //         console.log("product added...")
        //         resetProductForm()
        //         toast("Product Added!", { type: 'success' })
        //     }

        // }).catch(err => {
        //     if (err.response.status == 500) {
        //         setProductError(true);
        //         setProductErrorMessage("Product Falied To Upload")
        //         setTimeout(() => {
        //             setProductError(false);
        //             setProductErrorMessage("")
        //         }, 5000)
        //     }
        // })

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-auth-token': sessionStorage.getItem('token'),

            },
        }
        try {

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append("title", values.title);
            formData.append("subTitle", values.subTitle);
            formData.append("price", values.price);
            formData.append("description", values.description);
            formData.append("Quantity", values.Quantity);
            formData.append("Unit", values.Unit);
            formData.append("category", values.category);


            axios.post('api/menu', formData, config).then((q) => {
                resetProductForm()
                toast("Product Added!", { type: 'success' })
            }).catch((err) => {
                console.log(err)
                console.log('workspace line 218')
            });
        }
        catch (err) {
            return err;
        }
    }
    const resetProductForm = () => {
        setValues({
            title: '',
            subTitle: '',
            description: '',
            price: '',
            Quantity: '',
            Unit: '',
            category:''
        })
        setErrors({
            title: '',
            subTitle: '',
            description: '',
            price: '',
            Quantity: '',
            Unit: '',   
            category:''
        })
    }

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }
    return (
        <div class=" px-1 py-5 mx-auto">
            <div class="row d-flex justify-content-center">
                <div class="col-xl-11 col-lg-11 col-md-11 col-11 ">
                    {productError && <div class="alert alert-danger" role="alert">
                        {productErrorMessage}
                    </div>}
                    <h3>Add Product</h3>
                    <p class="text-muted">Now publish your food item Is one Click Away
                     .</p>

                    <form class="form-card" onSubmit={handleOnSubmit}>
                        <div class="row justify-content-between text-left">
                            <div class="form-group col-sm-6 flex-column d-flex">
                                <input type="text"
                                    placeholder="Enter Title Of Your Product"
                                    value={values.title}
                                    name="title"
                                    onChange={handleInputOnChange}
                                />
                                {
                                    errors.title && <div className=" text-danger px-2">
                                        Please enter product title
                                    </div>
                                }
                            </div>
                            <div class="form-group col-sm-6 flex-column d-flex">
                                <input type="text"
                                    placeholder="Enter Sub Title Of Your Product"
                                    value={values.subTitle}
                                    name="subTitle"
                                    onChange={handleInputOnChange}
                                />
                                {
                                    errors.subTitle && <div className=" text-danger px-2">
                                        Please enter product sub title
                                    </div>
                                }
                            </div>
                        </div>

                        <div class="form-group col-sm-12 flex-column d-flex">
                            <textarea class="form-control"
                                rows="5"
                                placeholder="Long Description Of Your Product"
                                value={values.description}
                                name="description"
                                onChange={handleInputOnChange}
                            ></textarea>
                            {
                                errors.description && <div className=" text-danger px-2">
                                    Please enter product description
                                    </div>
                            }
                        </div>


                        <div class="row justify-content-between text-left">
                            <div class="form-group col-sm-6 flex-column d-flex">
                                <input type="number"
                                    min="0"
                                    placeholder="Price Per Unit"
                                    value={values.price}
                                    name="price"
                                    onChange={handleInputOnChange}
                                />
                                {
                                    errors.price && <div className=" text-danger px-2">
                                        Please enter product Unit Price
                                    </div>
                                }
                            </div>
                            <div class="form-group col-sm-6 flex-column d-flex">
                                <input type="number" min="1" placeholder="Unit Quantity"
                                    value={values.Quantity}
                                    name="Quantity"
                                    onChange={handleInputOnChange}
                                />
                                {
                                    errors.Quantity && <div className=" text-danger px-2">
                                        Please enter product quantity
                                    </div>
                                }
                            </div>
                            <div class="form-group col-sm-6 flex-column d-flex">
                                <input type="text"
                                    placeholder="Unit"
                                    value={values.Unit}
                                    name="Unit"
                                    onChange={handleInputOnChange}
                                />
                                {
                                    errors.Unit && <div className=" text-danger px-2">
                                        Please enter product Unit
                                    </div>
                                }
                            </div>
                            <div class="form-group col-sm-6 flex-column d-flex">
                            <select value={values.category} name="category" onChange={handleInputOnChange}>
                                <option>None</option>
                                <option>Dinner</option>
                                <option>Breakfast</option>
                                <option>Lunch</option>
                            </select>
                                {
                                    errors.Unit && <div className=" text-danger px-2">
                                        Please enter product category
                                    </div>
                                }
                            </div>


                            

                            

                            <div class="form-group col-sm-6 flex-column d-flex">
                                <input type="file" multiple accept="image/png, image/jpeg" onChange={onSelectFile}
                                />
                                {selectedFile && <img src={preview} width="400" height="100%" />}
                            </div>
                        </div>

                        <div class="row d-flex justify-content-end">
                            <button type="submit" class="btn custom-button-primary">Add Product</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddProduct
