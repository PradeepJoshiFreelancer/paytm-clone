import { useNavigate } from "react-router-dom";
import Appbar from "../components/dashboard/Appbar";
import Balance from "../components/dashboard/Balance";
import Users from "../components/dashboard/Users";
import { useEffect, useState } from "react";
import { GetCurrentUser } from "../store/axios";
import { CurrentUserResponse } from "../components/models/requestBody";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<CurrentUserResponse>({
    username: "",
    firstName: "",
    lastName: "",
    balance: 0.00
});

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }
    const getCurrentUser = async () => {
      const initalValue = {
        username: "",
        firstName: "",
        lastName: "",
        balance: 0.00
    }
      try {
        const { data, status } = await GetCurrentUser(token);

        if (status === 200 || status === 201) {
          setCurrentUser(data.user);
        } else {
          setCurrentUser(initalValue);
        }
      } catch (e) {
        setCurrentUser(initalValue);
      }
    };
    getCurrentUser();
  }, [navigate]);

  return (
    <>
      <Appbar firstName={currentUser.firstName}/>
      <Balance />
      <Users />
    </>
  );
};

export default Dashboard;
