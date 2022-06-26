import React, { useEffect } from "react";

import Header from "../UIComponents/Userui/Header";
import {useState} from 'react';
import axios from "axios";
import {useCookies} from "react-cookie"
import { faHeart,faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons'




import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Home({
  menuItems,
  cart,
  handleAddItemToCart,
  handleRemoveItemFromCart,
}) {
    const [cartItems, setCartItems] = useState('All');
    const filterCategory = (categitem)=>{
        setCartItems(categitem);
    }
    const [fav,setFav]=useState([])
    
    // const [cookies, setCookie, removeCookie] = useCookies([]);




    const deleteFav =async(id)=>{
      console.log(sessionStorage.getItem('token'))
      try {
          const config = {
      headers: {
          'x-auth-token': sessionStorage.getItem('token'),
      }
  }
  // const params={
  //   abv:22
  // }
    const res=await axios.delete(`http://localhost:5000/api/favorite/${id}`,config)
    console.log(res.data)
    setFav(res.data)
      } catch (error) {
        
      }
  
     }
  
   const addFav=async(id)=>{
    console.log(sessionStorage.getItem('token'))
    try {
        const config = {
    headers: {
        'x-auth-token': sessionStorage.getItem('token'),
    }
}
const params={
  abv:22
}
  const res=await axios.post(`http://localhost:5000/api/favorite/${id}`,params,config)
  console.log(res.data)
  setFav(res.data)
  

    } catch (error) {
      
    }

   }

useEffect(()=>{
  const config = {
    headers: {
        'x-auth-token': sessionStorage.getItem('token'),
    }
}
  axios.get(`/api/favorite`,config).then((res)=>setFav(res.data)).catch()

  console.log(fav)
// console.log(cookies)

},[])

  return (
    <div>
      <Header cart={cart} handleRemoveItemFromCart={handleRemoveItemFromCart} />
      <header className="bg-dark py-5 hero-header">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder f-bold">Shop in style</h1>
            <p className="lead fw-normal text-white-50 mb-0">
            From our HealthyFoodStore
 
            </p>
          </div>
        </div>
      </header>

      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          {/* <div>Filter by Category:</div>
          <div>
            <select
              name="category-list"
              id="category-list"
              onChange={handleCategoryChange}
            >
              <option value="">All</option>
              <option value="breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div> */}
          <button className=" btn btn-light mx-2" onClick={(e) => {filterCategory('All') }}>All</button>
          <button className=" btn btn-light  mx-2" onClick={(e) => {filterCategory('Breakfast') }}>Breakfast</button>
          <button className=" btn btn-light mx-2" onClick={(e) => {filterCategory('Lunch') }}>Lunch</button>
          <button className=" btn btn-light mx-2 my-3" onClick={(e) => {filterCategory('Dinner') }}>Dinner</button>

          <div
            className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 
                    row-cols-xl-3 justify-content-start"
          >
            {menuItems.map((item) => {
              return (
                  cartItems === item.category || cartItems==='All'?
                  <div key={item._id} className="col mb-5" style={{minWidth:"250px"}}>
                  <div className="card h-100 product-card">
                    <img
                      className="card-img-top"
                      src={`/api/uploads/${item.ImagePlaceholder[0]}`}
                      width="100%"
                      height="200"
                      alt="..."
                    />
                    <div className="card-body p-4 pb-0">
                      <div></div>
                      <div className="text-left ">
                        <h5 className="title">
                          {item.title}{" "}
                          </h5>
                          <span className="subtitle">{item.subTitle}</span>
                          <span className="prc d-flex justify-content-end ">
                            {" "}
                            {item.price}{" "}
                            <span className="currency">{item.currency}</span>{" "}
                          </span>
                        
                        {/* <p className="fw-bolder">{item.subTitle}  </p> */}
                        <div className="">
                        <div class="d-flex justify-content-between">
                          <p className="price">{item.description}</p>
                          <p className="price" style={{margin:'5px'}}>   {/* Add Icons Here */}
                       {sessionStorage.getItem('token')?(!fav.includes(item._id)?<i onClick={()=>addFav(item._id)}> <FontAwesomeIcon icon={faHeartCirclePlus} size={"2x"}  />
                       </i>:
                        <i  onClick={()=>deleteFav(item._id)}>
                          <FontAwesomeIcon icon={faHeart} size={"2x"}  color='red'/>
                        </i>):<p></p>}
                        {/*...............ENd HERE Heart........................ */}</p>
                          </div>
                          <div class="d-flex justify-content-between">
                           {/* Add Icons Here */}
                       {/* {sessionStorage.getItem('token')?(!fav.includes(item._id)?<i onClick={()=>addFav(item._id)}> <FontAwesomeIcon icon={faHeartCirclePlus} size={"2x"}  />
                       </i>:
                        <i  onClick={()=>deleteFav(item._id)}>
                          <FontAwesomeIcon icon={faHeart} size={"2x"}  color='red'/>
                        </i>):<p></p>} */}
                        {/*...............ENd HERE Heart........................ */}
                            <div>
                              <p className="price">
                                {item.Quantity} / <span> {item.Unit}</span>
                              </p>
                            </div>
                            <button>{item.category}</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-footer p-1 pt-0 border-top-0 bg-transparent">
                      <div className="text-center">
                        <button
                          className="btn btn-block btn-outline-dark mt-auto custom-button-primary"
                          onClick={() => {
                            handleAddItemToCart(item);
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                :<></>

              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
