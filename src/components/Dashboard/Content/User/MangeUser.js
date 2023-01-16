import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../Firebase/Firebase.init";
import SpinnerLoading from "../../../Share/SpinnerLoading";
import { env } from "../../../../env";

const MangeUser = () => {
  const [user, loading] = useAuthState(auth);
  const [dataUser, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getAllUser = async () => {
      try {
        const config = {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
        const url = `${env.baseUrl}/api/admin-alluser`;
        const { data } = await axios.get(url, config);
        setUsers(data);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          toast(error.response.data.msg);
        }
      }
    };
    getAllUser();
  }, [dataUser]);

  const handleMakeAdmin = async (item) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      };
      const { data } = await axios.put(
        `${env.baseUrl}/api/make-admin`,
        { email: item.email },
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
  // make user
  const handleMakeUser = async (item) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      };
      const { data } = await axios.put(
        `${env.baseUrl}/api/make-user`,
        { email: item.email },
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
      <h1>{dataUser.length}</h1>
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataUser.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    {user?.email !== item.email ? (
                      item.isAdmin ? (
                        <>
                          <div>
                            <div className="btn badge btn-xs bg-accent text-white badge-outline">
                              Admin
                            </div>
                            <button
                              onClick={() => handleMakeUser(item)}
                              className=" btn badge btn-xs badge-info badge-outline"
                            >
                              Make A User
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleMakeAdmin(item)}
                            className=" btn badge btn-xs badge-info badge-outline"
                          >
                            Make Admin
                          </button>
                        </>
                      )
                    ) : (
                      <div>
                        <div className="badge badge-warning badge-outline">
                          Owner
                        </div>
                      </div>
                    )}
                  </td>
                  <td>
                    {item.status ? (
                      <>
                        <div>
                          <div className="badge badge-primary badge-outline">
                            Active
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="badge badge-primary badge-outline">
                          InActive
                        </div>
                      </>
                    )}
                  </td>
                  <th>
                    <button className="btn btn-warning btn-xs">Delete</button>
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

export default MangeUser;
