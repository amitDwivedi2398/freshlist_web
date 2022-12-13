import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetchByCatagory } from "../../redux/action/product";

const BestSellerSlider = () => {
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        // With Category
        const allProducts = await fetchByCatagory("/static/product.json");

        // Best Seller
        const bestSellerProducts = allProducts.sort(function (a, b) {
            return a.totalSell > b.totalSell ? -1 : 1;
        });

        setBestSeller(bestSellerProducts);
    };

    return (
        <>
            {bestSeller.slice(0, 3).map((product, i) => (
                <article className="row align-items-center hover-up" key={i}>
                    <figure className="col-md-4 mb-0">
                        <Link href="/products/[slug]" as={`/products/${product.slug}`}>
                            <a>
                                <img src={product.images[0].img} alt="" />
                            </a>
                        </Link>
                    </figure>
                    <div className="col-md-8 mb-0">
                        <h6>
                            <Link href="/products/[slug]" as={`/products/${product.slug}`}>
                                <a>{product.title}</a>
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
                            <span>${product.price} </span>
                            <span className="old-price">{product.oldPrice && `$ ${product.oldPrice}`}</span>
                            <a className="add sty-1" >
                            <i className="fi-rs-shopping-cart mr-5"></i>Add{" "}
                            </a>
                        </div>
                    </div>
                </article>
            ))}
        </>
    );
};

export default BestSellerSlider;
