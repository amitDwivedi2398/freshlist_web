import Link from "next/link";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const BlogSidebar = () => {
  const [category, setcategory] = useState([]);

  const getAllCategory = () => {
    axios
      .get(`http://3.6.37.16:8000/admin/getallcategory`)
      .then((res) => {
        console.log(res.data.data);
        setcategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <>
      <div className="widget-area">
        <div className="sidebar-widget-2 widget_search mb-50">
          <div className="search-form">
            <form action="#">
              <input type="text" placeholder="Search…" />
              <button type="submit">
                <i className="fi-rs-search"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="sidebar-widget widget-category-2 mb-50">
          <h5 className="section-title style-1 mb-30">Category</h5>
          <ul>
            {category !== ""
              ? category?.map((data) => (
                  <li>
                    <Link href="/products">
                      <a>
                        {" "}
                        <img
                          src={data?.image}
                          className=" imagetext"
                          style={{ width: "35px" }}
                          alt=""
                        />
                        {data?.category_name}
                      </a>
                    </Link>
                    <span className="count">30</span>
                  </li>
                ))
              : null}
          </ul>
        </div>

        <div className="sidebar-widget product-sidebar mb-50 p-30 bg-grey border-radius-10">
          <h5 className="section-title style-1 mb-30">Trending Now</h5>
          <div className="single-post clearfix">
            <div className="image">
              <img src="/assets/imgs/shop/thumbnail-3.jpg" alt="#" />
            </div>
            <div className="content pt-10">
              <h5>
                <Link href="/shop-product-detail">
                  <a>Chen Cardigan</a>
                </Link>
              </h5>
              <p className="price mb-0 mt-5">$99.50</p>
              <div className="product-rate">
                <div className="product-rating" style={{ width: "90%" }}></div>
              </div>
            </div>
          </div>
          <div className="single-post clearfix">
            <div className="image">
              <img src="/assets/imgs/shop/thumbnail-4.jpg" alt="#" />
            </div>
            <div className="content pt-10">
              <h6>
                <Link href="/products">
                  <a>Chen Sweater</a>
                </Link>
              </h6>
              <p className="price mb-0 mt-5">$89.50</p>
              <div className="product-rate">
                <div className="product-rating" style={{ width: "80%" }}></div>
              </div>
            </div>
          </div>
          <div className="single-post clearfix">
            <div className="image">
              <img src="/assets/imgs/shop/thumbnail-5.jpg" alt="#" />
            </div>
            <div className="content pt-10">
              <h6>
                <Link href="/products">
                  <a>Colorful Jacket</a>
                </Link>
              </h6>
              <p className="price mb-0 mt-5">$25</p>
              <div className="product-rate">
                <div className="product-rating" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>
          <div className="single-post clearfix">
            <div className="image">
              <img src="/assets/imgs/shop/thumbnail-6.jpg" alt="#" />
            </div>
            <div className="content pt-10">
              <h6>
                <Link href="/products">
                  <a>Lorem, ipsum</a>
                </Link>
              </h6>
              <p className="price mb-0 mt-5">$25</p>
              <div className="product-rate">
                <div className="product-rating" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="sidebar-widget widget_instagram mb-50">
                    <h5 className="section-title style-1 mb-30">Gallery</h5>
                    <div className="instagram-gellay">
                        <ul className="insta-feed">
                            <li>
                                <Link href="#"><a><img className="border-radius-5" src="/assets/imgs/shop/thumbnail-1.jpg" alt="" /></a></Link>
                            </li>
                            <li>
                                <Link href="#"><a><img className="border-radius-5" src="/assets/imgs/shop/thumbnail-2.jpg" alt="" /></a></Link>
                            </li>
                            <li>
                                <Link href="#"><a><img className="border-radius-5" src="/assets/imgs/shop/thumbnail-3.jpg" alt="" /></a></Link>
                            </li>
                            <li>
                                <Link href="#"><a><img className="border-radius-5" src="/assets/imgs/shop/thumbnail-4.jpg" alt="" /></a></Link>
                            </li>
                            <li>
                                <Link href="#"><a><img className="border-radius-5" src="/assets/imgs/shop/thumbnail-5.jpg" alt="" /></a></Link>
                            </li>
                            <li>
                                <Link href="#"><a><img className="border-radius-5" src="/assets/imgs/shop/thumbnail-6.jpg" alt="" /></a></Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="sidebar-widget widget-tags mb-50 pb-10">
                    <h5 className="section-title style-1 mb-30">Popular Tags</h5>
                    <ul className="tags-list">
                        <li className="hover-up">
                            <Link href="/blog-category-grid"><a><i className="fi-rs-cross mr-10"></i>Cabbage</a></Link>
                        </li>
                        <li className="hover-up">
                            <Link href="/blog-category-grid"><a><i className="fi-rs-cross mr-10"></i>Broccoli</a></Link>
                        </li>
                        <li className="hover-up">
                            <Link href="/blog-category-grid"><a><i className="fi-rs-cross mr-10"></i>Smoothie</a></Link>
                        </li>
                        <li className="hover-up">
                            <Link href="/blog-category-grid"><a><i className="fi-rs-cross mr-10"></i>Fruit</a></Link>
                        </li>
                        <li className="hover-up mr-0">
                            <Link href="/blog-category-grid"><a><i className="fi-rs-cross mr-10"></i>Salad</a></Link>
                        </li>
                        <li className="hover-up mr-0">
                            <Link href="/blog-category-grid"><a><i className="fi-rs-cross mr-10"></i>Appetizer</a></Link>
                        </li>
                    </ul>
                </div> */}
        <div className="banner-img wow fadeIn mb-50 animated d-lg-block d-none">
          <img src="/assets/imgs/banner/banner-11.png" alt="" />
          <div className="banner-text">
            <span>Oganic</span>
            <h4>
              Save 17% <br />
              on <span className="text-brand">Oganic</span>
              <br />
              Juice
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSidebar;
