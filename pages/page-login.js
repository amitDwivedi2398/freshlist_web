import Link from "next/link";
import Layout from "../components/layout/Layout";
import Router from "next/router";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   // localStorage.setItem("mobile", input);
  //   axios
  //     .post(`http://3.6.37.16:8000/user/login`, {
  //       email: email,
  //       password: password,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       localStorage.setItem("username", res.data.user.username);
  //       localStorage.setItem("userId", res.data.user._id);
  //       console.log(res.data.token);
  //       const token = res.data.token;

  //       localStorage.setItem("token", token);
  //       if (res.data.msg == "success") {
  //         toast("login success !");
  //         Router.push("/");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.clear();
    console.log(email, password);
    try {
      const response = await axios.post(`http://3.111.58.192:4000/user/login`, {
        mobile: email,
        // email: email,
        password: password,
      });
      // console.log("eerere", response.data);
      console.log(response.data);
      if (response.data.msg == "success") {
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("userId", response.data.user._id);
        // localStorage.setItem("token", response.data.token);

        Router.push("/");
      }
    } catch (error) {
      if (error.response.data.msg == "User Doesnot Exist") {
        toast("User does not Exist");
      }
    }
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
                            <Link href="/registration">
                              <a>Create here</a>
                            </Link>
                          </p>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <input
                              value={email}
                              type="input"
                              required=""
                              name=""
                              placeholder="Please Enter Your Mobile Number"
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              value={password}
                              type="password"
                              required=""
                              name=""
                              placeholder="Password"
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
                            <button
                              type="submit"
                              className="btn btn-heading btn-block hover-up"
                              name="login"
                            >
                              Log in
                            </button>
                            {/* <a
                              className="btn btn-fill-out btn-block hover-up font-weight-bold"
                            >
                              Log in
                            </a> */}
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
