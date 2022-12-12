import "./users_styles.css";
import React, { useEffect } from "react";
import useStore from "../../../store";
import EditUser from "./EditUser";

const Users = () => {
  const getUsers = useStore((state) => state.getUsers);
  const users = useStore((state) => state.users);
  useEffect(() => {
    if (!users.length) {
      getUsers();
    }
  }, []);
  return (
    <div>
      <div className="d-flex align-items-center mb-5">
        <h3 className="m-0 me-3">Utilisateurs</h3>
        <i className="fa-solid fa-plus btn btn-primary p-2"></i>
      </div>

      <table class="table table-bordered">
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
                ></i>
                <i className="fa-solid fa-trash btn text-danger"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditUser />
    </div>
  );
};

export default Users;
