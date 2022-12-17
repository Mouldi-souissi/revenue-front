import React, { useEffect, useState } from "react";
import useStore from "../../../store";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";

const Users = () => {
  const getUsers = useStore((state) => state.getUsers);
  const users = useStore((state) => state.users);
  const [deleteData, setDeleteData] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    if (!users.length) {
      getUsers();
    }
  }, []);
  return (
    <div>
      <div className="d-flex align-items-center mb-5">
        <h3 className="m-0 me-3">Utilisateurs</h3>
        <i
          className="fa-solid fa-plus btn btn-primary p-2"
          data-bs-toggle="modal"
          data-bs-target="#addUser"
        ></i>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Email</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.type}</td>
              <td>
                <i
                  className="fa-solid fa-gear btn"
                  data-bs-toggle="modal"
                  data-bs-target="#editUser"
                  onClick={() => setUser(user)}
                ></i>
                <i
                  className="fa-solid fa-trash btn text-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteUser"
                  onClick={() => setDeleteData(user)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddUser />
      <EditUser user={user} />
      <DeleteUser user={deleteData} />
    </div>
  );
};

export default Users;
