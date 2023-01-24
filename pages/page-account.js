import Layout from "../components/layout/Layout";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Account() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [customer, setCustomer] = useState({});
  const [userorder, setUserorder] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState({});
  const [mobile, setMobile] = useState("");
  const [currentpass, setcurrentPass] = useState("");
  const [newpass, setnewpass] = useState("");
  const [newcpass, setnewcpass] = useState("");
  const [subscriptios, setSubscriptions] = useState([]);

  const deactiveproduct = async (id) => {
    console.log(id);
    await axios
      .delete(`http://3.6.37.16:8000/admin/delete_subscription/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.msg == "success") {
          toast("Product Unsubscribed");
          getallsubscriptions();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getallsubscriptions = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      /* need to change id with userid*/
      axios
        .get(
          `http://3.6.37.16:8000/admin/total_subscription_list/63b66e5581fb9e18e11038da`
        )
        // .get(`http://3.6.37.16:8000/admin/total_subscription_list/${userId}`)
        .then((res) => {
          console.log(res.data.data);
          setSubscriptions(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleOnClick = (index) => {
    setActiveIndex(index); // remove the curly braces
  };

  const handleLogout = (e) => {
    alert("Are you sure to logout");
    localStorage.removeItem("userId");
    localStorage.clear();
    window.location = "/";
  };

  const fetchuserorder = () => {
    const userId = localStorage.getItem("userId");
    // console.log(userId);
    axios
      .get(`http://3.6.37.16:8000/admin/customer_order_list/${userId}`)
      .then((response) => {
        // console.log(response.data.data);
        setUserorder(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePassEdit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (newpass == newcpass) {
      axios
        .post(`http://3.6.37.16:8000/user/resetPassword/${userId}`, {
          oldpassword: currentpass,
          password: newpass,
          cnfrmPassword: newcpass,
        })
        .then((res) => {
          console.log(res.data.data);
          if (res.data.msg == "success") {
            toast("Password Change Successfully");
          }
        })

        .catch((err) => {
          console.log(err);
          if (err.response.data.msg == "Old Password not matched") {
            toast("Old password does not match");
          }
        });
    } else {
      toast("New & confirm Password does not match ");
    }
  };

  // edituser
  const handleProfileEdit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    const data = new FormData();
    data.append("username", username);
    data.append("email", email);
    if (image !== "") {
      data.append("image", image);
    }
    data.append("mobile", mobile);

    axios
      .post(`http://3.6.37.16:8000/user/edituser/${userId}`, data)
      .then((res) => {
        console.log(res.data);

        if (res.data.msg == "success") {
          toast("Accout details changed Successfully");
          // Router.push("/page-login");
          setUsername("");
          setEmail("");
          setMobile("");
          setImage("");
        } else {
          toast("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
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
    getallsubscriptions();
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
                              activeIndex === 9 ? "nav-link active" : "nav-link"
                            }
                            onClick={() => handleOnClick(9)}
                          >
                            <i className="fi-rs-shopping-cart-check mr-10"></i>
                            Return Product
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
                            <i className="fi-rs-user mr-10"></i>My Wallet
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={
                              activeIndex === 10
                                ? "nav-link active"
                                : "nav-link"
                            }
                            onClick={() => handleOnClick(10)}
                          >
                            <i className="fi-rs-user mr-10"></i>
                            Your Subscriptions
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={
                              activeIndex === 11
                                ? "nav-link active"
                                : "nav-link"
                            }
                            onClick={() => handleOnClick(11)}
                          >
                            <i className="fi-rs-user mr-10"></i>
                            Support Ticket
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={
                              activeIndex === 8 ? "nav-link active" : "nav-link"
                            }
                            onClick={() => handleOnClick(8)}
                          >
                            <i className="fi-rs-user mr-10"></i>My Reward Points
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
                            <a className="nav-link" onClick={handleLogout}>
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
                            <img
                              src={customer.image}
                              alt=""
                              className="img-profile"
                            />
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
                                    <p>Total Refer and Earn</p>
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
                          <div
                            style={{ display: "flex", justifyContent: "right" }}
                            className="d-flex returnproduct "
                          ></div>
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

                                            <td>&#8377;{data.product?.mrp}</td>
                                            <td>{data.status}</td>
                                            <td>
                                              <a
                                                href="#"
                                                className="btn-small d-block"
                                              >
                                                Delete
                                              </a>
                                              <div>
                                                <button
                                                  className={
                                                    activeIndex === 12
                                                      ? "nav-link active btn btn-success"
                                                      : "nav-link"
                                                  }
                                                  onClick={() =>
                                                    handleOnClick(12)
                                                  }
                                                  type="button"
                                                >
                                                  Return
                                                </button>
                                              </div>
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
                            <form method="post">
                              <div className="row">
                                <div className="form-group col-md-12">
                                  <label>
                                    Username <span className="required">*</span>
                                  </label>
                                  <input
                                    required
                                    className="form-control"
                                    name="username"
                                    type="text"
                                    onChange={(e) => {
                                      setUsername(e.target.value);
                                    }}
                                    value={username}
                                    placeholder="UserName"
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
                                    User Image
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    className="form-control py-3"
                                    type="file"
                                    // value={image}
                                    required=""
                                    name="image"
                                    onChange={(e) => {
                                      setImage(e.target.files[0]);
                                    }}
                                    placeholder="Mobile Number"
                                  />
                                </div>
                                <div className="form-group col-md-12">
                                  <label>
                                    Mobile Number{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={mobile}
                                    required=""
                                    name="mobile"
                                    onChange={(e) => {
                                      setMobile(e.target.value);
                                    }}
                                    placeholder="Mobile Number"
                                  />
                                </div>
                                <div className="form-group col-md-12">
                                  <label>
                                    Email Address{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    type="email"
                                    value={email}
                                    required=""
                                    name="email"
                                    onChange={(e) => {
                                      setEmail(e.target.value);
                                    }}
                                    placeholder="Email"
                                  />
                                </div>
                                <div className="col-md-12">
                                  <button
                                    type="submit"
                                    onClick={handleProfileEdit}
                                    className="btn btn-fill-out submit font-weight-bold mb-3"
                                    name="submit"
                                    value="Submit"
                                  >
                                    Save Change
                                  </button>
                                </div>
                                <section className="card mt-3 ">
                                  <h3 className="d-flex justify-content-left mb-3">
                                    Change Password
                                  </h3>
                                  <div className="form-group col-md-12">
                                    <label>
                                      Current Password
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      required
                                      className="form-control"
                                      name="password"
                                      type="password"
                                      value={currentpass}
                                      onChange={(e) => {
                                        setcurrentPass(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="form-group col-md-12">
                                    <label>
                                      New Password
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      required
                                      className="form-control"
                                      name="npassword"
                                      type="password"
                                      value={newpass}
                                      onChange={(e) => {
                                        setnewpass(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="form-group col-md-12">
                                    <label>
                                      Confirm Password{" "}
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      onChange={(e) => {
                                        setnewcpass(e.target.value);
                                      }}
                                      value={newcpass}
                                      required
                                      className="form-control"
                                      name="cpassword"
                                      type="password"
                                    />
                                  </div>
                                  <div className="col-md-12">
                                    <button
                                      type="submit"
                                      onClick={handlePassEdit}
                                      className="btn btn-fill-out submit font-weight-bold"
                                      name="submit"
                                      value="Submit"
                                    >
                                      Update Password
                                    </button>
                                  </div>
                                </section>
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

                      <div
                        className={
                          activeIndex === 8
                            ? "tab-pane fade active show"
                            : "tab-pane fade "
                        }
                      >
                        <div className="card">
                          <div className="card-header">
                            <h5>Your total number of reward points is: 0.</h5>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Date added</th>
                                    <th>Description</th>
                                    <th>Total Earning</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>March 45, 2020</td>
                                    <td>for bulk purchase</td>
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
                                    <td>for bulk purchase</td>
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
                                    <td>for bulk purchase</td>
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
                      <div
                        className={
                          activeIndex === 9
                            ? "tab-pane fade active show"
                            : "tab-pane fade "
                        }
                      >
                        <div className="card">
                          <div className="card-header">
                            <h5>Your Product: 0.</h5>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Date added</th>
                                    <th>Product Id</th>
                                    <th>Product Name</th>
                                    {/* <th>Description</th> */}
                                    <th>Price</th>
                                    {/* <th>Status</th> */}
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>12/10/2023</td>
                                    <td>4452020</td>
                                    <td>mobile purchase</td>
                                    <td>$125.00 for 2 item</td>
                                    {/* <td>Done</td> */}
                                    <td>
                                      <a href="#" className="btn-small d-block">
                                        Return
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2</td>
                                    <td>12/10/2023</td>
                                    <td>545442020</td>
                                    <td>mobile purchase</td>
                                    <td>$125.00 for 2 item</td>
                                    {/* <td>Done</td> */}
                                    <td>
                                      <a href="#" className="btn-small d-block">
                                        Return
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>12/10/2023</td>
                                    <td>45352020</td>
                                    <td>for bulk purchase</td>
                                    <td>$125.00 for 2 item</td>
                                    {/* <td>Done</td> */}
                                    <td>
                                      <a href="#" className="btn-small d-block">
                                        Return
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
                          activeIndex === 10
                            ? "tab-pane fade active show"
                            : "tab-pane fade "
                        }
                      >
                        <div className="card">
                          <div className="card-header">
                            <h5>Your Total Subscriptions list.</h5>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr style={{ fontSize: "15px" }}>
                                    <th>S. No.</th>
                                    <th>Date added</th>
                                    <th>Subscribed Product</th>
                                    <th>Validity</th>
                                    <th>Vender Name</th>
                                    <th>Group Name</th>
                                    <th>Quantity</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                {subscriptios !== "" ? (
                                  <>
                                    {subscriptios?.map((value, i) => (
                                      <tbody
                                        style={{ justifyContent: "center" }}
                                        key={value?._id}
                                      >
                                        <tr>
                                          <td>{i + 1}</td>
                                          <td>{value?.date_add}</td>
                                          <td>
                                            {
                                              value?.subscribed_product
                                                ?.product_name
                                            }
                                          </td>
                                          <td>{value?.validity}</td>
                                          <td>{value?.vender_id?.name}</td>
                                          <td>{value?.group_id?.group_name}</td>
                                          <td>{value?.quantity}</td>
                                          <td>{value?.status}</td>
                                          <td>
                                            <a
                                              onClick={() => {
                                                deactiveproduct(value?._id);
                                              }}
                                              className="btn-small d-block"
                                            >
                                              Unsubscribe
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    ))}
                                  </>
                                ) : null}
                              </table>
                            </div>
                          </div>

                          {/* <div className="card-body">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>S. No.</th>
                                    <th>Date added</th>
                                    <th>Subscribed Product</th>
                                    <th>Validity</th>
                                    <th>Vender Name</th>
                                    <th>Group Name</th>
                                    <th>Quantity</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>March 45, 2020</td>
                                    <td>for bulk purchase</td>
                                    <td>2 month</td>
                                    <td>abc store</td>
                                    <td>milk group</td>
                                    <td>6</td>
                                    <td>Active</td>
                                    <td>
                                      <a href="#" className="btn-small d-block">
                                        Delete
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2</td>
                                    <td>March 45, 2020</td>
                                    <td>for bulk purchase</td>
                                    <td>2 month</td>
                                    <td>saha store</td>
                                    <td>milk group</td>

                                    <td>2 </td>
                                    <td>Active</td>
                                    <td>
                                      <a href="#" className="btn-small d-block">
                                        Delete
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>March 45, 2020</td>
                                    <td>for bulk purchase</td>
                                    <td>2 month</td>
                                    <td>new store</td>
                                    <td>daily routin</td>
                                    <td>4</td>
                                    <td>Active</td>
                                    <td>
                                      <a href="#" className="btn-small d-block">
                                        Delete
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div> */}
                        </div>
                      </div>
                      <div
                        className={
                          activeIndex === 11
                            ? "tab-pane fade active show"
                            : "tab-pane fade "
                        }
                      >
                        <div className="card">
                          <div className="card-header">
                            <h5>Your Support Ticket</h5>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th># S No.</th>
                                    <th>Date Added</th>
                                    <th>Ticket No.</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>March 45, 2020</td>
                                    <td>for bulk purchase</td>
                                    <td>2 month</td>
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
                                    <td>for bulk purchase</td>
                                    <td>2 month</td>
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
                                    <td>for bulk purchase</td>
                                    <td>2 month</td>
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
                      <div
                        className={
                          activeIndex === 12
                            ? "tab-pane fade active show"
                            : "tab-pane fade "
                        }
                      >
                        <div className="card">
                          <div className="card-header">
                            <h5>Return Your Product</h5>
                          </div>
                          <div className="card-body">
                            <form method="post">
                              <div className="row">
                                <div className="form-group col-md-12">
                                  <label>
                                    product Name{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    required
                                    className="form-control"
                                    // name="username"
                                    type="text"
                                    // onChange={(e) => {
                                    //   setUsername(e.target.value);
                                    // }}
                                    // value={username}
                                    placeholder="UserName"
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
                                {/* <div className="form-group col-md-12">
                                  <label>
                                    User Image
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    className="form-control py-3"
                                    type="file"
                                    // value={image}
                                    required=""
                                    name="image"
                                    onChange={(e) => {
                                      setImage(e.target.files[0]);
                                    }}
                                    placeholder="Mobile Number"
                                  />
                                </div> */}
                                <div className="form-group col-md-12">
                                  <label>
                                    Reason For Return
                                    <span className="required">*</span>
                                  </label>
                                  <textarea
                                    type="text"
                                    // value={mobile}
                                    required=""
                                    name="mobile"
                                    // onChange={(e) => {
                                    //   setMobile(e.target.value);
                                    // }}
                                    placeholder=" Return Reason "
                                  />
                                </div>
                                <div className="form-group col-md-12">
                                  <label>
                                    details
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    type="email"
                                    // value={email}
                                    required=""
                                    name="email"
                                    // onChange={(e) => {
                                    //   setEmail(e.target.value);
                                    // }}
                                    placeholder=""
                                  />
                                </div>
                                <div className="col-md-12">
                                  <button
                                    type="submit"
                                    // onClick={handleProfileEdit}
                                    className="btn btn-fill-out submit font-weight-bold mb-3"
                                    name="submit"
                                    value="Submit"
                                  >
                                    Save Change
                                  </button>
                                </div>
                                <section className="card mt-3 ">
                                  {/* <h3 className="d-flex justify-content-left mb-3">
                                    Change Password
                                  </h3> */}
                                  {/* <div className="form-group col-md-12"> */}
                                  {/* <label>
                                      Current Password
                                      <span className="required">*</span>
                                    </label> */}
                                  {/* <input
                                      required
                                      className="form-control"
                                      name="password"
                                      type="password"
                                      value={currentpass}
                                      onChange={(e) => {
                                        setcurrentPass(e.target.value);
                                      }}
                                    /> */}
                                  {/* </div> */}
                                  {/* <div className="form-group col-md-12">
                                    <label>
                                      New Password
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      required
                                      className="form-control"
                                      name="npassword"
                                      type="password"
                                      value={newpass}
                                      onChange={(e) => {
                                        setnewpass(e.target.value);
                                      }}
                                    />
                                  </div> */}
                                  {/* <div className="form-group col-md-12">
                                    <label>
                                      Confirm Password{" "}
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      onChange={(e) => {
                                        setnewcpass(e.target.value);
                                      }}
                                      value={newcpass}
                                      required
                                      className="form-control"
                                      name="cpassword"
                                      type="password"
                                    />
                                  </div> */}
                                  {/* <div className="col-md-12">
                                    <button
                                      type="submit"
                                      onClick={handlePassEdit}
                                      className="btn btn-fill-out submit font-weight-bold"
                                      name="submit"
                                      value="Submit"
                                    >
                                      Update Password
                                    </button>
                                  </div> */}
                                </section>
                              </div>
                            </form>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive"></div>
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
