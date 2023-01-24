import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { fetchByCatagory } from "../../redux/action/product";

const TrendingSlider = () => {
  const [recentlyproduct, setRecentlyproduct] = useState([]);

  //   useEffect(() => {
  //     fetchTrendingProducts();
  //   }, []);

  // const fetchProducts = async () => {

  //     const allProducts = await fetchByCatagory("/static/product.json");

  //     const trendingItem = allProducts.filter((item) => item.trending);
  //     setTrending(trendingItem);
  // };

  // add to cart
  const handleCart = (data) => {
    const subtotl = data.buying_price * data.quantity;
    console.log(data);
    const userId = localStorage.getItem("userId");

    axios
      .post(`http://3.6.37.16:8000/admin/add_cart`, {
        customer: userId,
        product: data._id,
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

  const fetchRecentlyProducts = async () => {
    await axios
      .get(`http://3.6.37.16:8000/admin/recently_add_product`)
      .then((res) => {
        console.log(res.data.data);
        setRecentlyproduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchRecentlyProducts();
  }, []);

  return (
    <>
      {recentlyproduct.slice(0, 3).map((data, i) => (
        <article className="row align-items-center hover-up" key={i}>
          <figure className="col-md-4 mb-0">
            <a>
              <img src={data.product_image} alt="" />
            </a>
          </figure>
          <div className="col-md-8 mb-0">
            <h6>
              <Link href="">
                <a>{data.product_name}</a>
              </Link>
            </h6>
            <div className="product-rate-cover">
              <div className="product-rate d-inline-block">
                <div className="product-rating" style={{ width: "90%" }}></div>
              </div>
              <span className="font-small ml-5 text-muted"> (4.0)</span>
            </div>
            <div className="slt-box">
              <select className="form-control rt-1">
                <option>1 kg</option>
                <option>2 kg</option>
                <option>3 kg</option>
                <option>4 kg</option>
              </select>
            </div>
            <div className="product-price">
              <span>&#8377;{data.buying_price} </span>
              <span className="old-price">
                &#8377;
                {data.selling_price && ` ${data.selling_price}`}
              </span>
              <a className="add sty-1" onClick={() => handleCart(data)}>
                <i className="fi-rs-shopping-cart mr-5"></i>Add{" "}
              </a>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default TrendingSlider;
