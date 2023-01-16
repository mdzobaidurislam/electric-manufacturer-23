import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SpinnerLoading from "../../../Share/SpinnerLoading";
import Swal from "sweetalert2";
import { env } from "../../../../env";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [dataLoadng, setDataLoading] = useState(false);
  useEffect(() => {
    const getDoctor = async () => {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      };
      const url = `${env.baseUrl}/api/admin-product`;
      try {
        const { data } = await axios.get(url, config);
        if (data.success) {
          setDataLoading(true);
          setProducts(data.result);
        }
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          toast(error.response.data.msg);
        }
      }
    };
    getDoctor();
  }, [products]);

  const handleProductDelete = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const config = {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          };

          const url = `${env.baseUrl}/api/admin-product/${item._id}`;
          const { data } = await axios.delete(url, config);
          if (data.success) {
            toast.success(data.msg);
          }
        } catch (error) {
          if (error.response.status === 401 || error.response.status === 403) {
            toast(error.response.data.msg);
          }
        }
      }
    });
  };

  if (!dataLoadng) {
    return <SpinnerLoading />;
  }
  return (
    <div>
      <h1>{products.length}</h1>
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.short_description}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {item.status ? (
                      <div className="badge badge-success gap-2">Active</div>
                    ) : (
                      <div className="badge badge-warning gap-2">InActive</div>
                    )}
                  </td>
                  <th>
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() => handleProductDelete(item)}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
