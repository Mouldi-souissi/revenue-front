import React, { useEffect, useState } from "react";
import useStore from "../../../store";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";

const Users = () => {
  const getUsers = useStore((state) => state.getUsers);
  const shop = useStore((state) => state.shop);
  const users = useStore((state) => state.users).filter(
    (user) => user.shop === shop,
  );

  const isLoading = useStore((state) => state.isLoading);
  const [deleteData, setDeleteData] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="container">
      {isLoading && (
        <div className="d-flex align-items-center justify-content-center ">
          <div className="loader"></div>
        </div>
      )}
      <div className="tableCard d-flex align-items-center justify-content-between gap-2 p-3">
        <div className="title">Utilisateurs</div>
        <button
          data-bs-toggle="modal"
          data-bs-target="#addUser"
          className="button primary sm"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="table-responsive mt-3">
        <table>
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Email</th>
              <th scope="col">Type</th>
              <th scope="col">Shop</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .sort((a, b) => {
                if (a._id < b._id) return 1;
                if (a._id > b._id) return -1;
                return 0;
              })
              .map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.type}</td>
                  <td>{user.shop}</td>
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
      </div>

      <AddUser />
      <EditUser user={user} />
      <DeleteUser user={deleteData} />
    </div>
  );
};

export default Users;
