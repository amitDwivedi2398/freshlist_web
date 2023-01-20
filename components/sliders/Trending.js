import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

// import SingleProduct2 from "./../ecommerce/SingleProduct2";

SwiperCore.use([Navigation]);

const TrendingSlider = ({
  addToCart,
  addToCompare,
  addToWishlist,
  openQuickView,
}) => {
  const [product, setProduct] = useState([]);

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
        setProduct(res.data.data);
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
      <Swiper
        spaceBetween={24}
        grid={{
          rows: 2,
        }}
        navigation={{
          prevEl: ".custom_prev_f",
          nextEl: ".custom_next_f",
        }}
        className="custom-class"
        breakpoints={{
          480: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {product.length
          ? product.map((data, index) => {
              return (
                <SwiperSlide>
                  <div className="product-cart-wrap mb-30">
                    <div className="product-img-action-wrap">
                      <div className="product-img product-img-zoom">
                        <Link
                          href="/products/[slug]"
                          as={`/products/${data.slug}`}
                        >
                          <a>
                            <img
                              className="default-img"
                              src={data.product_image}
                              alt=""
                            />
                            <img
                              className="hover-img"
                              src={data.product_image}
                              alt=""
                            />
                          </a>
                        </Link>
                      </div>
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
                        <span className="hot">Hot</span>
                        <span className="new">New</span>
                        <span className="best">Best Sell</span>
                      </div>
                    </div>
                    <div className="product-content-wrap">
                      <div className="product-category">
                        <Link href="/products">
                          <a>{data.category?.category_name}</a>
                        </Link>
                      </div>
                      <h2>
                        <Link
                          href="/products/[slug]"
                          as={`/products/${data.slug}`}
                        >
                          <a>{data.product_name}</a>
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
                          ({data.reward_points})
                        </span>
                      </div>

                      <div>
                        <span className="font-small text-muted">
                          By{" "}
                          <Link href="/vendor/1">
                            <a>{data.brand?.brand_name}</a>
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
                          <span>${data.buying_price} </span>
                          <span className="old-price">
                            {data.mrp && `$ ${data.mrp}`}
                          </span>
                        </div>
                        <div className="add-cart">
                          <a className="add" onClick={(e) => handleCart(data)}>
                            <i className="fi-rs-shopping-cart mr-5"></i> Add
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          : null}
      </Swiper>

      <div className="slider-arrow slider-arrow-2 carausel-4-columns-arrow">
        <span className="slider-btn slider-prev slick-arrow custom_prev_f">
          <i className="fi-rs-arrow-small-left"></i>
        </span>
        <span className="slider-btn slider-next slick-arrow custom_next_f">
          <i className="fi-rs-arrow-small-right"></i>
        </span>
      </div>
    </>
  );
};

export default TrendingSlider;
