import { useNavigate } from "react-router-dom";

interface AppbarProps {
  firstName: string;
}

const Appbar = ({ firstName }: AppbarProps) => {
  const navigate = useNavigate()
  return (
    <div className="shadow-md flex h-14 justify-between ml-8">
      <div className="font-bold flex flex-col p-4 text-xl justify-center">
        Payments App
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center m-3">
          Hello, {firstName}
        </div>
        <button
          className="flex flex-col justify-center mr-8 underline"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/signin")
          }}
        >
          Logout
        </button>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-8">
          <div className="flex flex-col justify-center h-full text-xl">
            {firstName === "" ? "U" : firstName[0]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
