import Link from "next/link";
import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import Router from "next/router";

function CompleteRegister() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [scode, setScode] = useState("");

  const handleCompletelogin = (e) => {
    e.preventDefault();
    const LoginId = localStorage.getItem("LoginId");

    axios
      .post(`http://3.6.37.16:8000/user/userRegister/${LoginId}`, {
        username: user,
        email: email,
        password: password,
        cnfrmPassword: cpassword,
        captcha: scode,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.msg == "success") {
          toast("Account Created Successfully");
          Router.push("/page-login");
        } else {
          toast("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="Account Detail">
        <div className="page-content pt-70 pb-70">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-12 col-md-12 m-auto">
                    <div className="row">
                      <div className="col-lg-6 pr-30 d-none d-lg-block">
                          <img className="border-radius-15" src="assets/imgs/page/register-img.jpg" alt="" />
                      </div>
                    <div className="col-lg-6 col-md-6">
                    <div className="login_wrap widget-taber-content background-white">
                      <div className="padding_eight_all bg-white">
                        <div className="heading_s1">
                          <h1 className="mb-5 st-2"> Account Detail</h1>
                        </div>
                        <form method="post">
                          <div className="form-group">
                            <input
                              onChange={(e) => {
                                setUser(e.target.value);
                              }}
                              type="text"
                              required=""
                              value={user}
                              name="username"
                              placeholder="Username"
                            />
                          </div>
                          <div className="form-group">
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
                          <div className="form-group">
                            <input
                              required=""
                              value={password}
                              type="password"
                              name="password"
                              placeholder="Password"
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              required=""
                              value={cpassword}
                              onChange={(e) => {
                                setCPassword(e.target.value);
                              }}
                              type="password"
                              name="password"
                              placeholder="Confirm password"
                            />
                          </div>
                          <div className="login_footer form-group">
                            <div className="chek-form">
                              <input
                                value={scode}
                                type="text"
                                required=""
                                name="email"
                                onChange={(e) => {
                                  setScode(e.target.value);
                                }}
                                placeholder="Security code *"
                              />
                            </div>
                            <span className="security-code">
                              <b className="text-new">8</b>
                              <b className="text-hot">6</b>
                              <b className="text-sale">7</b>
                              <b className="text-best">5</b>
                            </span>
                          </div>
                          {/* <div className="payment_option mb-50">
                                                    <div className="custome-radio">
                                                        <input className="form-check-input" required="" type="radio" name="payment_option" id="exampleRadios3" defaultChecked="" />
                                                        <label className="form-check-label" htmlFor="exampleRadios3" data-bs-toggle="collapse" data-target="#bankTranfer" aria-controls="bankTranfer">I am a customer</label>
                                                    </div>
                                                    <div className="custome-radio">
                                                        <input className="form-check-input" required="" type="radio" name="payment_option" id="exampleRadios4" defaultChecked="" />
                                                        <label className="form-check-label" htmlFor="exampleRadios4" data-bs-toggle="collapse" data-target="#checkPayment" aria-controls="checkPayment">I am a vendor</label>
                                                    </div>
                                                </div> */}
                          <div className="login_footer form-group mb-50">
                            <div className="chek-form">
                              <div className="custome-checkbox">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="checkbox"
                                  id="exampleCheckbox12"
                                  value=""
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="exampleCheckbox12"
                                >
                                  <span>I agree to terms &amp; Policy.</span>
                                </label>
                              </div>
                            </div>
                            {/* <Link href="/page-privacy-policy">
                              <a>
                                <i className="fi-rs-book-alt mr-5 text-muted"></i>
                                Lean more
                              </a>
                            </Link> */}
                          </div>
                          <div className="form-group mb-30">
                            {/* <button type="submit" className="btn btn-fill-out btn-block hover-up font-weight-bold" name="login">Submit &amp; Register</button> */}
                            <a
                              onClick={handleCompletelogin}
                              //   href="page-login"
                              className="btn btn-fill-out btn-block hover-up font-weight-bold"
                            >
                              Submit
                            </a>
                          </div>

                          {/* <p className="font-xs text-muted">
                            <strong>Note:</strong>Your personal data will be
                            used to support your experience throughout this
                            website, to manage access to your account, and for
                            other purposes described in our privacy policy
                          </p> */}
                        </form>
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

export default CompleteRegister;
