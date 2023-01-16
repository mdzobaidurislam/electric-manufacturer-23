import React from "react";
import { Link } from "react-router-dom";

const BlogItem = ({ blog }) => {
  const { _id, title, description, image } = blog;

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p
          className="text-xl"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 150) }}
        ></p>
        <div className="card-actions justify-center">
          <Link className="text-primary text-2xl" to={`/blog/${_id}`}>
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
