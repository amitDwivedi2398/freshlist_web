import Link from "next/link";
import Layout from "../components/layout/Layout";

function OtpVerify() {
    return (
        <>
            <Layout parent="Home" sub="OTP Verify" >
                <div className="page-content pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-8 col-md-12 m-auto">
                                <div className="row">
                                    <div className="col-lg-12 col-md-8">
                                        <div className="login_wrap widget-taber-content background-white">
                                            <div className="padding_eight_all bg-white">
                                                    <div className="heading_s1">
                                                        <h1 className="mb-5 st-2">Enter Your OTP Here for Verification..</h1>
                                                        {/* <p>Already have an account? <Link href="/page-login"><a>Log in instead!</a></Link></p> */}
                                                    </div>
                                                    <br></br>
                                                <form method="post">
                                                    <div className="form-group">
                                                        <input type="number" required="" name="" placeholder="Please Enter Your OTP" />
                                                    </div>
                                                    
                                                    <div className="login_footer form-group mb-50">
                                                        <div className="chek-form">
                                                            <div className="custome-checkbox">
                                                                <input className="form-check-input" type="checkbox" name="checkbox" id="exampleCheckbox12" value="" />
                                                                <label className="form-check-label" htmlFor="exampleCheckbox12"><span>I agree to terms &amp; Policy.</span></label>
                                                            </div>
                                                        </div>
                                                        <Link href="/page-privacy-policy"><a><i className="fi-rs-book-alt mr-5 text-muted"></i>Lean more</a></Link>
                                                    </div>
                                                    <div className="form-group mb-30">
                                                        {/* <button type="submit" className="btn btn-fill-out btn-block hover-up font-weight-bold" name="login">Submit</button> */}
                                                        <a href="/completeregister" className="btn btn-fill-out btn-block hover-up font-weight-bold">
                                                            Submit
                                                        </a>
                                                    </div>
                                                    <p className="font-xs text-muted"><strong>Note:</strong>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy</p>
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

export default OtpVerify;
