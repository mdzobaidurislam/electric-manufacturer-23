import React from "react";
import "./Blog.css";
import BlogItem from "./BlogItem";
import { useQuery } from "react-query";
import SpinnerLoading from "../Share/SpinnerLoading";
import { env } from "../../env";

const Blog = () => {
  const { data: blogs, isLoading } = useQuery("blogs", () =>
    fetch(`${env.baseUrl}/api/blog`, {
      method: "GET",
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <SpinnerLoading />;
  }
  return (
    <div className="">
      <div className="blog_warp py-20">
        <div className="container mx-auto lg:px-16 px-4">
          <div className="mb-10">
            <h2 className="text-[40px] text-center text-secondary mb-5 mt-5 leading-[50px] font-bold ">
              OUR LATES POST
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 auto-cols-auto  gap-5 justify-center align-center">
            {blogs.reverse().map((item) => (
              <BlogItem key={item._id} blog={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
