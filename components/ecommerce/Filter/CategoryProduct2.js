import axios from "axios";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { updateProductCategory } from "../../../redux/action/productFiltersAction";
import { useState, useEffect } from "react";

const CategoryProduct2 = ({ updateProductCategory }) => {
  const [category, setcategory] = useState([]);
  const [subcategory, setsubcategory] = useState([]);

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

  // subcategory
  const getSubCategory = () => {
    axios
      .get(
        `http://3.6.37.16:8000/admin/productby_category/6391c600e7cf9ef22a943a56`
      )
      .then((res) => {
        console.log(res.data.data);
        setsubcategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSubCategory();
  }, []);

  const router = useRouter();

  // const removeSearchTerm = () => {
  //     router.push({
  //         pathname: "/products",
  //     });
  // };

  const selectCategory = (e, category) => {
    e.preventDefault();
    // removeSearchTerm();
    updateProductCategory(category);
    router.push({
      pathname: "/products",
      query: {
        cat: category,
      },
    });
  };
  return (
    <>
      <ul>
        {/* <li onClick={(e) => selectCategory(e, "jeans")} className="dropdown"> */}
        {category !== ""
          ? category?.map((data) => (
              <>
                <li
                  value={data?.title}
                  key={data?._id}
                  onClick={(e) => selectCategory(e, value)}
                  className="dropdown"
                >
                  <a
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img src={data.image} alt="" />
                    {data?.category_name}
                    {/* Milks & Dairies */}
                  </a>
                  <ul className="dropdown-menu drp-menu">
                    {subcategory !== ""
                      ? subcategory?.map((data) => (
                          <>
                            <li>
                              <a href="#">
                                <img src={data.image} alt="" />
                                {data?.subcategory_name}
                              </a>
                            </li>
                          </>
                        ))
                      : null}
                  </ul>
                </li>
              </>
            ))
          : null}

        {/* <ul className="dropdown-menu drp-menu">
            <li>
              <a href="#">
                <img
                  src="/assets/imgs/theme/icons/category-1.svg"
                  alt=""
                  width={20}
                />
                Action
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src="/assets/imgs/theme/icons/category-1.svg"
                  alt=""
                  width={20}
                />
                Action
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src="/assets/imgs/theme/icons/category-1.svg"
                  alt=""
                  width={20}
                />
                Action
              </a>
            </li>
          </ul> */}
        {/* </li> */}
        {/* <li onClick={(e) => selectCategory(e, "shoe")}>
          <a>
            <img src="/assets/imgs/theme/icons/category-2.svg" alt="" />
            Clothing
          </a>
        </li>
        <li onClick={(e) => selectCategory(e, "jacket")}>
          <a>
            <img src="/assets/imgs/theme/icons/category-3.svg" alt="" />
            Pet Foods{" "}
          </a>
        </li>
        <li onClick={(e) => selectCategory(e, "trousers")}>
          <a>
            <img src="/assets/imgs/theme/icons/category-4.svg" alt="" />
            Baking material
          </a>
        </li>
        <li onClick={(e) => selectCategory(e, "accessories")}>
          <a>
            <img src="/assets/imgs/theme/icons/category-5.svg" alt="" />
            Fresh Fruit
          </a>
        </li>
        <li onClick={(e) => selectCategory(e, "jeans")}>
          <a>
            <img src="/assets/imgs/theme/icons/category-1.svg" alt="" />
            Milks & Dairies
          </a>
        </li>
        <li onClick={(e) => selectCategory(e, "shoe")}>
          <a>
            <img src="/assets/imgs/theme/icons/category-2.svg" alt="" />
            Clothing
          </a>
        </li>
        <li onClick={(e) => selectCategory(e, "jacket")}>
          <a>
            <img src="/assets/imgs/theme/icons/category-3.svg" alt="" />
            Pet Foods{" "}
          </a>
        </li>
        <li onClick={(e) => selectCategory(e, "trousers")}>
          <a>
            <img src="/assets/imgs/theme/icons/category-4.svg" alt="" />
            Baking material
          </a>
        </li>
        <li onClick={(e) => selectCategory(e, "accessories")}>
          <a>
            <img src="/assets/imgs/theme/icons/category-5.svg" alt="" />
            Fresh
          </a>
        </li> */}
      </ul>
    </>
  );
};

export default connect(null, { updateProductCategory })(CategoryProduct2);
