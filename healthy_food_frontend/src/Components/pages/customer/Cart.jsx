import React from "react";
import { Link } from "react-router-dom";
import Header from "../../UIComponents/Userui/Header";
export default function Cart({
  cart,
  handleUpdateCartQuantity,
  handleRemoveItemFromCart,
  calTotal,
}) {
  return (
    <div>
      <Header cart={cart} />
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Shop in style</h1>
            <p className="lead fw-normal text-white-50 mb-0">
              With this shop hompeage template
            </p>
          </div>
        </div>
      </header>
      <section className="py-5">
        <div class="row">
          <div class="col-md-12 col-lg-12 col-xl-12">
            <div class="m-b-30">
              <div class="card-body">
                <div class="row justify-content-center">
                  <div class="col-lg-10 col-xl-8">
                    <div class="cart-container">
                      {cart.length == 0 ? (
                        <>
                          <p className="text-muted">
                            You have not any items in cart.{" "}
                          </p>
                        </>
                      ) : (
                        <>
                          <div class="cart-head">
                            <div class="table-responsive">
                              <table class="table table-borderless">
                                <thead>
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Action</th>
                                    <th scope="col">Photo</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Qty</th>
                                    <th scope="col">Price</th>
                                    <th scope="col" class="text-right">
                                      Total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {cart.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                          <i
                                            class="fa fa-trash text-danger"
                                            onClick={() => {
                                              handleRemoveItemFromCart(
                                                item.item._id
                                              );
                                            }}
                                            aria-hidden="true"
                                          ></i>
                                        </td>
                                        <td>
                                          <img
                                            src={`/api/uploads/${item.item.ImagePlaceholder[0]}`}
                                            class="img-fluid"
                                            width="35"
                                            height="35"
                                            alt="product"
                                          />
                                        </td>
                                        <td>{item.item.title}</td>
                                        <td>
                                          <div class="form-group mb-0">
                                            <input
                                              type="number"
                                              class="form-control cart-qty"
                                              name="cartQty1"
                                              min="1"
                                              max="100"
                                              id="cartQty1"
                                              onChange={(e) => {
                                                if (e.target.value >= 1) {
                                                  handleUpdateCartQuantity(
                                                    item.item._id,
                                                    e.target.value
                                                  );
                                                }
                                              }}
                                              value={item.quantity}
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          {item.item.price} {"RS"}
                                        </td>
                                        <td class="text-right">
                                          {item.item.price * item.quantity} RS
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div class="cart-body">
                            <div class="row">
                              <div class="col-md-12 order-2 order-lg-1 col-lg-5 col-xl-6">
                                <div class="order-note"></div>
                              </div>
                              <div class="col-md-12 order-1 order-lg-2 col-lg-7 col-xl-6">
                                <div class="order-total table-responsive ">
                                  <table class="table table-borderless text-right">
                                    <tbody>
                                      <tr>
                                        <td>Sub Total :</td>
                                        <td>{calTotal(cart) + " Rs"}</td>
                                      </tr>
                                      {/* <tr>
                                                                                        <td>Shipping :</td>
                                                                                        <td>$0.00</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>Tax(18%) :</td>
                                                                                        <td>$180.00</td>
                                                                                    </tr> */}
                                      <tr>
                                        <td class="f-w-7 font-18">
                                          <h4>Amount :</h4>
                                        </td>
                                        <td class="f-w-7 font-18">
                                          <h4>{calTotal(cart) + " Rs"}</h4>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="cart-footer text-right">
                            <Link
                              to="/checkout"
                              class="btn btn-outline-dark mt-auto  custom-button-primary my-1"
                            >
                              Checkout
                              <i class="ri-arrow-right-line ml-2"></i>
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
