import { useEffect, useState } from "react";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import store_user from "../../stores/store_user";
import Wrapper from "../../components/layout/Wrapper";

const defaultUser = {
  name: "",
  type: "",
};

const Users = () => {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(defaultUser);

  const getUsers = store_user((state) => state.getUsers);
  const shop = store_user((state) => state.shop);
  const users = store_user((state) => state.users);

  useEffect(() => {
    setLoading(true);
    getUsers().finally(() => setLoading(false));
  }, []);

  return (
    <Wrapper>
      <div className=" d-flex align-items-center justify-content-between gap-2 p-3">
        <div className="d-flex gap-5 align-items-center">
          <div className="title">Utilisateurs</div>
          {isLoading && <div className="loader"></div>}
        </div>

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
                      onClick={() => setUser(user)}
                    ></i>
                  </td>
                </tr>
              ))}
            {!users.length && (
              <tr>
                <td colSpan="7" className="text-center">
                  pas de donnée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/*modals*/}
      <AddUser />
      <EditUser user={user} />
      <DeleteUser user={user} />
    </Wrapper>
  );
};

export default Users;
