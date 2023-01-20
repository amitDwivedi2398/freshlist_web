import Link from "next/link";
import useClickOutside from "../../util/outsideClick";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const MobileMenu = ({ isToggled, toggleClick }) => {
  const [category, setcategory] = useState([]);
  const [subcategory, setsubcategory] = useState([]);

  const [isActive, setIsActive] = useState({
    status: false,
    key: "",
  });

  const handleToggle = (key) => {
    if (isActive.key === key) {
      setIsActive({
        status: false,
      });
    } else {
      setIsActive({
        status: true,
        key,
      });
    }
  };

  let domNode = useClickOutside(() => {
    setIsActive({
      status: false,
    });
  });

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
      <div
        className={
          isToggled
            ? "mobile-header-active mobile-header-wrapper-style sidebar-visible"
            : "mobile-header-active mobile-header-wrapper-style"
        }
      >
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-top">
            <div className="mobile-header-logo">
              <Link href="/">
                <a>
                  <img src="/assets/imgs/theme/logo.png" alt="logo" />
                </a>
              </Link>
            </div>
            <div className="mobile-menu-close close-style-wrap close-style-position-inherit">
              <button
                className="close-style search-close"
                onClick={toggleClick}
              >
                <i className="icon-top"></i>
                <i className="icon-bottom"></i>
              </button>
            </div>
          </div>
          <div className="mobile-header-content-area">
            <div className="mobile-search search-style-3 mobile-header-border">
              <form action="#">
                <input type="text" placeholder="Search for items…" />
                <button type="submit">
                  <i className="fi-rs-search"></i>
                </button>
              </form>
            </div>
            <div className="mobile-menu-wrap mobile-header-border">
              <div className="main-categori-wrap mobile-header-border">
                <Link href="#">
                  <a className="categori-button-active-2">
                    <span className="fi-rs-apps"></span> Browse Categories
                  </a>
                </Link>
                <div className="categori-dropdown-wrap categori-dropdown-active-small rt-1">
                  <ul>
                    {category !== ""
                      ? category?.map((data) => (
                          <li
                            key={data?._id}
                            onMouseEnter={() => {
                              selectCategory(data?._id);
                            }}
                            className={
                              isActive.key == 9
                                ? "menu-item-has-children active"
                                : "menu-item-has-children"
                            }
                          >
                            <img
                              src={data?.image}
                              className=" imagetext"
                              style={{ width: "20px" }}
                              alt=""
                            />
                            <span
                              className="  cattitle"
                              style={{ width: "100%" }}
                            >
                              {data?.category_name}
                            </span>
                            <span
                              className="menu-expand"
                              onClick={() => handleToggle(9)}
                            >
                              <i className="fi-rs-angle-small-down"></i>
                            </span>

                            <ul
                              className={
                                isActive.key == 9 ? "dropdown cate" : "d-none"
                              }
                            >
                              {subcategory !== ""
                                ? subcategory?.map((data) => (
                                    <li
                                      onClick={() => selectCategory(data?._id)}
                                    >
                                      <img
                                        src={data?.image}
                                        alt=""
                                        style={{ width: "15px" }}
                                      />
                                      <Link>
                                        <a>{data?.subcategory_name}</a>
                                      </Link>
                                    </li>
                                  ))
                                : null}
                            </ul>
                          </li>
                        ))
                      : null}
                  </ul>
                </div>
              </div>

              <nav>
                <ul className="mobile-menu" ref={domNode}>
                  <li>
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop-grid-right">
                      <a>shop</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/vendors-list">
                      <a>Brands</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-category-fullwidth">
                      <a>Blog</a>
                    </Link>
                  </li>
                  <li
                    className={
                      isActive.key == 6
                        ? "menu-item-has-children active"
                        : "menu-item-has-children"
                    }
                  >
                    <span
                      className="menu-expand"
                      onClick={() => handleToggle(6)}
                    >
                      <i className="fi-rs-angle-small-down"></i>
                    </span>
                    <Link href="#">
                      <a>Language</a>
                    </Link>
                    <ul className={isActive.key == 6 ? "dropdown" : "d-none"}>
                      <li>
                        <Link href="#">
                          <a>English</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <a>French</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <a>German</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <a>Spanish</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="mobile-header-info-wrap mobile-header-border">
              <div className="single-mobile-header-info mt-30">
                <Link href="/page-contact">
                  <a> Our location </a>
                </Link>
              </div>
              <div className="single-mobile-header-info">
                <Link href="/page-login-register">
                  <a>Log In / Sign Up </a>
                </Link>
              </div>
              <div className="single-mobile-header-info">
                <Link href="#">
                  <a>(+01) - 2345 - 6789 </a>
                </Link>
              </div>
            </div>
            <div className="mobile-social-icon">
              <h5 className="mb-15 text-grey-4">Follow Us</h5>
              <Link href="#">
                <a>
                  <img
                    src="/assets/imgs/theme/icons/icon-facebook.svg"
                    alt=""
                  />
                </a>
              </Link>
              <Link href="#">
                <a>
                  <img src="/assets/imgs/theme/icons/icon-twitter.svg" alt="" />
                </a>
              </Link>
              <Link href="#">
                <a>
                  <img
                    src="/assets/imgs/theme/icons/icon-instagram.svg"
                    alt=""
                  />
                </a>
              </Link>
              <Link href="#">
                <a>
                  <img
                    src="/assets/imgs/theme/icons/icon-pinterest.svg"
                    alt=""
                  />
                </a>
              </Link>
              <Link href="#">
                <a>
                  <img src="/assets/imgs/theme/icons/icon-youtube.svg" alt="" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
