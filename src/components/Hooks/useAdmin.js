import axios from "axios";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../Firebase/Firebase.init";
import { env } from "../../env";

const useAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getAdmin = async () => {
      const email = user?.email;
      if (email) {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        };
        try {
          const { data } = await axios.get(
            `${env.baseUrl}/api/admin/${email}`,
            config
          );
          if (data.success) {
            setAdmin(data.admin);
            setAdminLoading(false);
          }
        } catch (error) {
          if (error.response.status === 401 || error.response.status === 403) {
            toast(error.response.data.msg);
            signOut(auth);
            localStorage.removeItem("token");
            navigate("/login");
          }
        }
      }
    };
    getAdmin();
  }, [user, navigate]);

  return { admin, adminLoading };
};

export default useAdmin;
