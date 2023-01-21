import Layout from "./../components/layout/Layout";
import { usePlacesWidget } from "react-google-autocomplete";

function ProductSubscription() {
  return (
    <Layout parent="Home" sub="Product Subscription">
      <>
        <section className="mtb-40">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="subs-product">
                  <h4 className="">Add Subsription </h4>
                  <form method="post">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <select className="form-control stl">
                            <option>--Select Category---</option>
                            <option>lorem1</option>
                            <option>lorem2</option>
                            <option>lorem3</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <select className="form-control stl">
                            <option>--Select Subcategory---</option>
                            <option>lorem1</option>
                            <option>lorem2</option>
                            <option>lorem3</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            required=""
                            name=""
                            placeholder="Product Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <select className="form-control stl">
                            <option>--Select Subscription Plan---</option>
                            <option>Monthly</option>
                            <option>Quarterly </option>
                            <option>yearly</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <select className="form-control stl">
                            <option>---Product Price--</option>
                            <option>Monthly</option>
                            <option>Quarterly </option>
                            <option>yearly</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            required=""
                            type="text"
                            name=""
                            placeholder="Product Quantity"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="payment_option mb-50">
                      {/* <div className="custome-radio">
                        <input
                          className="form-check-input"
                          required=""
                          type="radio"
                          name="payment_option"
                          id="exampleRadios3"
                          defaultChecked=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleRadios3"
                          data-bs-toggle="collapse"
                          data-target="#bankTranfer"
                          aria-controls="bankTranfer"
                        >
                          I am a customer
                        </label>
                      </div> */}
                      {/* <div className="custome-radio">
                        <input
                          className="form-check-input"
                          required=""
                          type="radio"
                          name="payment_option"
                          id="exampleRadios4"
                          defaultChecked=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleRadios4"
                          data-bs-toggle="collapse"
                          data-target="#checkPayment"
                          aria-controls="checkPayment"
                        >
                          I am a vendor
                        </label>
                      </div> */}
                    </div>
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
                    </div>
                    <div className="form-group mb-30">
                      <button
                        type="submit"
                        className="btn btn-fill-out btn-block hover-up font-weight-bold"
                        name="login"
                      >
                        Submit
                      </button>
                    </div>
                    {/* <p className="font-xs text-muted">
                      <strong>Note:</strong>Your personal data will be used to
                      support your experience throughout this website, to manage
                      access to your account, and for other purposes described
                      in our privacy policy
                    </p> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
}

export default ProductSubscription;
