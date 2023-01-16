import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { env } from "../../../../env";

const MangeBlog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getInventory = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = `${env.baseUrl}/api/blog`;
      try {
        const { data } = await axios.get(url, config);
        setBlogs(data);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          toast(error.response.data.msg);
        }
      }
    };
    getInventory();
  }, []);

  return (
    <div>
      <h1>{blogs.length}</h1>
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((item) => (
                <tr key={item._id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt={item.title} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>{item.title}</td>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: item.description.slice(0, 50),
                    }}
                  ></td>
                  <th>
                    <button className="btn btn-ghost btn-xs">Delete</button>
                  </th>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MangeBlog;
