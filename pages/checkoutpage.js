import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import {
    clearCart,
    closeCart,
    decreaseQuantity,
    deleteFromCart,
    increaseQuantity,
    openCart
} from "../redux/action/cart";
import Accordion from 'react-bootstrap/Accordion';
import { Row,Col } from "react-bootstrap";


const CheckoutPage = ({
    openCart,
    cartItems,
    activeCart,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    deleteFromCart,
    clearCart,
}) => {
    const price = () => {
        let price = 0;
        cartItems.forEach((item) => (price += item.price * item.quantity));

        return price;
    };

    return (
        <>
            <Layout parent="Home" sub="Shop" subChild="Checkout">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mb-40">
                                <h1 className="heading-2 mb-10">Checkout</h1>
                                <div className="d-flex justify-content-between">
                                    <h6 className="text-body">
                                        There are{" "}
                                        <span className="text-brand">3</span>{" "}
                                        products in your cart
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-7">
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header className="chk-1"><span className="chk-2">1</span>Delivery Address</Accordion.Header>
                                    <Accordion.Body>
                                     <div className="del-address">
                                       <Row>
                                             <div className="col-md-6">
                                                   <div className="add-1">
                                                        <h4>Home
                                                            <span >
                                                                <img src="assets/imgs/theme/edit-1.png" width={30}/>
                                                            </span>
                                                        </h4>
                                                      <p>Wolfson Institute of Preventive Medicine, London EC1M 7BA, UK</p>
                                                   </div>
                                             </div>
                                             <div className="col-md-6">
                                                   <div className="add-1">
                                                        <h4>Home
                                                            <span >
                                                                <img src="assets/imgs/theme/edit-1.png" width={30}/>
                                                            </span>
                                                        </h4>
                                                      <p>Wolfson Institute of Preventive Medicine, London EC1M 7BA, UK</p>
                                                   </div>
                                             </div>
                                        </Row>
                                     </div>
                                    <div className="chk-3">
                                         <button  eventKey="1" className="btn btn-fill-out btn-block mt-30">Next Step</button>
                                     </div>
                                    
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header className="chk-1"><span className="chk-2">2</span> Delivery Schedule</Accordion.Header>
                                    <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                    <div className="chk-3">
                                         <a href="#" class="btn btn-fill-out btn-block mt-30">Next Step</a>
                                     </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header className="chk-1"><span className="chk-2">3</span>Contact Number</Accordion.Header>
                                    <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                    <div className="chk-3">
                                         <a href="#" class="btn btn-fill-out btn-block mt-30">Next Step</a>
                                     </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header className="chk-1"><span className="chk-2">4</span>Payment Option</Accordion.Header>
                                    <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                     <div className="chk-3">
                                         <a href="#" class="btn btn-fill-out btn-block mt-30">Next Step</a>
                                     </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header className="chk-1"><span className="chk-2">5</span>Delivery Instructions (optional)</Accordion.Header>
                                    <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                    <div className="chk-3">
                                         <a href="#" class="btn btn-fill-out btn-block mt-30">Next Step</a>
                                     </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            </div>
                            <div className="col-lg-5">
                                <div className="border p-40 cart-totals ml-30 mb-50">
                                    <div className="d-flex align-items-end justify-content-between mb-30">
                                        <h4>Your Order</h4>
                                        <h6 className="text-muted">Subtotal</h6>
                                    </div>
                                    <div className="divider-2 mb-30"></div>
                                    <div className="table-responsive order_table">
                                        {cartItems.length <= 0 && "No Products"}
                                        <table
                                            className={
                                                cartItems.length > 0
                                                    ? "table no-border"
                                                    : "d-none"
                                            }
                                        >
                                            <tbody>
                                                {cartItems.map((item, i) => (
                                                    
                                                        <tr key={i}>
                                                            <td className="image product-thumbnail">
                                                                <img
                                                                    src={
                                                                        item
                                                                            .images[0]
                                                                            .img
                                                                    }
                                                                    alt="#"
                                                                />
                                                            </td>
                                                            <td>
                                                                <h6 className="w-160 mb-5">
                                                                    <a>
                                                                        {
                                                                            item.title
                                                                        }
                                                                    </a>
                                                                    <div className="product-rate-cover">
                                                                        <div className="product-rate d-inline-block">
                                                                            <div
                                                                                className="product-rating"
                                                                                style={{
                                                                                    width: "90%",
                                                                                }}
                                                                            ></div>
                                                                        </div>
                                                                        <span className="font-small ml-5 text-muted">
                                                                            {" "}
                                                                            (4.0)
                                                                        </span>
                                                                    </div>
                                                                </h6>{" "}
                                                            </td>
                                                            <td>
                                                                <h6 className="text-muted pl-20 pr-20">
                                                                    x{" "}
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </h6>
                                                            </td>
                                                            <td>
                                                                <h4 className="text-brand">
                                                                    $$
                                                                    {item.quantity *
                                                                        item.price}
                                                                </h4>
                                                            </td>
                                                        </tr>
                                                    
                                                ))}
                                                
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                                    <div className="payment_method">
                                        <div className="mb-25">
                                            <h5>Payment</h5>
                                        </div>
                                        <div className="payment_option">
                                            <div className="custome-radio">
                                                <input
                                                    className="form-check-input"
                                                    required=""
                                                    type="radio"
                                                    name="payment_option"
                                                    id="exampleRadios3"
                                                    defaultChecked={true}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="exampleRadios3"
                                                    data-bs-toggle="collapse"
                                                    data-target="#bankTranfer"
                                                    aria-controls="bankTranfer"
                                                >
                                                    Direct Bank Transfer
                                                </label>
                                                <div
                                                    className="form-group collapse in"
                                                    id="bankTranfer"
                                                >
                                                    <p className="text-muted mt-5">
                                                        There are many
                                                        variations of passages
                                                        of Lorem Ipsum
                                                        available, but the
                                                        majority have suffered
                                                        alteration.{" "}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="custome-radio">
                                                <input
                                                    className="form-check-input"
                                                    required=""
                                                    type="radio"
                                                    name="payment_option"
                                                    id="exampleRadios4"
                                                    defaultChecked={true}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="exampleRadios4"
                                                    data-bs-toggle="collapse"
                                                    data-target="#checkPayment"
                                                    aria-controls="checkPayment"
                                                >
                                                    Check Payment
                                                </label>
                                                <div
                                                    className="form-group collapse in"
                                                    id="checkPayment"
                                                >
                                                    <p className="text-muted mt-5">
                                                        Please send your cheque
                                                        to Store Name, Store
                                                        Street, Store Town,
                                                        Store State / County,
                                                        Store Postcode.{" "}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="custome-radio">
                                                <input
                                                    className="form-check-input"
                                                    required=""
                                                    type="radio"
                                                    name="payment_option"
                                                    id="exampleRadios5"
                                                    defaultChecked={true}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="exampleRadios5"
                                                    data-bs-toggle="collapse"
                                                    data-target="#paypal"
                                                    aria-controls="paypal"
                                                >
                                                    Paypal
                                                </label>
                                                <div
                                                    className="form-group collapse in"
                                                    id="paypal"
                                                >
                                                    <p className="text-muted mt-5">
                                                        Pay via PayPal; you can
                                                        pay with your credit
                                                        card if you don't have a
                                                        PayPal account.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a
                                        href="#"
                                        className="btn btn-fill-out btn-block mt-30"
                                    >
                                        Place Order
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    cartItems: state.cart,
    activeCart: state.counter,
});

const mapDispatchToProps = {
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    deleteFromCart,
    openCart,
    clearCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
