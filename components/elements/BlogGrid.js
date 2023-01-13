import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

const BlogGrid = ({ show, wide }) => {
  const [bloglist, setBloglist] = useState([]);

  const getAllBlog = () => {
    axios
      .get(`http://3.6.37.16:8000/admin/getall_blog`)
      .then((res) => {
        console.log(res.data.data);
        setBloglist(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllBlog();
  }, []);

  return (
    <>
      {bloglist.slice(0, show).map((data, i) => (
        <article
          className={
            wide
              ? "col-xl-3 col-lg-4 col-md-6 text-center hover-up mb-30 animated"
              : "col-xl-4 col-lg-6 col-md-6 text-center hover-up mb-30 animated"
          }
          key={i}
        >
          <div className="post-thumb">
            <Link
              href={{
                pathname: "/blog-post-right",
                query: { id: `${data?._id}` },
              }}
            >
              <a>
                <img
                  className="border-radius-15"
                  src={data?.thumbnail_img}
                  alt=""
                />
              </a>
            </Link>
            <div className="entry-meta">
              <Link href="/blog-category-grid">
                <a className="entry-meta meta-2">
                  <i className="fi-rs-heart"></i>
                </a>
              </Link>
            </div>
          </div>
          <div className="entry-content-2">
            <h6 className="mb-10 font-sm">
              <Link href="/blog-category-grid">
                <a className="entry-meta text-muted">{data?.blog_category}</a>
              </Link>
            </h6>
            <h4 className="post-title mb-15">
              <Link href="/blog-post-right">
                <a>{data?.title}</a>
              </Link>
            </h4>
            <p className="mt-10 mb-15">
              <Link href="/blog-post-right">
                <a>{data?.desc}</a>
              </Link>
            </p>
            <div className="entry-meta font-xs color-grey mt-10 pb-10">
              <div>
                <span className="post-on mr-10">{data?.date}</span>
                {/* <span className="hit-count has-dot mr-10">126k Views</span> */}
                {/* <span className="hit-count has-dot">4 mins read</span> */}
              </div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default BlogGrid;
