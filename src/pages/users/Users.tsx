import { useEffect, useState } from "react";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import store_user from "../../stores/store_user";
import Wrapper from "../../components/layout/Wrapper";
import { User } from "../../models/User";

const defaultUser: User = {
  _id: "",
  name: "",
  email: "",
  type: "utilisateur",
};

const Users = (): JSX.Element => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>(defaultUser);

  const getUsers = store_user((state) => state.getUsers);
  const users = store_user((state) => state.users) as User[];
  const userId = store_user((state) => state.userId) as string;

  const init = (): void => {
    setLoading(true);
    getUsers().finally(() => setLoading(false));
  };

  useEffect(() => {
    init();
  }, []);

  const checkUser = (user: User): boolean => {
    return user._id === userId;
  };

  return (
    <Wrapper>
      <div className="d-flex align-items-center justify-content-between gap-2 p-3">
        <div className="d-flex gap-2 align-items-center">
          <button
            className="button transparent"
            onClick={init}
            disabled={isLoading}
          >
            <i className="fa-solid fa-rotate-right"></i>
          </button>
          <div className="title">Utilisateurs</div>
          {isLoading && <div className="loader"></div>}
        </div>
        <div className="d-flex gap-2">
          <button
            data-bs-toggle="modal"
            data-bs-target="#addUser"
            className="secondary"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <div className="table-responsive mt-3">
        <table>
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Email</th>
              <th scope="col">Type</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .sort((a: User, b: User) => {
                if (a._id < b._id) return 1;
                if (a._id > b._id) return -1;
                return 0;
              })
              .map((user: User) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.type}</td>
                  <td>
                    <button
                      className="smallBtn me-1"
                      // disabled={true}
                      data-bs-toggle="modal"
                      data-bs-target="#editUser"
                      onClick={() => setUser(user)}
                    >
                      <i className="fa-solid fa-gear"></i>
                    </button>
                    <button
                      className="smallBtn"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteUser"
                      onClick={() => setUser(user)}
                      disabled={checkUser(user)}
                    >
                      <i className="fa-solid fa-trash text-danger"></i>
                    </button>
                  </td>
                </tr>
              ))}
            {!users.length && (
              <tr>
                <td colSpan={4} className="text-center">
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
