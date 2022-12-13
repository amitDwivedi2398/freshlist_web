import React from "react";
import Link from "next/link"
import SwiperCoreOne, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCoreOne.use([Navigation, Autoplay]);

const Banner5 = () => {
    return (
        <>
            <Swiper
                spaceBetween={20}
                autoplay={true}
                navigation={{
                    prevEl: ".custom_prev_ct1",
                    nextEl: ".custom_next_ct1"
                }}
                className="custom-class"
                breakpoints={{
                    320: {
                        slidesPerView: 1
                    },
                    480: {
                        slidesPerView: 1
                    },
                    640: {
                        slidesPerView: 2
                    },
                    768: {
                        slidesPerView: 2
                    },
                    1024: {
                        slidesPerView: 3
                    },
                    1200: {
                        slidesPerView: 3
                    }
                }}
            >
               
                    <SwiperSlide >
                        <div
                            className="banner-img wow animate__animated animate__fadeInUp"
                            data-wow-delay="0"
                        >
                            <img src="/assets/imgs/banner/banner-1.png" alt="" />
                            <div className="banner-text">
                                <h4>
                                    Everyday Fresh & <br />
                                    Clean with Our
                                    <br />
                                    Products
                                </h4>
                                <Link href="/products"><a className="btn btn-xs">
                                    Shop Now <i className="fi-rs-arrow-small-right"></i>
                                </a></Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide >
                        <div
                            className="banner-img wow animate__animated animate__fadeInUp"
                            data-wow-delay="0"
                        >
                            <img src="/assets/imgs/banner/banner-2.png" alt="" />
                            <div className="banner-text">
                                <h4>
                                    Everyday Fresh & <br />
                                    Clean with Our
                                    <br />
                                    Products
                                </h4>
                                <Link href="/products"><a className="btn btn-xs">
                                    Shop Now <i className="fi-rs-arrow-small-right"></i>
                                </a></Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide >
                        <div
                            className="banner-img wow animate__animated animate__fadeInUp"
                            data-wow-delay="0"
                        >
                            <img src="/assets/imgs/banner/banner-3.png" alt="" />
                            <div className="banner-text">
                                <h4>
                                    Everyday Fresh & <br />
                                    Clean with Our
                                    <br />
                                    Products
                                </h4>
                                <Link href="/products"><a className="btn btn-xs">
                                    Shop Now <i className="fi-rs-arrow-small-right"></i>
                                </a></Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide >
                        <div
                            className="banner-img wow animate__animated animate__fadeInUp"
                            data-wow-delay="0"
                        >
                            <img src="/assets/imgs/banner/banner-1.png" alt="" />
                            <div className="banner-text">
                                <h4>
                                    Everyday Fresh & <br />
                                    Clean with Our
                                    <br />
                                    Products
                                </h4>
                                <Link href="/products"><a className="btn btn-xs">
                                    Shop Now <i className="fi-rs-arrow-small-right"></i>
                                </a></Link>
                            </div>
                        </div>
                    </SwiperSlide>
               
            </Swiper>

            <div className="slider-arrow slider-arrow-2 flex-right carausel-10-columns-arrow" id="carausel-10-columns-arrows">
                <span className="slider-btn slider-prev slick-arrow custom_prev_ct1">
                    <i className="fi-rs-arrow-small-left"></i>
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_ct1">
                    <i className="fi-rs-arrow-small-right"></i>
                </span>
            </div>
           
        </>
    );
};

export default Banner5;
