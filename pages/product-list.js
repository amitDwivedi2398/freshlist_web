import { useEffect, useState } from "react";
import SwiperCore, { Navigation, Breakpoints } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { Container, Row } from "react-bootstrap";
import { CLOSE_LOGIN_MODAL } from "../redux/constants/actionTypes";
import getviewcart from "../components/layout/Header";
SwiperCore.use([Navigation]);

const ProductLists = ({
  addToCart,
  addToCompare,
  addToWishlist,

  openQuickView,
}) => {
  const [product, setProduct] = useState([]);

  // add to cart
  const handleCart = (data) => {
    const subtotl = data.buying_price * data.quantity;
    console.log(data);
    const userId = localStorage.getItem("userId");

    axios
      .post(`http://3.6.37.16:8000/admin/add_cart`, {
        customer: userId,
        product: data._id,
        unit_price: data.buying_price,
        quantity: data.quantity,
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
  };

  // const handleCompare = (product) => {
  //   addToCompare(product);
  //   toast("Added to Compare list !");
  // };

  const handleWishlist = (data) => {
    const userId = localStorage.getItem("userId");

    axios
      .post(`http://3.6.37.16:8000/admin/addwishlist`, {
        customer: userId,
        product: data._id,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.msg == "success") {
          toast("Product Added Wishlist Successfully");
          // getviewcart();
        } else {
          toast("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      <section>
        <div className="container">
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            navigation={{
              prevEl: ".custom_prev_n",
              nextEl: ".custom_next_n",
            }}
            className="custom-class"
          >
            {product.length
              ? product.map((data, index) => {
                  return (
                    <SwiperSlide>
                      <div key={data?._id} className="product-cart-wrap mb-30">
                        <div
                          key={data?._id}
                          className="product-img-action-wrap"
                        >
                          <div className="product-img product-img-zoom">
                            <Link
                              key={data._id}
                              href={{
                                pathname: "/detailproducts",
                                query: { id: `${data?._id}` },
                              }}

                              // href={`/detailproducts/${data?._id}`}
                              // as={`/products/${data._id}`}
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
                              aria-label="Add To Wishlist"
                              className="action-btn hover-up"
                              // onClick={(e) => handleWishlist(data)}
                              onClick={() => handleWishlist(data)}
                            >
                              <i className="fi-rs-heart"></i>
                            </a>
                            {/* <a
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
                            </a> */}
                            {/* <a
                aria-label="Compare"
                className="action-btn hover-up"
                onClick={(e) => handleCompare(product)}
            >
                <i className="fi-rs-shuffle"></i>
            </a> */}
                          </div>

                          <div className="product-badges product-badges-position product-badges-mrg">
                            <span className="hot">{data.type}</span>
                            {/* <span className="new">New</span>
                            <span className="best">Best Sell</span> */}
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
                              href="/detailproducts"
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

                          <div key={data?._id} className="product-card-bottom">
                            <div className="product-price">
                              <span>${data.buying_price} </span>
                              <span className="old-price">
                                {data.mrp && `$ ${data.mrp}`}
                              </span>
                            </div>
                            <div className="add-cart">
                              <a
                                className="add"
                                // onClick={(e) => handleCart(product)}
                                onClick={() => handleCart(data)}
                              >
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
          <div className="slider-arrow slider-arrow-2 carausel-6-columns-arrow rt-arrow">
            <span className="slider-btn slider-prev slick-arrow custom_prev_n">
              <i className="fi-rs-angle-left"></i>
            </span>
            <span className="slider-btn slider-next slick-arrow custom_next_n">
              <i className="fi-rs-angle-right"></i>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductLists;
