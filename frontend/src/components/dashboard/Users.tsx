import { useCallback, useEffect, useState } from "react";
import User from "./User";
import { GetUsers } from "../../store/axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigation = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const { data, status } = await GetUsers(filter, token);

        if (status === 200 || status === 201) {
          setUsers(data.users);
        } else {
          setUsers([]);
        }
      } else {
        navigation("/signin");
      }
    } catch (e) {
      setUsers([]);
    }
  }, [filter, navigation]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, filter]);

  return (
    <>
      <div className="font-bold m-8 text-lg">Users</div>
      <div className="m-4">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => {
          return <User key={user.id} user={user} />;
        })}
      </div>
    </>
  );
};
export default Users;
