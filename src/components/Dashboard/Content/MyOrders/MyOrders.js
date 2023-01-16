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

const MyOrders = () => {
  const [user, loading] = useAuthState(auth);
  const [myOrders, setMyOrders] = useState([]);
  useEffect(() => {
    const getInventory = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      };
      const url = `${env.baseUrl}/api/order/${user?.email}`;
      try {
        const { data } = await axios.get(url, config);
        if (data.success) {
          setMyOrders(data.result);
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
  }, [user, myOrders]);
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
            `${env.baseUrl}/api/order/${id}/${user?.email}`,
            config
          );

          if (data.success) {
            const remaining = myOrders.filter((item) => item._id !== id);
            setMyOrders(remaining);
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

  const handlePayment = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };
  if (loading) {
    return <SpinnerLoading />;
  }
  return (
    <div>
      <h1>My Orders {myOrders.length}</h1>
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
                <th>Order Deliverd</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.length > 0 ? (
                myOrders.map((item) => (
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
                          <p>
                            TransactionId:{" "}
                            <span className="badge badge-primary badge-outline p-4">
                              {item.transactionId}
                            </span>
                          </p>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-info btn-xs btn-primary"
                            onClick={() => handlePayment(item._id)}
                          >
                            Pay Now
                          </button>
                        </>
                      )}
                    </td>
                    <td>
                      {item.deliverd !== "pending" ? (
                        <div className="badge badge-primary badge-outline">
                          {item.deliverd}
                        </div>
                      ) : (
                        <div className="badge badge-warning badge-outline">
                          {item.deliverd}
                        </div>
                      )}
                    </td>
                    <td>
                      {item.payment_status && item.deliverd !== "pending" ? (
                        <div className="badge badge-primary badge-outline">
                          Order a Completed
                        </div>
                      ) : item.payment_status &&
                        item.deliverd !== "shipped " ? (
                        <div className=" bg-info  badge badge-secondary badge-outline">
                          <span className="text-black p-2">
                            Order not a deliverd.
                          </span>
                        </div>
                      ) : (
                        <button
                          className="btn btn-error btn-xs"
                          onClick={() => handleOrderDelete(item._id)}
                        >
                          Cancel Order
                        </button>
                      )}
                    </td>
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

export default MyOrders;
