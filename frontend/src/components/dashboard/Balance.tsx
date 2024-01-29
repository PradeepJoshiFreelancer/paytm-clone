import { useEffect, useState } from "react";
import { GetBalance } from "../../store/axios";

const Balance = () => {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const getBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const { data, status } = await GetBalance(token);
          if (status === 200 || status === 201) {
            setBalance(data.balance.toFixed(2));
          } else {
            setBalance(0.00);
          }
        } else {
          setBalance(0.00);
        }
      } catch (e) {
        setBalance(0);
      }
    };
    getBalance();
  }, []);
  return (
    <div className="flex ml-10 mt-6">
      <div className="font-bold text-lg">Your Balance</div>
      <div className="font-semibold text-lg ml-4">Rs {balance}</div>
    </div>
  );
};
export default Balance;
