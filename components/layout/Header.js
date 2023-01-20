import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CategoryProduct2 from "../ecommerce/Filter/CategoryProduct2";
// import CategoryProduct3 from "../ecommerce/Filter/CategoryProduct3";
import Search from "../ecommerce/Search";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
// import Location from "../../pages/location";
import axios from "axios";
import { useRouter } from "next/router";
import LocationDropdown from "../../pages/locationdropdown";
import { usePlacesWidget } from "react-google-autocomplete";

const Header = ({
  totalCartItems,
  totalCompareItems,
  toggleClick,
  // totalWishlistItems,
}) => {
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const handleLogout = (e) => {
    alert("Are you sure to logout");
    console.log("logout hhhhh");
    localStorage.clear();
    window.location.replace("/");
  };

  const [isToggled, setToggled] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [token, setToken] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const [customer, setCustomer] = useState({});

  const [viewcart, setViewcart] = useState("");
  const [viewwishlist, setViewwishlist] = useState("");

  const [viewcartdata, setViewcartdata] = useState([]);
  const [viewwishlistdata, setViewwishlistdata] = useState([]);

  const getviewwishlist = () => {
    const userid = localStorage.getItem("userId");
    axios
      .get(`http://3.6.37.16:8000/admin/all_wishlist/${userid}`)
      // .get(`http://3.6.37.16:8000/admin/getbycart/63a1587b5d5470a96dba6891`)
      .then((res) => {
        setViewwishlist(res.data.length);

        setViewwishlistdata(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const getviewcart = () => {
    const userid = localStorage.getItem("userId");
    axios
      .get(`http://3.6.37.16:8000/admin/getbycart/${userid}`)
      // .get(`http://3.6.37.16:8000/admin/getbycart/63a1587b5d5470a96dba6891`)
      .then((res) => {
        setViewcart(res.data.length);

        setViewcartdata(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(
    () => {
      getviewcart();
      getviewwishlist();

      let data = localStorage.getItem("token");
      setToken(data);
      document.addEventListener("scroll", () => {
        const scrollCheck = window.scrollY >= 100;
        if (scrollCheck !== scroll) {
          setScroll(scrollCheck);
        }
      });
    },
    [viewcart],
    [viewwishlist]
  );

  const handleToggle = () => setToggled(!isToggled);

  // viewone user
  const fetchCustomer = () => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    axios
      .get(`http://3.6.37.16:8000/user/getviewone/${userId}`)
      .then((response) => {
        console.log(response.data.data);
        setCustomer(response.data.data);
        setToken(response.data.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    let data = localStorage.getItem("token");
    setToken(data);
    fetchCustomer();
  }, []);

  return (
    <>
      <header className="header-area header-style-1 header-height-2">
        <div className="mobile-promotion">
          <span>
            Grand opening, <strong>up to 15%</strong> off all items. Only{" "}
            <strong>3 days</strong> left
          </span>
        </div>
        <div className="header-top header-top-ptb-1 d-none d-lg-block">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-4 col-lg-4">
                <div className="header-info">
                  <ul>
                    {/* <li>
                                            <Link href="/page-about">
                                                <a>About Us</a>
                                            </Link>
                                        </li> 
                     <li>
                                            <Link href="/page-account">
                                                <a>My Account</a>
                                            </Link>
                                        </li> */}
                    <li>
                      <Link href="/shop-wishlist">
                        <a>Wishlist</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-account">
                        <a>Order Tracking</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4">
                <div className="text-center">
                  <div id="news-flash" className="d-inline-block">
                    <ul>
                      <li>
                        Get great devices up to 50% off
                        <Link href="/shop-grid-right">
                          <a> View details</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4">
                <div className="header-info header-info-right">
                  <ul>
                    <li>
                      Need help? Call Us:{" "}
                      <strong className="text-brand"> + 1800 900</strong>
                    </li>
                    <li>
                      <Link href="/#">
                        <a className="language-dropdown-active">
                          <i className="fi-rs-world"></i>
                          English
                          <i className="fi-rs-angle-small-down"></i>
                        </a>
                      </Link>
                      <ul className="language-dropdown">
                        <li>
                          <Link href="/#">
                            <a>
                              <img
                                src="/assets/imgs/theme/flag-fr.png"
                                alt=""
                              />
                              Français
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/#">
                            <a>
                              <img
                                src="/assets/imgs/theme/flag-dt.png"
                                alt=""
                              />
                              Deutsch
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/#">
                            <a>
                              <img
                                src="/assets/imgs/theme/flag-ru.png"
                                alt=""
                              />
                              Pусский
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    {/* <li>
                                            <a
                                                className="language-dropdown-active"
                                                href="#"
                                            >
                                                USD{" "}
                                                <i className="fi-rs-angle-small-down"></i>
                                            </a>
                                            <ul className="language-dropdown">
                                                <li>
                                                    <a href="#">
                                                        <img
                                                            src="/assets/imgs/theme/flag-fr.png"
                                                            alt=""
                                                        />
                                                        INR
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <img
                                                            src="/assets/imgs/theme/flag-dt.png"
                                                            alt=""
                                                        />
                                                        MBP
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <img
                                                            src="/assets/imgs/theme/flag-ru.png"
                                                            alt=""
                                                        />
                                                        EU
                                                    </a>
                                                </li>
                                            </ul>
                                        </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
          <div className="container">
            <div className="header-wrap">
              <div className="logo logo-width-1">
                <Link href="/">
                  <a>
                    <img src="/assets/imgs/theme/logo.png" alt="logo" />
                  </a>
                </Link>
              </div>
              <div className="header-right">
                <div className="search-style-2">
                  <Search />
                </div>
                <div className="header-action-right">
                  <div className="header-action-2">
                    {/* <div className="search-location">
                      <LocationDropdown />
                    </div> */}
                    {/* <div className="header-action-icon-2">
                                            <Link href="/shop-compare">
                                                <a>
                                                    <img
                                                        className="svgInject"
                                                        alt="Evara"
                                                        src="/assets/imgs/theme/icons/icon-compare.svg"
                                                    />
                                                    <span className="pro-count blue">
                                                        {totalCompareItems}
                                                    </span>
                                                </a>
                                            </Link>
                                            <Link href="/shop-compare">
                                                <a>
                                                    <span className="lable ml-0">
                                                        Compare
                                                    </span>
                                                </a>
                                            </Link>
                                        </div> */}
                    {/* <div className="header-action-icon-2">
                      <Link href="/shop-wishlist">
                        <a>
                          <img
                            className="svgInject"
                            alt="Evara"
                            src="/assets/imgs/theme/icons/icon-heart.svg"
                          />
                          <span className="pro-count blue">{viewwishlist}</span>
                        </a>
                      </Link>
                      <Link href="/shop-wishlist">
                        <span className="lable">Wishlist</span>
                      </Link>
                    </div>
                    <div className="header-action-icon-2">
                      <Link href="/shop-cart">
                        <a className="mini-cart-icon">
                          <img
                            alt="Evara"
                            src="/assets/imgs/theme/icons/icon-cart.svg"
                          />
                          <span className="pro-count blue">{viewcart}</span>
                        </a>
                      </Link>
                      <Link href="/shop-cart">
                        <a>
                          <span className="lable">Cart</span>
                        </a>
                      </Link>
                    </div> */}

                    {/* <div className="header-action-icon-2">
                      <Link href="#">
                        <a>
                          <img
                            className="svgInject"
                            alt="Nest"
                            src="/assets/imgs/theme/icons/icon-user.svg"
                          />
                        </a>
                      </Link>
                      <Link href="#" onClick={(e) => handleClick(e)}>
                        <a>
                          <span className="lable ml-0">
                            {token ? customer?.username : null}
                          </span>
                        </a>
                      </Link>
                      <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                        <ul>
                          {!token ? (
                            <>
                              <li>
                                <Link href="/page-login">
                                  <a>
                                    <i className="fi fi-rs-user mr-10"></i>
                                    login
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/registration">
                                  <a>
                                    <i className="fi fi-rs-user mr-10"></i>
                                    Register
                                  </a>
                                </Link>
                              </li>
                            </>
                          ) : (
                            <>
                              <li>
                                <Link href="/page-account">
                                  <a>
                                    <i className="fi fi-rs-user mr-10"></i>
                                    My Account
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/page-account">
                                  <a>
                                    <i className="fi fi-rs-location-alt mr-10"></i>
                                    Order Tracking
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/page-account">
                                  <a>
                                    <i className="fi fi-rs-label mr-10"></i>
                                    My Voucher
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/shop-wishlist">
                                  <a>
                                    <i className="fi fi-rs-heart mr-10"></i>
                                    My Wishlist
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/page-account">
                                  <a>
                                    <i className="fi fi-rs-settings-sliders mr-10"></i>
                                    Setting
                                  </a>
                                </Link>
                              </li>
                              <li>
                                <button
                                  className="lgbtn"
                                  onClick={handleLogout}
                                >
                                  Sign Out
                                </button>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div> */}
                    <img
                      src="/assets/imgs/theme/mapicon.png"
                      alt="hotline"
                      className="map-img"
                    />
                    <a href="/locationdropdown">
                      <p style={{ fontSize: 14 }}>
                        5171 W Campbell Ave Kent,
                        <span>Delivery Address </span>
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            scroll
              ? "header-bottom header-bottom-bg-color sticky-bar stick"
              : "header-bottom header-bottom-bg-color sticky-bar"
          }
        >
          <div className="container">
            <div className="header-wrap header-space-between position-relative">
              <div className="logo logo-width-1 d-block d-lg-none">
                <Link href="/">
                  <a>
                    <img src="/assets/imgs/theme/logo.png" alt="logo" />
                  </a>
                </Link>
              </div>
              <div className="header-nav d-none d-lg-flex">
                <div className="main-categori-wrap d-none d-lg-block">
                  <a
                    className="categories-button-active"
                    onClick={handleToggle}
                  >
                    <span className="fi-rs-apps"></span>
                    {/* <span className="et">Browse</span> */}
                    All Categories
                    <i className="fi-rs-angle-down"></i>
                  </a>

                  <div
                    className={
                      isToggled
                        ? "categories-dropdown-wrap categories-dropdown-active-large font-heading open"
                        : "categories-dropdown-wrap categories-dropdown-active-large font-heading"
                    }
                  >
                    <div className="d-flex categori-dropdown-inner">
                      <CategoryProduct2 />
                      {/* <CategoryProduct3/> */}
                    </div>
                    {/* <div
                                            className="more_slide_open"
                                            style={{ display: "none" }}
                                        >
                                            <div className="d-flex categori-dropdown-inner">
                                                <ul>
                                                    <li>
                                                        <Link href="/products" ><a>
                                                            {" "}
                                                            <img
                                                                src="/assets/imgs/theme/icons/icon-1.svg"
                                                                alt=""
                                                            />
                                                            Milks and Dairies
                                                        </a></Link>
                                                        
                                                    </li>
                                                    <li>
                                                        <Link href="/products"><a>
                                                            {" "}
                                                            <img
                                                                src="/assets/imgs/theme/icons/icon-2.svg"
                                                                alt=""
                                                            />
                                                            Clothing & beauty
                                                        </a></Link>
                                                    </li>
                                                </ul>
                                                <ul className="end">
                                                    <li>
                                                        <Link href="/products"><a>
                                                            {" "}
                                                            <img
                                                                src="/assets/imgs/theme/icons/icon-3.svg"
                                                                alt=""
                                                            />
                                                            Wines & Drinks
                                                        </a></Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/products"><a>
                                                            {" "}
                                                            <img
                                                                src="/assets/imgs/theme/icons/icon-4.svg"
                                                                alt=""
                                                            />
                                                            Fresh Seafood
                                                        </a></Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div> */}

                    {/* <div className="more_categories">
                                            <span className="icon"></span>{" "}
                                            <span className="heading-sm-1">
                                                Show more...
                                            </span>
                                        </div> */}
                  </div>
                </div>
                <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block  font-heading">
                  <nav>
                    <ul>
                      <li className="hot-deals">
                        <img
                          src="/assets/imgs/theme/icons/icon-hot.svg"
                          alt="hot deals"
                        />
                        <Link href="/products">
                          <a>Hot Deals</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <a className="active">
                            Home
                            {/* <i className="fi-rs-angle-down"></i> */}
                          </a>
                        </Link>
                        {/* <ul className="sub-menu">
                                                    <li>
                                                        <Link href="/">
                                                            <a>Home 1</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/index-2">
                                                            <a>Home 2</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/index-3">
                                                            <a>Home 3</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/index-4">
                                                            <a>Home 4</a>
                                                        </Link>
                                                    </li>
                                                </ul> */}
                      </li>
                      {/* <li>
                                                <Link href="/page-about">
                                                    <a>About</a>
                                                </Link>
                                            </li> */}
                      <li>
                        <Link href="/shop-grid-right">
                          <a>
                            Shop
                            {/* <i className="fi-rs-angle-down"></i> */}
                          </a>
                        </Link>
                        {/* <ul className="sub-menu">
                                                    <li>
                                                        <Link href="/shop-grid-right">
                                                            <a>
                                                                Shop Grid –
                                                                Right Sidebar
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/products">
                                                            <a>
                                                                Shop Grid – Left
                                                                Sidebar
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/shop-list-right">
                                                            <a>
                                                                Shop List –
                                                                Right Sidebar
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/shop-list-left">
                                                            <a>
                                                                Shop List – Left
                                                                Sidebar
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/shop-fullwidth">
                                                            <a>Shop - Wide</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/shop-filter">
                                                            <a>Shop - Filter</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/shop-wishlist">
                                                            <a>
                                                                Shop – Wishlist
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/shop-cart">
                                                            <a>Shop – Cart</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/shop-checkout">
                                                            <a>
                                                                Shop – Checkout
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/shop-compare">
                                                            <a>
                                                                Shop – Compare
                                                            </a>
                                                        </Link>
                                                    </li>
                                                </ul> */}
                      </li>

                      <li>
                        <a href="/bdlist">Brands</a>
                        {/* <ul className="sub-menu">
                                                    <li><Link href="/vendors"><a>Vendors Grid</a></Link></li>
                                                    <li><Link href="/vendors-list"><a>Vendors List</a></Link></li>
                                                    <li><Link href="/vendor-dashboard"><a>Vendor Dashboard</a></Link></li>
                                                    <li><Link href="/vendor-guide"><a>Vendor Guide</a></Link></li>
                                                </ul> */}
                      </li>

                      {/* <li className="position-static">
                                                <Link href="/#">
                                                    <a>
                                                        Mega menu
                                                        <i className="fi-rs-angle-down"></i>
                                                    </a>
                                                </Link>
                                                <ul className="mega-menu">
                                                    <li className="sub-mega-menu sub-mega-menu-width-22">
                                                        <a
                                                            className="menu-title"
                                                            href="#"
                                                        >
                                                            Fruit & Vegetables
                                                        </a>
                                                        <ul>
                                                            <li>
                                                                <a href="#">
                                                                    Meat &
                                                                    Poultry
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Fresh
                                                                    Vegetables
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Herbs &
                                                                    Seasonings
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Cuts &
                                                                    Sprouts
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Exotic
                                                                    Fruits &
                                                                    Veggies
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Packaged
                                                                    Produce
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className="sub-mega-menu sub-mega-menu-width-22">
                                                        <a
                                                            className="menu-title"
                                                            href="#"
                                                        >
                                                            Breakfast & Dairy
                                                        </a>
                                                        <ul>
                                                            <li>
                                                                <a href="#">
                                                                    Milk &
                                                                    Flavoured
                                                                    Milk
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Butter and
                                                                    Margarine
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Eggs
                                                                    Substitutes
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Marmalades
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Sour Cream
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Cheese
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className="sub-mega-menu sub-mega-menu-width-22">
                                                        <a
                                                            className="menu-title"
                                                            href="#"
                                                        >
                                                            Meat & Seafood
                                                        </a>
                                                        <ul>
                                                            <li>
                                                                <a href="#">
                                                                    Breakfast
                                                                    Sausage
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Dinner
                                                                    Sausage
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Chicken
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Sliced Deli
                                                                    Meat
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Wild Caught
                                                                    Fillets
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#">
                                                                    Crab and
                                                                    Shellfish
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className="sub-mega-menu sub-mega-menu-width-34">
                                                        <div className="menu-banner-wrap">
                                                            <a href="#">
                                                                <img
                                                                    src="/assets/imgs/banner/banner-menu.png"
                                                                    alt="Nest"
                                                                />
                                                            </a>
                                                            <div className="menu-banner-content">
                                                                <h4>
                                                                    Hot deals
                                                                </h4>
                                                                <h3>
                                                                    Don't miss
                                                                    <br />
                                                                    Trending
                                                                </h3>
                                                                <div className="menu-banner-price">
                                                                    <span className="new-price text-success">
                                                                        Save to
                                                                        50%
                                                                    </span>
                                                                </div>
                                                                <div className="menu-banner-btn">
                                                                    <a href="#">
                                                                        Shop now
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="menu-banner-discount">
                                                                <h3>
                                                                    <span>
                                                                        25%
                                                                    </span>
                                                                    off
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li> */}
                      <li>
                        <Link href="/blog-category-grid">
                          <a>
                            Blog
                            {/* <i className="fi-rs-angle-down"></i> */}
                          </a>
                        </Link>
                        {/* <ul className="sub-menu">
                                                    <li>
                                                        <Link href="/blog-category-grid">
                                                            <a>
                                                                Blog Category
                                                                Grid
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog-category-list">
                                                            <a>
                                                                Blog Category
                                                                List
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog-category-big">
                                                            <a>
                                                                Blog Category
                                                                Big
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog-category-fullwidth">
                                                            <a>
                                                                Blog Category
                                                                Wide
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/#">
                                                            <a>
                                                                Single Post
                                                                <i className="fi-rs-angle-right"></i>
                                                            </a>
                                                        </Link>
                                                        <ul className="level-menu level-menu-modify">
                                                            <li>
                                                                <Link href="/blog-post-left">
                                                                    <a>
                                                                        Left
                                                                        Sidebar
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/blog-post-right">
                                                                    <a>
                                                                        Right
                                                                        Sidebar
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/blog-post-fullwidth">
                                                                    <a>
                                                                        No
                                                                        Sidebar
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul> */}
                      </li>

                      {/* <li>
                                                <Link href="/#">
                                                    <a>
                                                        Pages
                                                        <i className="fi-rs-angle-down"></i>
                                                    </a>
                                                </Link>
                                                <ul className="sub-menu">
                                                    <li>
                                                        <Link href="/page-about">
                                                            <a>About Us</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/page-contact">
                                                            <a>Contact</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/page-account">
                                                            <a>My Account</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/page-login-register">
                                                            <a>
                                                                login/register
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/page-purchase-guide">
                                                            <a>
                                                                Purchase Guide
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/page-privacy-policy">
                                                            <a>
                                                                Privacy Policy
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/page-terms">
                                                            <a>
                                                                Terms of Service
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/page-404">
                                                            <a>404 Page</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li> */}
                      {/* <li>
                                                <Link href="/page-contact">
                                                    <a>Contact</a>
                                                </Link>
                                            </li> */}
                    </ul>
                  </nav>
                </div>
              </div>

              <div className="hotline d-none d-lg-flex">
                <div className="header-action-right">
                  <div className="header-action-2">
                    {/* <div className="header-action-icon-2">
                      <Link href="/shop-wishlist">
                        <a>
                          <img
                            className="svgInjec"
                            alt="Evara"
                            src="/assets/imgs/theme/icons/icon-heart.svg"
                          />
                          <span className="pro-count blue">
                            {viewwishlist.length !== 0 ? (
                              <>{viewwishlist}</>
                            ) : (
                              <>0</>
                            )}
                          </span>
                        </a>
                      </Link>
                      <Link href="/shop-wishlist">
                        <span className="lable">Wishlist</span>
                      </Link>
                    </div> */}
                    {/* <div className="header-action-icon-2">
                      <Link href="/shop-cart">
                        <a className="mini-cart-icon">
                          <img
                            alt="Evara"
                            src="/assets/imgs/theme/icons/icon-cart.svg"
                          />
                          <span className="pro-count blue">{viewcart}</span>
                        </a>
                      </Link>
                      <Link href="/shop-cart">
                        <a>
                          <span className="lable ">Cart</span>
                        </a>
                      </Link>
                    </div> */}
                  </div>
                </div>
                {/* here */}

                {/* <div className=" mx-3 header-action-icon-2">
                  <Link href="#">
                    <a>
                      <img
                        className="svgInject"
                        alt="Nest"
                        src="/assets/imgs/theme/icons/icon-user.svg"
                      />
                    </a>
                  </Link>
                  <Link href="#" onClick={(e) => handleClick(e)}>
                    <a>
                      <span className="lable ml-0">
                        {token ? customer?.username : null}
                      </span>
                    </a>
                  </Link>
                  <div className="  mx-3 cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                    <ul>
                      {!token ? (
                        <>
                          <li>
                            <Link href="/page-login">
                              <a>
                                <i className="fi fi-rs-user mr-10"></i>
                                login
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/registration">
                              <a>
                                <i className="fi fi-rs-user mr-10"></i>
                                Register
                              </a>
                            </Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link href="/page-account">
                              <a>
                                <i className="fi fi-rs-user mr-10"></i>
                                My Account
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/page-account">
                              <a>
                                <i className="fi fi-rs-location-alt mr-10"></i>
                                Order Tracking
                              </a>
                            </Link>
                          </li>
                          
                          <li>
                            <Link href="/shop-wishlist">
                              <a>
                                <i className="fi fi-rs-heart mr-10"></i>
                                My Wishlist
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/page-account">
                              <a>
                                <i className="fi fi-rs-settings-sliders mr-10"></i>
                                Setting
                              </a>
                            </Link>
                          </li>
                          <li>
                            <button className="lgbtn" onClick={handleLogout}>
                              Sign Out
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div> */}
              </div>
              <div className="header-action-right">
                <div className="header-action-2">
                  {/* <div className="search-location">
                      <LocationDropdown />
                    </div> */}
                  {/* <div className="header-action-icon-2">
                                            <Link href="/shop-compare">
                                                <a>
                                                    <img
                                                        className="svgInject"
                                                        alt="Evara"
                                                        src="/assets/imgs/theme/icons/icon-compare.svg"
                                                    />
                                                    <span className="pro-count blue">
                                                        {totalCompareItems}
                                                    </span>
                                                </a>
                                            </Link>
                                            <Link href="/shop-compare">
                                                <a>
                                                    <span className="lable ml-0">
                                                        Compare
                                                    </span>
                                                </a>
                                            </Link>
                                        </div> */}
                  <div className="header-action-icon-2">
                    <Link href="/shop-wishlist">
                      <a>
                        <img
                          className="svgInject"
                          alt="Evara"
                          src="/assets/imgs/theme/icons/icon-heart.svg"
                        />
                        <span className="pro-count blue">{viewwishlist}</span>
                      </a>
                    </Link>
                    <Link href="/shop-wishlist">
                      <span className="lable">Wishlist</span>
                    </Link>
                  </div>
                  <div className="header-action-icon-2">
                    <Link href="/shop-cart">
                      <a className="mini-cart-icon">
                        <img
                          alt="Evara"
                          src="/assets/imgs/theme/icons/icon-cart.svg"
                        />
                        <span className="pro-count blue">{viewcart}</span>
                      </a>
                    </Link>
                    <Link href="/shop-cart">
                      <a>
                        <span className="lable">Cart</span>
                      </a>
                    </Link>
                  </div>

                  <div className="header-action-icon-2">
                    <Link href="#">
                      <a>
                        <img
                          className="svgInject"
                          alt="Nest"
                          src="/assets/imgs/theme/icons/icon-user.svg"
                        />
                      </a>
                    </Link>
                    <Link href="#" onClick={(e) => handleClick(e)}>
                      <a>
                        <span className="lable ml-0">
                          {token ? customer?.username : null}
                        </span>
                      </a>
                    </Link>
                    <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                      <ul>
                        {!token ? (
                          <>
                            <li>
                              <Link href="/page-login">
                                <a>
                                  <i className="fi fi-rs-user mr-10"></i>
                                  login
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/registration">
                                <a>
                                  <i className="fi fi-rs-user mr-10"></i>
                                  Register
                                </a>
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <Link href="/page-account">
                                <a>
                                  <i className="fi fi-rs-user mr-10"></i>
                                  My Account
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/page-account">
                                <a>
                                  <i className="fi fi-rs-location-alt mr-10"></i>
                                  Order Tracking
                                </a>
                              </Link>
                            </li>
                            {/* <li>
                              <Link href="/page-account">
                                <a>
                                  <i className="fi fi-rs-label mr-10"></i>
                                  My Voucher
                                </a>
                              </Link>
                            </li> */}
                            <li>
                              <Link href="/shop-wishlist">
                                <a>
                                  <i className="fi fi-rs-heart mr-10"></i>
                                  My Wishlist
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/page-account">
                                <a>
                                  <i className="fi fi-rs-settings-sliders mr-10"></i>
                                  Setting
                                </a>
                              </Link>
                            </li>
                            <li>
                              <button className="lgbtn" onClick={handleLogout}>
                                Sign Out
                              </button>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                  {/* <img
                    src="/assets/imgs/theme/mapicon.png"
                    alt="hotline"
                    className="map-img"
                  /> */}
                  {/* <a href="/locationdropdown">
                    <p style={{ fontSize: 14 }}>
                      5171 W Campbell Ave Kent,
                      <span>Delivery Address </span>
                    </p>
                  </a> */}
                </div>
              </div>

              <div className="header-action-icon-2 d-block d-lg-none stt">
                <div className="burger-icon burger-icon-white">
                  <span className="burger-icon-top"></span>
                  <span className="burger-icon-mid"></span>
                  <span className="burger-icon-bottom"></span>
                </div>
              </div>

              <div className="header-action-right d-block d-lg-none">
                <div className="header-action-2">
                  {/* <div className="header-action-icon-2">
                                        <Link href="/shop-wishlist">
                                            <a>
                                                <img
                                                    alt="Evara"
                                                    src="/assets/imgs/theme/icons/icon-compare.svg"
                                                />
                                                <span className="pro-count white">
                                                    {totalCompareItems}
                                                </span>
                                            </a>
                                        </Link>
                                    </div> */}
                  <div className="header-action-icon-2">
                    <Link href="/shop-wishlist">
                      <a>
                        <img
                          alt="Evara"
                          src="/assets/imgs/theme/icons/icon-heart.svg"
                        />
                        <span className="pro-count white">{viewwishlist}</span>
                      </a>
                    </Link>
                  </div>

                  {/* mobile cartlist */}

                  <div className="header-action-icon-2">
                    <Link href="/shop-cart">
                      <a className="mini-cart-icon">
                        <img
                          alt="Evara"
                          src="/assets/imgs/theme/icons/icon-cart.svg"
                        />
                        <span className="pro-count white">{viewcart}</span>
                      </a>
                    </Link>
                    {/* <div className="cart-dropdown-wrap cart-dropdown-hm2">
                      <ul>
                        <li>
                          <div className="shopping-cart-img">
                            <Link href="/shop-grid-right">
                              <a>
                                <img
                                  alt="Evara"
                                  src="/assets/imgs/shop/thumbnail-3.jpg"
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="shopping-cart-title">
                            <h4>
                              <Link href="/shop-grid-right">
                                <a>Plain Striola Shirts</a>
                              </Link>
                            </h4>
                            <h3>
                              <span>1 × </span>
                              $800.0065656565
                            </h3>
                          </div>
                          <div className="shopping-cart-delete">
                            <Link href="/#">
                              <a>
                                <i className="fi-rs-cross-small"></i>
                              </a>
                            </Link>
                          </div>
                        </li>
                        <li>
                          <div className="shopping-cart-img">
                            <Link href="/shop-grid-right">
                              <a>
                                <img
                                  alt="Evara"
                                  src="/assets/imgs/shop/thumbnail-4.jpg"
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="shopping-cart-title">
                            <h4>
                              <Link href="/shop-grid-right">
                                <a>Macbook Pro 2022</a>
                              </Link>
                            </h4>
                            <h3>
                              <span>1 × </span>
                              $3500.00
                            </h3>
                          </div>
                          <div className="shopping-cart-delete">
                            <Link href="/#">
                              <a>
                                <i className="fi-rs-cross-small"></i>
                              </a>
                            </Link>
                          </div>
                        </li>
                      </ul>
                      <div className="shopping-cart-footer">
                        <div className="shopping-cart-total">
                          <h4>
                            Total
                            <span>$383.00</span>
                          </h4>
                        </div>
                        <div className="shopping-cart-button">
                          <Link href="/shop-cart">
                            <a>View cart</a>
                          </Link>
                          <Link href="/shop-checkout">
                            <a>Checkout</a>
                          </Link>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div className="header-action-icon-2 d-block d-lg-none">
                    <div
                      className="burger-icon burger-icon-white"
                      onClick={toggleClick}
                    >
                      <span className="burger-icon-top"></span>
                      <span className="burger-icon-mid"></span>
                      <span className="burger-icon-bottom"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* modal location */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add Delivery Address
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <form>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="input-style mb-20">
                      <label>Address Title</label>
                      {/* <input ref={ref}></input> */}
                    </div>
                  </div>
                  <div className="col-md-12 mt-10 mb-20">
                    <LocationDropdown />
                  </div>
                  <div className="col-md-12">
                    <div className="input-style mb-20">
                      <label>Address</label>
                      <textarea
                        name="name"
                        placeholder="address.."
                        type="text"
                        className="wt-1"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <button className="submit submit-auto-width">
                      Save Address
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* modal location close */}
    </>
  );
};

const mapStateToProps = (state) => ({
  totalCartItems: state.cart.length,
  totalCompareItems: state.compare.items.length,
  totalWishlistItems: state.wishlist.items.length,
});

export default connect(mapStateToProps, null)(Header);

// export const getviewcart = () => {
//   const [Viewcart, setViewcart] = useState("");

//   const userid = localStorage.getItem("userId");
//   axios
//     .get(`http://3.6.37.16:8000/admin/getbycart/${userid}`)
//     // .get(`http://3.6.37.16:8000/admin/getbycart/63a1587b5d5470a96dba6891`)
//     .then((res) => {
//       setViewcart(res.data.length);
//       console.log(res.data.length);
//     })
//     .catch((err) => console.log(err));
// };
