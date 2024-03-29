import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import { useState, useEffect } from "react";
import axios from "axios";

const SingleProduct = ({
  // product,
  addToCart,
  addToCompare,
  addToWishlist,
  openQuickView,
}) => {
  const [product, setproduct] = useState([]);

  const handleCart = (product) => {
    addToCart(product);
    toast("Product added to Cart !");
  };

  const handleCompare = (product) => {
    addToCompare(product);
    toast("Added to Compare list !");
  };

  const handleWishlist = (product) => {
    addToWishlist(product);
    toast("Added to Wishlist !");
  };

  const getAllProduct = () => {
    axios
      .get(`http://3.6.37.16:8000/admin/product_list`)
      .then((res) => {
        console.log(res.data.data);
        setproduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <div className="product-cart-wrap mb-30">
        {product.length
          ? product.map((data, index) => {
              return (
                <>
                  <div className="product-img-action-wrap">
                    <div className="product-action-1">
                      <a
                        aria-label="Quick view"
                        className="action-btn hover-up"
                        data-bs-toggle="modal"
                        onClick={(e) => openQuickView(data)}
                      >
                        <i className="fi-rs-eye"></i>
                      </a>
                      <a
                        aria-label="Add To Wishlist"
                        className="action-btn hover-up"
                        onClick={(e) => handleWishlist(data)}
                      >
                        <i className="fi-rs-heart"></i>
                      </a>
                      {/* <a
                                aria-label="Compare"
                                className="action-btn hover-up"
                                onClick={(e) => handleCompare(product)}
                            >
                                <i className="fi-rs-shuffle"></i>
                            </a> */}
                    </div>

                    <div className="product-badges product-badges-position product-badges-mrg">
                      {data.trending && <span className="hot">Hot</span>}
                      {data.created && <span className="new">New</span>}
                      {data.totalSell > 100 && (
                        <span className="best">Best Sell</span>
                      )}
                      {data.discount.isActive && (
                        <span className="sale">Sale</span>
                      )}
                      {data.discount.percentage >= 5 && (
                        <span className="hot">{data.discount.percentage}%</span>
                      )}
                    </div>
                  </div>

                  <div className="product-content-wrap">
                    <div className="product-category">
                      <Link href="/products">
                        <a>{product.brand}</a>
                      </Link>
                    </div>
                    <h2>
                      <Link
                        href="/products/[slug]"
                        as={`/products/${product.slug}`}
                      >
                        <a>{product.title}</a>
                      </Link>
                    </h2>

                    <div className="product-rate-cover">
                      <div className="product-rate d-inline-block">
                        <div
                          className="product-rating"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                      <span className="font-small ml-5 text-muted">
                        {" "}
                        ({product.ratingScore})
                      </span>
                    </div>

                    <div>
                      <span className="font-small text-muted">
                        By{" "}
                        <Link href="/vendor/1">
                          <a>NestFood</a>
                        </Link>
                      </span>
                    </div>
                    {/* rohit select */}
                    <div>
                      <div>
                        <select className="form-control">
                          {/* <option selected></option> */}
                          <option selected>1 K.G.</option>
                          <option>2 K.G.</option>
                          <option>3 K.G.</option>
                          <option>5 K.G.</option>
                        </select>
                      </div>
                    </div>

                    <div className="product-card-bottom">
                      <div className="product-price">
                        <span>${product.price} </span>
                        <span className="old-price">
                          {product.oldPrice && `$ ${product.oldPrice}`}
                        </span>
                      </div>
                      <div className="add-cart">
                        <a className="add" onClick={(e) => handleCart(product)}>
                          <i className="fi-rs-shopping-cart mr-5"></i> Add
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          : null}
      </div>
    </>
  );
};

const mapDispatchToProps = {
  addToCart,
  addToCompare,
  addToWishlist,
  openQuickView,
};

export default connect(null, mapDispatchToProps)(SingleProduct);
