import Layout from "../components/layout/Layout";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Account() {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleOnClick = (index) => {
    setActiveIndex(index); // remove the curly braces
  };

  const handleLogout = (e) => {
    alert("Are you sure to logout");
    console.log("logout hhhhh");
    localStorage.clear();
    window.location.replace("/");
  };

  const [customer, setCustomer] = useState({});
  const [userorder, setUserorder] = useState({});

  const fetchuserorder = () => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    axios
      .get(`http://3.6.37.16:8000/admin/customer_order_list/${userId}`)
      .then((response) => {
        console.log(response.data.data);
        setUserorder(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // viewone user
  const fetchCustomer = () => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    axios
      .get(`http://3.6.37.16:8000/user/getviewone/${userId}`)
      .then((response) => {
        console.log(response.data.data);
        setCustomer(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    let data = localStorage.getItem("token");
    fetchCustomer();
    fetchuserorder();
  }, []);

  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="Account">
        <div className="page-content pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 m-auto">
                <div className="row">
                  <div className="col-md-3">
                    <div className="dashboard-menu">
                      <ul className="nav flex-column" role="tablist">
                        <li className="nav-item">
                          <a
                            className={
                              activeIndex === 1 ? "nav-link active" : "nav-link"
                            }
                            onClick={() => handleOnClick(1)}
                          >
                            <i className="fi-rs-settings-sliders mr-10"></i>
                            Dashboard
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={
                              activeIndex === 2 ? "nav-link active" : "nav-link"
                            }
                            onClick={() => handleOnClick(2)}
                          >
                            <i className="fi-rs-shopping-bag mr-10"></i>Orders
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={
                              activeIndex === 3 ? "nav-link active" : "nav-link"
                            }
                            onClick={() => handleOnClick(3)}
                          >
                            <i className="fi-rs-shopping-cart-check mr-10"></i>
                            Track Your Order
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={
                              activeIndex === 4 ? "nav-link active" : "nav-link"
                            }
                            onClick={() => handleOnClick(4)}
                          >
                            <i className="fi-rs-marker mr-10"></i>My Address
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={
                              activeIndex === 5 ? "nav-link active" : "nav-link"
                            }
                            onClick={() => handleOnClick(5)}
                          >
                            <i className="fi-rs-user mr-10"></i>Edit Account
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={
                              activeIndex === 6 ? "nav-link active" : "nav-link"
                            }
                            onClick={() => handleOnClick(6)}
                          >
                            <i className="fi-rs-user mr-10"></i>Wallet
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={
                              activeIndex === 7 ? "nav-link active" : "nav-link"
                            }
                            onClick={() => handleOnClick(7)}
                          >
                            <i className="fi-rs-user mr-10"></i>Refer and
                            Earning
                          </a>
                        </li>
                        <li className="nav-item">
                          <Link href="/page-login">
                            <a
                              className="nav-link"
                              onClick={() => handleLogout()}
                            >
                              <i className="fi-rs-sign-out mr-10"></i>Logout
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="tab-content account dashboard-content pl-50">
                      <div
                        className={
                          activeIndex === 1
                            ? "tab-pane fade active show"
                            : "tab-pane fade "
                        }
                      >
                        <div className="card">
                          <div className="card-header">
                            <h3 className="mb-0">
                              Hello, {customer?.username}
                            </h3>
                          </div>
                          <div className="card-body">
                            <div className="info-user">
                              <ul>
                                <li>
                                  Mobile: <span>{customer?.mobile}</span>
                                </li>
                                <li>
                                  Email: <span>{customer?.email}</span>
                                </li>
                              </ul>
                            </div>
                            <p>
                              From your account dashboard. you can easily check
                              &amp; view your <a href="#">recent orders</a>,
                              <br />
                              manage your{" "}
                              <a href="#">
                                shipping and billing addresses
                              </a> and{" "}
                              <a href="#">
                                edit your password and account details.
                              </a>
                            </p>
                            <div className="counter-widgt my-5">
                              <div className="row">
                                <div className="col-lg-4 col-md-4 ">
                                  <div className="count-1">
                                    <h4>30</h4>
                                    <p>Total Orders</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 ">
                                  <div className="count-1 bg-2">
                                    <h4>30</h4>
                                    <p>Total Refer and Eran</p>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 ">
                                  <div className="count-1 bg-3">
                                    <h4>$300</h4>
                                    <p> Wallet Amount</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={
                          activeIndex === 2
                            ? "tab-pane fade active show"
                            : "tab-pane fade "
                        }
                      >
                        <div className="card">
                          <div className="card-header">
                            <h3 className="mb-0">Your Orders</h3>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Order</th>
                                    <th>Product Name</th>
                                    <th>Order Date</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {userorder.length
                                    ? userorder.map((data, index) => {
                                        return (
                                          <tr>
                                            <td>1</td>
                                            <td>{data.orderId}</td>
                                            <td>
                                              {data.product?.product_name}
                                            </td>
                                            <td>March 45, 2020</td>
                                            <td>${data.product?.mrp}</td>
                                            <td>{data.status}</td>
                                            <td>
                                              <a
                                                href="#"
                                                className="btn-small d-block"
                                              >
                                                Delete
                                              </a>
                                            </td>
                                          </tr>
                                        );
                                      })
                                    : null}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={
                          activeIndex === 3
                            ? "tab-pane fade active show"
                            : "tab-pane fade "
                        }
                      >
                        <div className="card">
                          <div className="card-header">
                            <h3 className="mb-0">Orders tracking</h3>
                          </div>
                          <div className="card-body contact-from-area">
                            <p>
                              To track your order please enter your OrderID in
                              the box below and press "Track" button. This was
                              given to you on your receipt and in the
                              confirmation email you should have received.
                            </p>
                            <div className="row">
                              <div className="col-lg-8">
                                <form
                                  className="contact-form-style mt-30 mb-50"
                                  action="#"
                                  method="post"
                                >
                                  <div className="input-style mb-20">
                                    <label>Order ID</label>
                                    <input
                                      name="order-id"
                                      placeholder="Found in your order confirmation email"
                                      type="text"
                                    />
                                  </div>
                                  <div className="input-style mb-20">
                                    <label>Billing email</label>
                                    <input
                                      name="billing-email"
                                      placeholder="Email you used during checkout"
                                      type="email"
                                    />
                                  </div>
                                  <button
                                    className="submit submit-auto-width"
                                    type="submit"
                                  >
                                    Track
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={
                          activeIndex === 4
                            ? "tab-pane fade active show"
                            : "tab-pane fade "
                        }
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="card mb-3 mb-lg-0">
                              <div className="card-header">
                                <h3 className="mb-0">Billing Address</h3>
                              </div>
                              <div className="card-body">
                                <address>
                                  3522 Interstate
                                  <br />
                                  75 Business Spur,
                                  <br />
                                  Sault Ste. <br />
                                  Marie, MI 49783
                                </address>
                                <p>New York</p>
                                <a href="#" className="btn-small">
                                  Edit
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="card">
                              <div className="card-header">
                                <h5 className="mb-0">Shipping Address</h5>
                              </div>
                              <div className="card-body">
                                <address>
                                  4299 Express Lane
                                  <br />
                                  Sarasota, <br />
                                  FL 34249 USA <br />
                                  Phone: 1.941.227.4444
                                </address>
                                <p>Sarasota</p>
                                <a href="#" className="btn-small">
                                  Edit
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={
                          activeIndex === 5
                            ? "tab-pane fade active show"
                            : "tab-pane fade "
                        }
                      >
                        <div className="card">
                          <div className="card-header">
                            <h5>Account Edit</h5>
                          </div>
                          <div className="card-body">
                            <form method="post" name="enq">
                              <div className="row">
                                <div className="form-group col-md-12">
                                  <label>
                                    Username <span className="required">*</span>
                                  </label>
                                  <input
                                    required=""
                                    className="form-control"
                                    name="name"
                                    type="text"
                                  />
                                </div>
                                {/* <div className="form-group col-md-6">
                                  <label>
                                    Last Name{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    required=""
                                    className="form-control"
                                    name="phone"
                                  />
                                </div> */}
                                {/* <div className="form-group col-md-12">
                                  <label>
                                    Display Name{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    required=""
                                    className="form-control"
                                    name="dname"
                                    type="text"
                                  />
                                </div> */}
                                <div className="form-group col-md-12">
                                  <label>
                                    Email Address{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    required=""
                                    className="form-control"
                                    name="email"
                                    type="email"
                                  />
                                </div>
                                <div className="form-group col-md-12">
                                  <label>
                                    Current Password{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    required=""
                                    className="form-control"
                                    name="password"
                                    type="password"
                                  />
                                </div>
                                <div className="form-group col-md-12">
                                  <label>
                                    New Password{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    required=""
                                    className="form-control"
                                    name="npassword"
                                    type="password"
                                  />
                                </div>
                                <div className="form-group col-md-12">
                                  <label>
                                    Confirm Password{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    required=""
                                    className="form-control"
                                    name="cpassword"
                                    type="password"
                                  />
                                </div>
                                <div className="col-md-12">
                                  <button
                                    type="submit"
                                    className="btn btn-fill-out submit font-weight-bold"
                                    name="submit"
                                    value="Submit"
                                  >
                                    Save Change
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div
                        className={
                          activeIndex === 6
                            ? "tab-pane fade active show"
                            : "tab-pane fade "
                        }
                      >
                        <div className="card">
                          <div className="card-header">
                            <h5>Wallet</h5>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Add Amount</th>
                                    <th>Date</th>
                                    <th>Total Amount</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>$357</td>
                                    <td>March 45, 2020</td>
                                    <td>$1250.00</td>
                                    <td>Success</td>
                                    <td>
                                      <a href="#" className="btn-small d-block">
                                        Delete
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2</td>
                                    <td>$357</td>
                                    <td>March 45, 2020</td>
                                    <td>$1250.00</td>
                                    <td>Success</td>
                                    <td>
                                      <a href="#" className="btn-small d-block">
                                        Delete
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>$357</td>
                                    <td>March 45, 2020</td>
                                    <td>$1250.00</td>
                                    <td>Success</td>
                                    <td>
                                      <a href="#" className="btn-small d-block">
                                        Delete
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={
                          activeIndex === 7
                            ? "tab-pane fade active show"
                            : "tab-pane fade "
                        }
                      >
                        <div className="card">
                          <div className="card-header">
                            <h5>Refer and Earning</h5>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Total Earning</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>March 45, 2020</td>
                                    <td>$125.00 for 2 item</td>
                                    <td>Done</td>
                                    <td>
                                      <a href="#" className="btn-small d-block">
                                        Delete
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2</td>
                                    <td>March 45, 2020</td>
                                    <td>$125.00 for 2 item</td>
                                    <td>Done</td>
                                    <td>
                                      <a href="#" className="btn-small d-block">
                                        Delete
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>March 45, 2020</td>
                                    <td>$125.00 for 2 item</td>
                                    <td>Done</td>
                                    <td>
                                      <a href="#" className="btn-small d-block">
                                        Delete
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Account;
