import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import Timer from "./Timer";
import axios from "axios";

const Deals1 = ({ product }) => {
  const handleCart = (data) => {
    console.log(data);
    // addToCart(product);
    // toast("Product added to Cart !");
    const subtotl = data?.productId?.buying_price * data?.productId?.quantity;

    const userId = localStorage.getItem("userId");
    if (userId !== "" && userId !== null) {
      axios
        .post(`http://3.6.37.16:8000/admin/add_cart`, {
          customer: userId,
          product: data?.productId?._id,
          unit_price: data?.productId?.buying_price,
          quantity: data?.productId?.quantity,
          subtotal: subtotl,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.msg == "success") {
            toast("Product Added Successfully");
            // getviewcart();
          } else {
            toast("Something went wrong");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else toast("login First");
  };

  return (
    <>
      <div
        className="product-cart-wrap style-2 wow animate__animated animate__fadeInUp"
        data-wow-delay="0"
      >
        <div className="product-img-action-wrap">
          <div className="product-img">
            <Link href="/products">
              <a>
                <img
                  src={product?.productId?.product_image}
                  alt="product image"
                />
                {/* <img src={product.discount.banner} alt="" /> */}
              </a>
            </Link>
          </div>
        </div>
        <div className="product-content-wrap">
          <div className="deals-countdown-wrap">
            <Timer endDateTime="2023-01-25 00:00:00" />
          </div>
          <div className="deals-content">
            <h2>
              <Link href="/products/[slug]" as={`/products/${product.slug}`}>
                <a>{product?.title}</a>
              </Link>
            </h2>
            <h2>
              <Link href="/products/[slug]" as={`/products/${product.slug}`}>
                <a>{product?.desc}</a>
              </Link>
            </h2>
            <div className="product-rate-cover">
              <div className="product-rate d-inline-block">
                <div className="product-rating" style={{ width: "90%" }}></div>
              </div>
              <span className="font-small ml-5 text-muted"> (4.0)</span>
            </div>
            <div>
              <span className="font-small text-muted">
                By{" "}
                <Link href="/vendor/1">
                  <a>NestFood</a>
                </Link>
              </span>
            </div>
            <div className="product-card-bottom">
              <div className="product-price">
                <span>${product?.productId?.buying_price}</span>
                <span className="old-price">
                  {product?.productId?.mrp && `$ ${product?.productId?.mrp}`}
                </span>
              </div>
              <div className="add-cart">
                <a className="add" onClick={() => handleCart(product)}>
                  <i className="fi-rs-shopping-cart mr-5"></i>Add{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(null, mapDispatchToProps)(Deals1);
