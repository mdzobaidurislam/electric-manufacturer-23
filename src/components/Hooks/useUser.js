import axios from "axios";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../Firebase/Firebase.init";
import { env } from "../../env";

const useUser = (user) => {
  const [localUser, setlocalUser] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  console.log(user);
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
            `${env.baseUrl}/api/user/${email}`,
            config
          );
          console.log(data);
          if (data.success) {
            setlocalUser(data.user);
            setUserLoading(false);
          } else {
            signOut(auth);
            localStorage.removeItem("token");
            navigate("/login");
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

  return { localUser: localUser, userLoading: userLoading };
};

export default useUser;
