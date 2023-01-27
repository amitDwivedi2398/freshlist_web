import React, { useEffect, useState } from "react";
import { server } from "../../config/index";
import Deals1 from "../elements/Deals1";
import axios from "axios";

function FeatchDeals() {
  const [deals, setDeals] = useState([]);
  const [dealday, setDealday] = useState([]);

  const dealOfDay = () => {
    axios
      .get(`http://3.6.37.16:8000/admin/getDealOfDay`)
      .then((response) => {
        console.log(response.data.data);
        setDealday(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const dealsProduct = async () => {
    const request = await fetch(`${server}/static/product.json`);
    const allProducts = await request.json();
    // Discount
    const discountProduct = allProducts.filter(
      (item) => item.discount.isActive
    );

    setDeals(discountProduct);
  };

  useEffect(() => {
    dealsProduct();
    dealOfDay();
  }, []);

  // console.log(deals);

  return (
    <>
      <div className="row">
        {dealday !== "" ? (
          <>
            {dealday?.slice(0, 4).map((value, i) => (
              <div className="col-xl-3 col-lg-4 col-md-6" key={i}>
                <Deals1 product={value} />
              </div>
            ))}
          </>
        ) : null}
        {/* {deals.slice(0, 4).map((product, i) => (
          <div className="col-xl-3 col-lg-4 col-md-6" key={i}>
            <Deals1 product={product} />
          </div>
        ))} */}
      </div>
    </>
  );
}
export default FeatchDeals;
