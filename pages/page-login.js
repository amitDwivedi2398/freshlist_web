import Link from "next/link";
import Layout from "../components/layout/Layout";
import Router from "next/router";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  console.log(input, password);
  const handleLogin = (e) => {
    e.preventDefault();
    // localStorage.setItem("mobile", input);

    axios
      .post(`http://3.6.37.16:8000/user/login`, {
        mobile: input,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("userId", res.data.user._id);
        console.log(res.data.token);
        const token = res.data.token;
        //   setToken(res.data.token)
        localStorage.setItem("token", token);
        if (res.data.msg == "login success") {
          toast("login success !");
          Router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="Login & Register">
        <div className="page-content pt-70 pb-70">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
                <div className="row">
                  <div className="col-lg-6 pr-30 d-none d-lg-block">
                    <img
                      className="border-radius-15"
                      src="assets/imgs/page/login-1.png"
                      alt=""
                    />
                  </div>
                  <div className="col-lg-6 col-md-8">
                    <div className="login_wrap widget-taber-content background-white">
                      <div className="padding_eight_all bg-white">
                        <div className="heading_s1">
                          <h1 className="mb-5">Login</h1>
                          <p className="mb-30">
                            Don't have an account?{" "}
                            <Link href="/page-register">
                              <a>Create here</a>
                            </Link>
                          </p>
                        </div>
                        <form method="post">
                          <div className="form-group">
                            <input
                              value={input}
                              type="text"
                              required=""
                              name=""
                              placeholder="Please Enter Your Mobile Number"
                              onChange={(e) => {
                                setInput(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              value={password}
                              type="password"
                              required=""
                              name=""
                              placeholder="Please Enter Your Mobile Number"
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                            />
                          </div>

                          {/* <div className="login_footer form-group">
                                                    <div className="chek-form">
                                                        <input type="text" required="" name="email" placeholder="Security code *" />
                                                    </div>
                                                    <span className="security-code">
                                                        <b className="text-new">8</b>
                                                        <b className="text-hot">6</b>
                                                        <b className="text-sale">7</b>
                                                        <b className="text-best">5</b>
                                                    </span>
                                                </div> */}
                          <div className="login_footer form-group mb-50">
                            <div className="chek-form">
                              <div className="custome-checkbox">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="checkbox"
                                  id="exampleCheckbox1"
                                  value=""
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="exampleCheckbox1"
                                >
                                  <span>Remember me</span>
                                </label>
                              </div>
                            </div>
                            <a className="text-muted" href="#">
                              Forgot password?
                            </a>
                          </div>
                          <div className="form-group">
                            {/* <button   onClick={handleregister}    type="submit" className="btn btn-heading btn-block hover-up" name="login"  >Log in</button> */}
                            <a
                              onClick={handleLogin}
                              //  href="otp-verify"
                              className="btn btn-fill-out btn-block hover-up font-weight-bold"
                            >
                              Log in
                            </a>
                          </div>
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

export default Login;
