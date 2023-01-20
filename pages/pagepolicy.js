import Link from "next/link";
// import BlogSidebar from "../components/elements/BlogSidebar";
import Layout from "../components/layout/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";

function PagePolicy() {
  const [privacypolicy, setPrivacypolicy] = useState([]);

  const fetchPrivacycontent = async () => {
    await axios
      .get(
        `http://3.6.37.16:8000/admin/viewone_privacy_policy/63c922529d4d8bc01378a431`
      )
      .then((res) => {
        console.log(res.data.data);
        setPrivacypolicy(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPrivacycontent();
  }, []);

  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="Privacy Policy">
        <div className="page-content pt-50">
          <div className="container">
            <div className="row">
              <div className="col-xl-10 col-lg-12 m-auto">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="single-page pr-30 mb-lg-0 mb-sm-5">
                      <div className="single-header style-2">
                        <h2>Privacy Policy</h2>
                        <div className="entry-meta meta-1 meta-3 font-xs mt-15 mb-15">
                          <span className="post-by">
                            By <a href="#">Jonh</a>
                          </span>
                          <span className="post-on has-dot">9 April 2020</span>
                          <span className="time-reading has-dot">
                            8 mins read
                          </span>
                          <span className="hit-count has-dot">29k Views</span>
                        </div>
                      </div>
                      <div className="single-content mb-50">
                        <p>{privacypolicy.description}</p>

                        <p>
                          If you have any questions about these Terms, please{" "}
                          <Link href="/page-contact">
                            <a>contact us</a>
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-3 primary-sidebar sticky-sidebar">
                    <BlogSidebar />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default PagePolicy;
