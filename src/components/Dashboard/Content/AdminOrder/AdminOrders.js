import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import auth from "../../../Firebase/Firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import SpinnerLoading from "../../../Share/SpinnerLoading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { env } from "../../../../env";

const AdminOrders = () => {
  const [user, loading] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  console.log(user);
  useEffect(() => {
    const getInventory = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      };
      const url = `${env.baseUrl}/api/admin-order`;
      try {
        const { data } = await axios.get(url, config);
        if (data.success) {
          setOrders(data.result);
        }
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          toast.error(error.response.data.msg);
          signOut(auth);
          localStorage.removeItem("token");
        }
      }
    };
    getInventory();
  }, [orders]);
  const navigate = useNavigate();

  // delete order
  const handleOrderDelete = async (id) => {
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
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          };
          const { data } = await axios.delete(
            `https://electric-manufacturer-server.herokuapp.com/api/admin-order/${id}`,
            config
          );

          if (data.success) {
            const remaining = orders.filter((item) => item._id !== id);
            setOrders(remaining);
            Swal.fire("Deleted!", data.msg, "success");
          }
        } catch (error) {
          if (error.response.status === 401 || error.response.status === 403) {
            toast(error.response.data.msg);
            signOut(auth);
            navigate("/login");
          }
        }
      }
    });
  };

  // handleApprovedOrder
  const handleApprovedOrder = async (item) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      };
      const { data } = await axios.put(
        `https://electric-manufacturer-server.herokuapp.com/api/admin-order-approved`,
        { id: item._id },
        config
      );

      if (data.success) {
        toast.success(data.msg);
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        toast(error.response.data.msg);
        signOut(auth);
        navigate("/login");
      }
    }
  };
  if (loading) {
    return <SpinnerLoading />;
  }
  return (
    <div>
      <h1>All Orders {orders.length}</h1>
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Order quantity</th>
                <th>Total Price</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Payment method</th>
                <th>Payment status</th>
                <th>Deliverd</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>

                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={item.image} alt={item.title} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.name}</div>
                          <div className="text-sm opacity-50">
                            {item.userEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.order_quantity}</td>
                    <td>
                      ${parseInt(item.price) * parseInt(item.order_quantity)}
                    </td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.payment ? "Stripe" : "Null"}</td>
                    <td>
                      {item.payment_status ? (
                        <>
                          <div>
                            <div className="badge badge-primary badge-outline">
                              Paid
                            </div>
                          </div>
                          <div>
                            <p>TransactionId</p>
                            <p className="badge badge-error  badge-outline p-4">
                              {item.transactionId}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="badge badge-warning badge-outline">
                            Un-Paid
                          </div>
                        </>
                      )}
                    </td>
                    <td>
                      <div>
                        {item.payment_status && item.deliverd !== "shipped " ? (
                          <>
                            <div className="badge badge-accent badge-outline">
                              {item.deliverd}
                            </div>
                            <button
                              onClick={() => handleApprovedOrder(item)}
                              className=" btn badge btn-xs badge-info badge-outline"
                            >
                              Approved
                            </button>
                          </>
                        ) : (
                          <>
                            {" "}
                            <div className="badge badge-warning badge-outline">
                              {item.deliverd}
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                    <th>
                      {item.payment_status && item.deliverd !== "pending" ? (
                        <div className="badge badge-primary badge-outline">
                          Order deliverd a Completed
                        </div>
                      ) : item.payment_status &&
                        item.deliverd !== "shipped " ? (
                        <div className="badge badge-warning badge-outline">
                          Order not a deliverd.
                        </div>
                      ) : (
                        <button
                          className="btn btn-error btn-xs"
                          onClick={() => handleOrderDelete(item._id)}
                        >
                          Cancel Order
                        </button>
                      )}
                    </th>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan="9">
                    <h2 className=" text-2xl">NO My Orders</h2>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
