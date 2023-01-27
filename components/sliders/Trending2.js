import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// import { fetchByCatagory } from "../../redux/action/product";

const TrendingSlider = () => {
  const [trending, setTrending] = useState([]);

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
    const subtotl = data?.productId?.buying_price * data?.productId?.quantity;
    console.log(data);
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

  const fetchTrendingProducts = async () => {
    await axios
      .get(`http://3.6.37.16:8000/admin/getall_trending_product`)
      .then((res) => {
        console.log(res.data);
        setTrending(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  return (
    <>
      {trending.slice(0, 3).map((data, i) => (
        <article className="row align-items-center hover-up" key={data?._id}>
          <figure className="col-md-4 mb-0">
            <Link href="">
              <a>
                <img src={data.productId?.product_image} alt="" />
              </a>
            </Link>
          </figure>
          <div className="col-md-8 mb-0">
            <h6>
              <Link href="">
                <a>{data.productId?.product_name}</a>
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
              <span>&#8377;{data.productId?.buying_price} </span>
              <span className="old-price">
                &#8377;{data.productId?.mrp && ` ${data.productId?.mrp}`}
              </span>
              <a className="add sty-1" onClick={() => handleCart(data)}>
                <i className="fi-rs-shopping-cart mr-5"></i>Add
              </a>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default TrendingSlider;
