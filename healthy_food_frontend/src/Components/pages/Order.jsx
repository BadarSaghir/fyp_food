import React, { useEffect, useState } from "react";
import axios from "axios";
function Order() {
  const { refresh, setRefresh } = useState(false);
  const [ordervalue, setOrdervalue] = useState([]);
  const [itemdata, setItemdata] = useState([]);
  useEffect(() => {
    const config = {
      headers: {
        "x-auth-token": sessionStorage.getItem("token"),
      },
    };
    axios
      .get("api/orderresturent", config)
      .then((res) => {
        setOrdervalue(res?.data?.orders);
        setItemdata(res?.data?.itemsData);
      })
      .catch((err) => {});
  }, [refresh]);

  const updateStatus = (id, status) => {
    const config = {
      headers: {
        "x-auth-token": sessionStorage.getItem("token"),
      },
    };
    axios
      .put(`api/orderresturent/${id}/${status}`, config)
      .then((res) => {
        if (res.data.status) {
          // setRefresh(true)
          const config = {
            headers: {
              "x-auth-token": sessionStorage.getItem("token"),
            },
          };
          axios
            .get("api/orderresturent", config)
            .then((res) => {
              setOrdervalue(res?.data?.orders);
              setItemdata(res?.data?.itemsData);
            })
            .catch((err) => {});
        }
      })
      .catch((err) => {});
  };
  return (
    <div class=" px-1 py-5 mx-auto">
      <div class="row d-flex justify-content-center">
        <div class="col-xl-11 col-lg-11 col-md-11 col-11 ">
          <h3>Orders</h3>
          {ordervalue.map((i, index) => {
            return (
              <div key={index}>
                <section>
                  <div class="container mt-4">
                    <div class="row">
                      <div class="col-lg-12 my-lg-0 my-1">
                        <div id="main-content tabbable-line">
                          <div class="tab-content" id="myTabContent">
                            <div
                              class="tab-pane fade show active"
                              id="home"
                              role="tabpanel"
                              aria-labelledby="home-tab"
                            >
                              <div class="order my-3 bg-light">
                                <div class="row">
                                  <div class="col-lg-4">
                                    <div class="d-flex flex-column justify-content-between order-summary">
                                      <div class="d-flex align-items-center">
                                        <div class="text-uppercase">
                                          {i.Address.firstname}{" "}
                                          {i.Address.lastname}
                                        </div>
                                        <div class="blue-label ms-auto text-uppercase">
                                          paid
                                        </div>
                                      </div>
                                      <div class="fs-8">
                                        Phone# {i.Address.phonenumber}
                                      </div>
                                      <div class="fs-8">
                                        {i.Address.street} | {i.Address.city}
                                      </div>
                                      <div class="rating d-flex align-items-center pt-1">
                                        {" "}
                                        <img
                                          src="https://www.freepnglogos.com/uploads/like-png/like-png-hand-thumb-sign-vector-graphic-pixabay-39.png"
                                          alt=""
                                        />
                                        <span class="px-2">Rating:</span>
                                        <span
                                          className={`fa-star ${
                                            i.Rating.rating >= 1 ? "fas" : "far"
                                          }`}
                                        ></span>
                                        <span
                                          className={`fa-star ${
                                            i.Rating.rating >= 2 ? "fas" : "far"
                                          }`}
                                        ></span>
                                        <span
                                          className={`fa-star ${
                                            i.Rating.rating >= 3 ? "fas" : "far"
                                          }`}
                                        ></span>
                                        <span
                                          className={`fa-star ${
                                            i.Rating.rating >= 4 ? "fas" : "far"
                                          }`}
                                        ></span>
                                        <span
                                          className={`fa-star ${
                                            i.Rating.rating >= 5 ? "fas" : "far"
                                          }`}
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-lg-8">
                                    <div class="d-sm-flex align-items-sm-start align-content-center">
                                      <div class="status align-self-md-center pr-5">
                                        Status : {i.OrderStatus}
                                      </div>

                                      {i.OrderItems.map((n, index) => {
                                        return (
                                          <div key={index} className="flex-wrap flex-row align-self-md-end m-lg-n5-5">
                                            {itemdata.map((x, index) => {
                                              return (
                                                <div className="" key={index}>
                                                  {x[0]._id ===
                                                  n.product_Id[0] ? (
                                                    <div className="bg-white card">
                                                      <img
                                                        src={`/api/uploads/${x[0].ImagePlaceholder[0]}`}
                                                        alt="#"
                                                        className="p-1 imglist"
                                                      />
                                                      <div className="d-flex justify-content-around">
                                                        <h6>{x[0].title}</h6>
                                                        <h6>{n.quantity}</h6>
                                                      </div>
                                                    </div>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </div>
                                              );
                                            })}
                                          </div>
                                        );
                                      })}
                                    </div>
                                    {i.OrderStatus === "Pending" ? (
                                      <div className="">
                                        <button
                                          className="od-accept-order btn btn-outline-success"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            updateStatus(i._id, "Accepted");
                                          }}
                                        >
                                          Accept
                                        </button>
                                        <button
                                          className="od-reject-order btn btn-outline-danger"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            updateStatus(i._id, "Rejected");
                                          }}
                                        >
                                          Reject
                                        </button>
                                      </div>
                                    ) : i.OrderStatus === "Canceled" ? (
                                      <button
                                        className="od-reject-order btn btn-danger btn-margin"
                                        disabled
                                      >
                                        Canceled
                                      </button>
                                    ) : i.OrderStatus === "Rejected" ? (
                                      <button
                                        className="od-reject-order btn btn-danger btn-margin"
                                        disabled
                                      >
                                        Rejected
                                      </button>
                                    ) : i.OrderStatus === "Delivered" ? (
                                      <div class="progressbar-track">
                                        {" "}
                                        <ul class="progressbar">
                                          <li
                                            id="step-2"
                                            className={`text-muted green`}
                                          >
                                            {" "}
                                            <span class="fas fa-check"></span>{" "}
                                          </li>
                                          <li
                                            id="step-4"
                                            className={`text-muted green`}
                                          >
                                            {" "}
                                            <span class="fas fa-truck"></span>{" "}
                                          </li>
                                          <li
                                            id="step-5"
                                            className={`text-muted green`}
                                          >
                                            {" "}
                                            <span class="fas fa-box-open"></span>{" "}
                                          </li>
                                        </ul>
                                        <div id="tracker"></div>
                                      </div>
                                    ) : (
                                      <div class="progressbar-track">
                                        <ul class="progressbar">
                                          <li
                                            id="step-2"
                                            className={`text-muted ${
                                              i.OrderStatus === "Accepted"
                                                ? "green"
                                                : ""
                                            }`}
                                          >
                                            {" "}
                                            <span
                                              class="fas fa-check"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                updateStatus(i._id, "Accepted");
                                              }}
                                            ></span>{" "}
                                          </li>
                                          <li
                                            id="step-4"
                                            className={`text-muted ${
                                              i.OrderStatus === "On Way"
                                                ? "green"
                                                : ""
                                            }`}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              updateStatus(i._id, "On Way");
                                            }}
                                          >
                                            {" "}
                                            <span class="fas fa-truck"></span>{" "}
                                          </li>
                                          <li
                                            id="step-5"
                                            className={`text-muted ${
                                              i.OrderStatus === "Delivered"
                                                ? "green"
                                                : ""
                                            }`}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              updateStatus(i._id, "Delivered");
                                            }}
                                          >
                                            {" "}
                                            <span class="fas fa-box-open"></span>{" "}
                                          </li>
                                        </ul>
                                        <div id="tracker"></div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              class="tab-pane fade"
                              id="profile"
                              role="tabpanel"
                              aria-labelledby="profile-tab"
                            >
                              Completed Orders
                            </div>
                            <div
                              class="tab-pane fade"
                              id="contact"
                              role="tabpanel"
                              aria-labelledby="contact-tab"
                            >
                              Canceled Orders
                            </div>
                          </div>
                          {  i.Rating.comment? <div> 
                              <h3>Comment</h3>

                                <div class=" jumbotron py-2">
                                  <div class="second py-2 px-2">
                                    {" "}
                                    <span class="text1">
                                      {" "}
                                     {i.Rating.comment}
                                    </span>
                                   
                                  </div>
                                </div>
                                </div>:<p></p>   }
                                <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Order;
