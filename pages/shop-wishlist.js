import { connect } from "react-redux";
import React from "react";
import { toast } from "react-toastify";
import Layout from "../components/layout/Layout";
import { addToCart } from "../redux/action/cart";
import { useEffect, useState } from "react";
import axios from "axios";

const Wishlist = ({}) => {
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

  const [wishlist, setWishlist] = useState([]);

  const deleteFromWish = (id) => {
    console.log(id);
    const userId = localStorage.getItem("userId");

    axios
      .delete(`http://3.6.37.16:8000/admin/remove_wishlist/${id}`)
      .then((res) => {
        console.log(res.data.msg);

        if (res.data.msg == "success") {
          toast("Product Delete Successfully");
          getAllwishlist();
        } else {
          toast("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllwishlist = () => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`http://3.6.37.16:8000/admin/all_wishlist/${userId}`)
      //   .get(`http://3.6.37.16:8000/admin/getbycart/63a1587b5d5470a96dba6891`)
      .then((res) => {
        console.log(res.data.data);
        setWishlist(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllwishlist();
  }, []);

  return (
    <>
      <Layout parent="Home" sub="Shop" subChild="Wishlist">
        <section className="mt-50 mb-50">
          <div className="container">
            <div className="row">
              <div className="col-xl-10 col-lg-12 m-auto">
                <div className="table-responsive shopping-summery">
                  {wishlist.length <= 0 && "No Products"}
                  <table
                    className={
                      wishlist.length > 0 ? "table table-wishlist" : "d-none"
                    }
                  >
                    <thead>
                      <tr className="main-heading">
                        <th
                          className="custome-checkbox start pl-30"
                          colSpan="2"
                        >
                          Product
                        </th>
                        <th scope="col">Price</th>
                        <th scope="col">Stock Status</th>
                        <th scope="col">Action</th>
                        <th scope="col" className="end">
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlist.map((data, i) => (
                        <tr className="pt-30" key={i}>
                          <td className="image product-thumbnail pt-40">
                            <img
                              src={data.product?.product_image}
                              alt=""
                              className="img-fluid"
                            />
                          </td>

                          <td className="product-des product-name">
                            <h6 className="product-name  mb-10">
                              <a>{data.product?.product_name}</a>
                            </h6>
                            <div className="product-rate-cover">
                              <div className="product-rate d-inline-block">
                                <div
                                  className="product-rating"
                                  style={{
                                    width: "90%",
                                  }}
                                ></div>
                              </div>
                              <span className="font-small ml-5 text-muted">
                                {" "}
                                (4.0)
                              </span>
                            </div>
                          </td>
                          <td className="price" data-title="Price">
                            <h3 className="text-brand">${data.product?.mrp}</h3>
                          </td>
                          {/* <td className="price" data-title="Price">
                            <h3 className="text-brand">
                              ${data.product?.buying_price}
                            </h3>
                          </td> */}
                          <td
                            className="text-center detail-info"
                            data-title="Stock"
                          >
                            {data.stock_status === 0 ? (
                              <span className="stock-status out-stock mb-0">
                                Out of stock
                              </span>
                            ) : (
                              <span className="stock-status in-stock mb-0">
                                In Stock
                              </span>
                            )}
                          </td>
                          <td className="text-right" data-title="Cart">
                            {data.stock_status === 0 ? (
                              <button className="btn btn-sm btn-secondary">
                                Contact Us
                              </button>
                            ) : (
                              <button
                                className="btn btn-sm"
                                onClick={(e) => handleCart(data)}
                              >
                                Add to cart
                              </button>
                            )}
                          </td>
                          <td className="action" data-title="Remove">
                            <a onClick={(e) => deleteFromWish(data._id)}>
                              <i className="fi-rs-trash"></i>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-right">
                    {/* <span className="clear-btn" onClick={clearWishlist}>
                      Clear All
                    </span> */}
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

// const mapStateToProps = (state) => ({
//   wishlist: state.wishlist,
// });

// const mapDispatchToProps = {
//   closeWishlistModal,
//   // deleteFromWishlist,
//   clearWishlist,
//   addToCart,
// };

export default Wishlist;
