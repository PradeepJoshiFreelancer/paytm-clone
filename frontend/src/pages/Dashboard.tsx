import { useNavigate } from "react-router-dom";
import Appbar from "../components/dashboard/Appbar";
import Balance from "../components/dashboard/Balance";
import Users from "../components/dashboard/Users";
import { useEffect, useState } from "react";
import { GetCurrentUser } from "../store/axios";
import { CurrentUserResponse } from "../components/models/requestBody";
import NewAppbar from "../components/dashboard/NewApp";

const Dashboard = () => {
  const navigate = useNavigate();
  const initialValue = {
    username: "",
    firstName: "",
    lastName: "",
    balance: 0.00
}
  const [currentUser, setCurrentUser] = useState<CurrentUserResponse>(initialValue);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }
    const getCurrentUser = async () => {
      try {
        const { data, status } = await GetCurrentUser(token);

        if (status === 200 || status === 201) {
          setCurrentUser(data.user);
        } else {
          setCurrentUser(initialValue);
        }
      } catch (e) {
        setCurrentUser(initialValue);
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
