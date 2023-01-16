import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SpinnerLoading from "../Share/SpinnerLoading";
import { env } from "../../env";

const SingleBlog = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [blogItem, setBlogItem] = useState({});

  // get the inventory by id
  useEffect(() => {
    const getInventoryById = async () => {
      const url = `${env.baseUrl}/api/blog/${id}`;
      const { data } = await axios.get(url);
      setBlogItem(data);
      setLoading(true);
    };
    getInventoryById();
  }, [id, blogItem]);
  if (!loading) {
    return <SpinnerLoading />;
  }
  return (
    <div className="single_section py-20">
      <div className="container mx-auto lg:px-16 px-4">
        <div>
          <div className="single_thum">
            <img src={blogItem.image} className="text-center" alt="" />
          </div>
          <div>
            <div className="single_content">
              <h1>{blogItem.tite}</h1>

              <div className="sign_blog_des">
                <p
                  className="text-xl"
                  dangerouslySetInnerHTML={{ __html: blogItem.description }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
