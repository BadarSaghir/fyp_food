import React from "react";
import { Link } from "react-router-dom";
import Footer from "../UIComponents/AdminUI/Footer";
import Header from "../UIComponents/AdminUI/Header";
import SideBar from "../UIComponents/AdminUI/SideBar";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [pending, setPending] = useState(0);

//   async function getData() {
//     const config = {
//       headers: {
//         "x-auth-token": sessionStorage.getItem("token"),
//       },
//     };
//     try {
//       const res = await axios.get("api/orderresturent", config);
//       const res2 = await axios.get("api/menuresturent", config);
//       setMenuItems(res2.data);
//       return res.data;
//     } catch (error) {
//       return "";
//     }
//   }

  const { refresh, setRefresh } = useState(false);
  const [ordervalue, setOrdervalue] = useState([]);
  const [itemdata, setItemdata] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  let c = 0;

  useEffect(() => {
    async function getNow() {
      const config = {
        headers: {
          "x-auth-token": sessionStorage.getItem("token"),
        },
      };
      let res = await axios.get("api/orderresturent", config);
      let res2 = await axios.get("api/menuresturent", config);
      setOrdervalue(res?.data?.orders);
      setItemdata(res?.data?.itemsData);
      setMenuItems(res2?.data);
    }
    getNow();
    // let pcount=0
    // for(let i=0; i<ordervalue.length;i++){
    //     console.log("OrderStatus",ordervalue[i])
    //     // if(pend["OrderStatus"] ==="Pending"){
    //         pcount=pcount+1
    //     }
  }, []);

  // console.log('item',JSON.stringify(itemdata,null,1))
  // console.log('Order',JSON.stringify(ordervalue,null,1))
  console.log("Menu", JSON.stringify(menuItems, null, 1));
  console.log("Menu Object", menuItems);

  // }
  //   setPending(pcount)
  return (
    <div class="container-fluid">
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
        {
          <Link
            to="#"
            class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <i class="fas fa-download fa-sm text-white-50"></i> Generate Report
          </Link>
        }
      </div>

      <div class="row">
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Pending Orders
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {ordervalue.map((v, i) => {
                      if (i == 0) c = 0;
                      if (
                        v["OrderStatus"] == "Accepted" ||
                        v["OrderStatus"] == "On Way"
                      )
                        c = c + 1;
                      if (ordervalue.length - 1 === i) return <div>{c}</div>;
                    })}
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-calendar fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Earnings
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    $
                    {ordervalue.map((v, i) => {
                      if (i == 0) c = 0;
                      if (v["OrderStatus"] == "Delivered")
                        c = c + parseInt(v["Price"]);

                      if (ordervalue.length - 1 === i) return <span>{c}</span>;
                    })}
                    <span> Rs</span>
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-info shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Menu
                  </div>
                  <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                      <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        {menuItems.map((v, i) => {
                          if (i == 0) c = 0;
                          c = c + 1;
                          if (menuItems.length - 1 === i)
                            return <span>{c}</span>;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-warning shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Pending Requests
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {ordervalue.map((v, i) => {
                      if (i == 0) c = 0;
                      if (v["OrderStatus"] == "Pending") c = c + 1;
                      if (ordervalue.length - 1 === i) return <div>{c}</div>;
                    })}
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-comments fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        <div class="row">
          <div class="col-xl-8 col-lg-7">
            <div class="card shadow mb-4">
              <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">
                  Earnings Overview
                </h6>
                <div class="dropdown no-arrow">
                  <Link
                    class="dropdown-toggle"
                    to="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </Link>
                  <div
                    class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <div class="dropdown-header">Dropdown Header:</div>
                    <Link class="dropdown-item" to="#">
                      Action
                    </Link>
                    <Link class="dropdown-item" to="#">
                      Another action
                    </Link>
                    <div class="dropdown-divider"></div>
                    <Link class="dropdown-item" to="#">
                      Something else here
                    </Link>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="chart-area">
                  <canvas id="myAreaChart"></canvas>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-5">
            <div class="card shadow mb-4">
              <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">
                  Revenue Sources
                </h6>
                <div class="dropdown no-arrow">
                  <Link
                    class="dropdown-toggle"
                    to="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </Link>
                  <div
                    class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <div class="dropdown-header">Dropdown Header:</div>
                    <Link class="dropdown-item" to="#">
                      Action
                    </Link>
                    <Link class="dropdown-item" to="#">
                      Another action
                    </Link>
                    <div class="dropdown-divider"></div>
                    <Link class="dropdown-item" to="#">
                      Something else here
                    </Link>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="chart-pie pt-4 pb-2">
                  <canvas id="myPieChart"></canvas>
                </div>
                <div class="mt-4 text-center small">
                  <span class="mr-2">
                    <i class="fas fa-circle text-primary"></i> Direct
                  </span>
                  <span class="mr-2">
                    <i class="fas fa-circle text-success"></i> Social
                  </span>
                  <span class="mr-2">
                    <i class="fas fa-circle text-info"></i> Referral
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
