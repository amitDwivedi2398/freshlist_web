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
    // axios
    //   .get(`http://3.6.37.16:8000/admin/productby_category/${catid}`)
    //   .then((res) => {
    //     console.log(res.data.data);
    //     setsubcategory(res.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  useEffect(() => {
    getSubCategory();
  }, []);

  const router = useRouter();

  const selectCategory = (id) => {
    axios
      .get(`http://3.6.37.16:8000/admin/productby_category/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setsubcategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // updateProductCategory(category);
    // router.push({
    //   pathname: "/products",
    //   query: {
    //     cat: category,
    //   },
    // });
  };
  return (
    <>
      {/* <li onClick={(e) => selectCategory(e, "jeans")} className="dropdown"> */}

      {/* {category !== ""
          ? category?.map((data) => (
              <>
                <li key={data?._id} className="dropdown">
                  <a
                    // className="dropdown-toggle "
                    // data-toggle="dropdown"
                    type="button"
                    // aria-haspopup="true"
                    onMouseEnter={selectCategory(data?._id)}
                    // aria-expanded="false"
                  >
                    <img src={data.image} alt="" />
                    {data?.category_name}
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
          : null} */}
      <ul>
        {category !== ""
          ? category?.map((data) => (
              <li
                key={data?._id}
                onMouseEnter={() => {
                  selectCategory(data?._id);
                }}
                className="dropdown d-flex"
              >
                <img
                  src={data?.image}
                  className=" imagetext"
                  style={{ width: "35px" }}
                  alt=""
                />
                <span className=" d-flex cattitle" style={{ width: "100%" }}>
                  {data?.category_name}
                </span>
                {/* {data?.category_name} */}
                <ul className="dropdown-menu drp-menu">
                  {subcategory !== ""
                    ? subcategory?.map((data) => (
                        <li onClick={() => selectCategory(data?._id)}>
                          <a>
                            <img
                              src={data?.image}
                              alt=""
                              style={{ width: "25px" }}
                            />
                            {data?.subcategory_name}
                          </a>
                        </li>
                      ))
                    : null}
                  {/* <li onClick={(e) => selectCategory(e, "shoe")}>
                      <a>
                        <img
                          src="/assets/imgs/theme/icons/category-2.svg"
                          alt=""
                        />
                        Clothing
                      </a>
                    </li> */}
                  {/* <li>
                      <a
                        onClick={() => {
                          console.log("eeee");
                        }}
                        href="#"
                      >
                        {" "}
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
                    </li> */}
                </ul>
              </li>
            ))
          : null}
        {/* <li className="dropdown">
            <img
              onMouseEnter={() => console.log("eeeeeeeeeeeeeeeeeee")}
              src="/assets/imgs/theme/icons/category-2.svg"
              className="mx-2"
              style={{ width: "35px" }}
              alt=""
            />
            hello
            <ul className="dropdown-menu drp-menu">
              <li onClick={(e) => selectCategory(e, "shoe")}>
                <a>
                  <img src="/assets/imgs/theme/icons/category-2.svg" alt="" />
                  Clothing
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    console.log("eeee");
                  }}
                  href="#"
                >
                  {" "}
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
            </ul>
          </li> */}
      </ul>
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
    </>
  );
};

export default connect(null, { updateProductCategory })(CategoryProduct2);
