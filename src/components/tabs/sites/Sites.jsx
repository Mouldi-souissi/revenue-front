import React, { useEffect } from "react";
import useStore from "../../../store";
import AddSite from "./AddSite";
import "./sites_styles.css";
const sites = [
  {
    _id: 1,
    name: "bet24",
    rate: 1.2,
    img: "http://bet24.top/assets/img/img.png",
  },
  {
    _id: 2,
    name: "casino",
    rate: 1.3,
    img: "https://www.maxbet.tn/remote-assets/logo-casino.png?1667462525",
  },
];

const Sites = () => {
  const sites = useStore((state) => state.sites);
  const getSites = useStore((state) => state.getSites);

  useEffect(() => {
    if (!sites.length) {
      getSites();
    }
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center mb-5">
        <h3 className="m-0 me-3">Sites</h3>
        <i
          className="fa-solid fa-plus btn btn-primary p-2"
          data-bs-toggle="modal"
          data-bs-target="#addSite"
        ></i>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Logo</th>
            <th scope="col">Nom</th>
            <th scope="col">Taux de change</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr key={site._id}>
              <td>
                <img className="img-fluid logo" src={site.img} />
              </td>
              <td>{site.name}</td>
              <td>{site.rate}</td>
              <td>
                <i
                  className="fa-solid fa-gear btn"
                  data-bs-toggle="modal"
                  data-bs-target="#editUser"
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

      <AddSite />
    </div>
  );
};

export default Sites;
