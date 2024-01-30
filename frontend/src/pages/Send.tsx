import { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TransferMoney } from "../store/axios";

const Send = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") ? searchParams.get("id") : "";
  const name = searchParams.get("name") ? searchParams.get("name") : "";
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const transferButtonHandller = useCallback(async () => {
    if (isNaN(amount)) {
      window.alert("Entered amount not valid! Please enter a valid amount");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      console.log(`Inside transfer button logic token = ${token}`);

      if (id && token) {
        console.log(`Before sending amount = ${amount}`);

        const { status } = await TransferMoney(id, amount, token);
        if (status === 200 || status === 201) {
          window.alert("Hurrey!!! Tranfer sucess!!");

          navigate("/dashboard");
          return;
        }
        window.alert("Transer unscuessfull!!!");
      } else {
        window.alert("Transer unscuessfull!!!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
    window.alert("Transer unscuessfull!!!");
    navigate("/dashboard");
  }, [amount, id, navigate]);
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name && name !== "" ? name[0].toUpperCase() : ""}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => {
                    setAmount(() => +e.target.value);
                  }}
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={transferButtonHandller}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Send;
