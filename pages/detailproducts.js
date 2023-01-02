import { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// import {
//   addToCart,
//   decreaseQuantity,
//   increaseQuantity,
// } from "../../redux/action/cart";
// import { addToCompare } from "../../redux/action/compareAction";
// import { addToWishlist } from "../../redux/action/wishlistAction";
import ProductTab from "../components/elements/ProductTab";
// import RelatedSlider from "../sliders/Related";
import { useEffect } from "react";
import ThumbSlider from "../components/sliders/Thumb";
import React from "react";
import ProductLists from "./product-list";
import Layout from "./../components/layout/Layout";
import axios from "axios";

const DetailProducts = ({
  cartItems,
  addToCompare,
  addToCart,
  addToWishlist,
  increaseQuantity,
  decreaseQuantity,
  quickView,
}) => {
  //viewoneproduct
  const [productdetail, setProductdetail] = useState({});

  const [quantity, setQuantity] = useState(1);

  // add to cart
  const handleCart = (e) => {
    axios
      .post(`http://3.6.37.16:8000/admin/add_cart`, {})
      .then((res) => {
        console.log(res.data);

        if (res.data.msg == "success") {
          toast("Product Added Successfully");
        } else {
          toast("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCompare = (product) => {
    addToCompare(product);
    toast("Added to Compare list !");
  };

  const handleWishlist = (product) => {
    addToWishlist(product);
    toast("Added to Wishlist !");
  };

  // const inCart = cartItems.find((cartItem) => cartItem.id === product.id);

  // console.log(inCart);
  const router = useRouter();
  const { id } = router.query;

  console.log(id);
  const fetchProductdetail = () => {
    // const router = useRouter();
    // const { pid } = router.query;

    axios
      .get(`http://3.6.37.16:8000/admin/viewone_product/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setProductdetail(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchProductdetail();
  }, []);

  return (
    <>
      <Layout parent="Home" sub="Product" subChild="Product Detail">
        <section className="mt-50 mb-50">
          <div className="container">
            <div className="row flex-row-reverse">
              <div className="col-xl-10 col-lg-12 m-auto">
                <div className="product-detail accordion-detail">
                  <div className="row mb-50  mt-30">
                    <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                      <div className="detail-gallery">
                        <span className="zoom-icon">
                          <i className="fi-rs-search"></i>
                        </span>

                        <div className="product-image-slider">
                          {/* <ThumbSlider /> */}
                          <img src={productdetail?.product_image} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                      <div className="detail-info  pr-30 pl-30">
                        <span className="stock-status out-stock">
                          {" "}
                          Sale Off{" "}
                        </span>
                        <h2 className="title-detail">
                          {productdetail?.product_name}
                        </h2>
                        <div className="product-detail-rating">
                          <div className="product-rate-cover text-end">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (32 reviews)
                            </span>
                          </div>
                        </div>
                        <div className="clearfix product-price-cover">
                          <div className="product-price primary-color float-left">
                            <span className="current-price  text-brand">
                              ${productdetail?.buying_price}
                            </span>
                            <span>
                              <span className="save-price font-md color3 ml-15">
                                {productdetail?.m_margin}% Off
                              </span>
                              <span className="old-price font-md ml-15">
                                {productdetail?.selling_price
                                  ? `$ ${productdetail?.selling_price}`
                                  : null}
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="short-desc mb-30">
                          <p className="font-lg">
                            {productdetail?.description}
                          </p>
                        </div>
                        <div className="attr-detail attr-color mb-15">
                          <strong className="mr-10">Color</strong>
                          {/* <ul className="list-filter color-filter">
                          {product.variations.map((clr, i) => (
                            <li key={i}>
                              <a href="#">
                                <span className={`product-color-${clr}`}></span>
                              </a>
                            </li>
                          ))}
                        </ul> */}
                        </div>
                        <div className="attr-detail attr-size">
                          <strong className="mr-10">Size</strong>
                          <ul className="list-filter size-filter font-small">
                            <li className="active">
                              <a>M</a>
                            </li>
                            <li>
                              <a>L</a>
                            </li>
                            <li>
                              <a>XL</a>
                            </li>
                            <li>
                              <a>XXL</a>
                            </li>
                          </ul>
                        </div>
                        <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                        <div className="detail-extralink">
                          <div className="detail-qty border radius">
                            {/* <a
                              onClick={(e) =>
                                !inCart
                                  ? setQuantity(quantity > 1 ? quantity - 1 : 1)
                                  : decreaseQuantity(product?.id)
                              }
                              className="qty-down"
                            >
                              <i className="fi-rs-angle-small-down"></i>
                            </a>
                            <span className="qty-val">
                              {inCart?.quantity || quantity}
                            </span>
                            <a
                              onClick={() =>
                                !inCart
                                  ? setQuantity(quantity + 1)
                                  : increaseQuantity(product.id)
                              }
                              className="qty-up"
                            >
                              <i className="fi-rs-angle-small-up"></i>
                            </a> */}
                          </div>
                          <div className="product-extra-link2">
                            <button
                              onClick={(e) => handleCart(productdetail)}
                              className="button button-add-to-cart"
                            >
                              Add to cart
                            </button>
                            <a
                              aria-label="Add To Wishlist"
                              className="action-btn hover-up"
                              onClick={(e) => handleWishlist(product)}
                            >
                              <i className="fi-rs-heart"></i>
                            </a>
                            <a
                              aria-label="Compare"
                              className="action-btn hover-up"
                              onClick={(e) => handleCompare(product)}
                            >
                              <i className="fi-rs-shuffle"></i>
                            </a>
                          </div>
                        </div>
                        <ul className="product-meta font-xs color-grey mt-50">
                          <li className="mb-5">
                            SKU:
                            <a href="#">FWM15VKT</a>
                          </li>
                          <li className="mb-5">
                            Tags:
                            <a href="#" rel="tag" className="me-1">
                              Cloth,
                            </a>
                          </li>
                          <li>
                            Availability:
                            <span className="in-stock text-success ml-5">
                              {/* {product.stock} */}
                              Items In Stock
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <ProductTab />
                  <div className="row mt-60">
                    <div className="col-12">
                      <h3 className="section-title style-1 mb-30">
                        Related products
                      </h3>
                    </div>
                    <div className="col-12">
                      <div className="row related-products position-relative">
                        <ProductLists />
                      </div>
                    </div>
                  </div>
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
});

// const mapDispatchToProps = {
//   addToCompare,
//   addToWishlist,
//   addToCart,
//   increaseQuantity,
//   decreaseQuantity,
// };

export default DetailProducts;
