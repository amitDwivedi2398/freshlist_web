import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import axios from "axios";

SwiperCore.use([Navigation, Pagination]);

const Intro1 = () => {
  const [bannerone, setBannerone] = useState([]);
  const getbanner = () => {
    axios
      //   .get(`http://3.6.37.16:8000/admin/getall_banner`)
      .get(`http://3.6.37.16:8000/admin/getbannerbytype/first`)
      .then((res) => {
        console.log(res.data.data);
        setBannerone(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getbanner();
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={true}
        navigation={{
          prevEl: ".custom_prev_i1",
          nextEl: ".custom_next_i1",
        }}
        className="hero-slider-1 style-4 dot-style-1 dot-style-1-position-1"
      >
        {bannerone !== "" ? (
          <>
            {bannerone?.map((value) => (
              <SwiperSlide>
                <div
                  className="single-hero-slider single-animation-wrap"
                  style={{
                    // backgroundImage: "url(assets/imgs/slider/slider-1.png)",
                    backgroundImage: `url(${value?.banner_img})`,
                  }}
                >
                  <div className="slider-content">
                    <h1 className="display-2 mb-40" style={{ color: "white" }}>
                      {/* Don’t miss amazing */}
                      {value?.banner_title}
                      <br />
                      {/* grocery deals */}
                    </h1>
                    {/* <p className="mb-65">
                      Save up to 50% off on your first order
                    </p> */}
                    <form className="form-subcriber d-flex">
                      <input type="email" placeholder="Your emaill address" />
                      <button className="btn" type="submit">
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </>
        ) : null}
        {/* <SwiperSlide>
          <div
            className="single-hero-slider single-animation-wrap"
            style={{
              backgroundImage: "url(assets/imgs/slider/slider-1.png)",
            }}
          >
            <div className="slider-content">
              <h1 className="display-2 mb-40">
                Don’t miss amazing
                <br />
                grocery deals
              </h1>
              <p className="mb-65">Save up to 50% off on your first order</p>
              <form className="form-subcriber d-flex">
                <input type="email" placeholder="Your emaill address" />
                <button className="btn" type="submit">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="single-hero-slider single-animation-wrap"
            style={{
              backgroundImage: "url(assets/imgs/slider/slider-2.png)",
            }}
          >
            <div className="slider-content">
              <h1 className="display-2 mb-40">
                Fresh Vegetables
                <br />
                Big discount
              </h1>
              <p className="mb-65">Save up to 50% off on your first order</p>
              <form className="form-subcriber d-flex">
                <input type="email" placeholder="Your emaill address" />
                <button className="btn" type="submit">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </SwiperSlide> */}
      </Swiper>

      <div className="slider-arrow hero-slider-1-arrow">
        <span className="slider-btn slider-prev slick-arrow custom_prev_i1">
          <i className="fi-rs-angle-left"></i>
        </span>
        <span className="slider-btn slider-next slick-arrow custom_next_i1">
          <i className="fi-rs-angle-right"></i>
        </span>
      </div>
    </>
  );
};

export default Intro1;
