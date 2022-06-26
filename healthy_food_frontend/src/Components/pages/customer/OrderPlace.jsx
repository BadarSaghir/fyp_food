import Header from "../../UIComponents/Userui/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderPlace({ cart }) {
  const { refresh, setRefresh } = useState(false);
  const [ordervalue, setOrdervalue] = useState([]);
  const [itemdata, setItemdata] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  useEffect(() => {
    const config = {
      headers: {
        "x-auth-token": sessionStorage.getItem("token"),
      },
    };
    axios
      .get("api/order", config)
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
            .get("api/order", config)
            .then((res) => {
              setOrdervalue(res?.data?.orders);
              setItemdata(res?.data?.itemsData);
            })
            .catch((err) => {});
        }
      })
      .catch((err) => {});
  };
  const SubmitRating = (id) => {
    const config = {
      headers: {
        "x-auth-token": sessionStorage.getItem("token"),
      },
      data: { id, rating, comment },
    };
    axios
      .put(`api/order/rating`, config)
      .then((res) => {
        if (res.data.status) {
          // setRefresh(true)
          window.location.reload();
        }
      })
      .catch((err) => {});
  };
  return (
    <div>
      <Header cart={cart} />
      <div class=" px-1 py-5 mx-auto">
        <div class="row d-flex justify-content-center">
          <div class="col-xl-11 col-lg-11 col-md-11 col-11 ">
            <h3>Orders</h3>
            <div class="col-lg-12 my-lg-1 my-1 pl-5 ml-4  ">
              <div id="main-content tabbable-line">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      Home
                    </a>
                  </li>
                </ul>
              </div>
            </div>
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
                                          {i.OrderStatus === "Delivered" &&
                                          i.Rating.status === false ? (
                                            <div>
                                              <button
                                                type="button"
                                                class="btn btn-primary"
                                                data-toggle="modal"
                                                data-target="#exampleModal"
                                              >
                                                Rate Us
                                              </button>
                                              <div
                                                class="modal fade"
                                                id="exampleModal"
                                                tabindex="-1"
                                                role="dialog"
                                                aria-labelledby="exampleModalLabel"
                                                aria-hidden="true"
                                              >
                                                <div
                                                  class="modal-dialog"
                                                  role="document"
                                                >
                                                  <div class="modal-content">
                                                    <div class="modal-header">
                                                      <h5
                                                        class="modal-title"
                                                        id="exampleModalLabel"
                                                      >
                                                        Rate us for better
                                                        services!
                                                      </h5>
                                                      <button
                                                        type="button"
                                                        class="close"
                                                        data-dismiss="modal"
                                                        aria-label="Close"
                                                      >
                                                        <span aria-hidden="true">
                                                          &times;
                                                        </span>
                                                      </button>
                                                    </div>
                                                    <form>
                                                      <div class="modal-body ">
                                                        <input
                                                          className="rate"
                                                          type="number"
                                                          min={0}
                                                          max={5}
                                                          placeholder="Rating"
                                                          name="rating"
                                                          onChange={(e) =>
                                                            setRating(
                                                              e.target.value
                                                            )
                                                          }
                                                          value={rating}
                                                        />
                                                        <input
                                                          className="comment"
                                                          type="text"
                                                          maxLength={30}
                                                          placeholder="Comment"
                                                          name="comment"
                                                          onChange={(e) =>
                                                            setComment(
                                                              e.target.value
                                                            )
                                                          }
                                                          value={comment}
                                                        />
                                                      </div>

                                                      <div class="modal-footer">
                                                        <button
                                                          type="submit"
                                                          class="btn btn-primary"
                                                          onClick={() => {
                                                            SubmitRating(i._id);
                                                          }}
                                                          data-dismiss="modal"
                                                        >
                                                          Submit
                                                        </button>
                                                      </div>
                                                    </form>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ) : (
                                            <>
                                              <img
                                                src="https://www.freepnglogos.com/uploads/like-png/like-png-hand-thumb-sign-vector-graphic-pixabay-39.png"
                                                alt=""
                                              />
                                              <span class="px-2">Rating:</span>
                                              <span
                                                className={`fa-star ${
                                                  i.Rating.rating >= 1
                                                    ? "fas"
                                                    : "far"
                                                }`}
                                              ></span>
                                              <span
                                                className={`fa-star ${
                                                  i.Rating.rating >= 2
                                                    ? "fas"
                                                    : "far"
                                                }`}
                                              ></span>
                                              <span
                                                className={`fa-star ${
                                                  i.Rating.rating >= 3
                                                    ? "fas"
                                                    : "far"
                                                }`}
                                              ></span>
                                              <span
                                                className={`fa-star ${
                                                  i.Rating.rating >= 4
                                                    ? "fas"
                                                    : "far"
                                                }`}
                                              ></span>
                                              <span
                                                className={`fa-star ${
                                                  i.Rating.rating >= 5
                                                    ? "fas"
                                                    : "far"
                                                }`}
                                              ></span>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-lg-8">
                                      <div class="d-sm-flex align-items-sm-start justify-content-sm-end">
                                        <div class="status pr-5">
                                          Status : {i.OrderStatus}
                                        </div>

                                        {i.OrderItems.map((n, index) => {
                                          return (
                                            <div key={index} className="d-flex">
                                              {itemdata.map((x, index) => {
                                                return (
                                                  <div key={index}>
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
                                        <div className="mt-2">
                                          <button
                                            className="od-reject-order btn btn-outline-danger btn-margin"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              updateStatus(i._id, "Canceled");
                                            }}
                                          >
                                            Cancle Order
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
                                              <span class="fas fa-check"></span>{" "}
                                            </li>
                                            <li
                                              id="step-4"
                                              className={`text-muted ${
                                                i.OrderStatus === "On Way"
                                                  ? "green"
                                                  : ""
                                              }`}
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
                              <div>
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderPlace;
