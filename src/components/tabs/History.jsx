import React, { useEffect } from "react";
import useStore from "../../store";

const History = () => {
  const getHistory = useStore((store) => store.getHistory);
  const isLoading = useStore((store) => store.isLoading);
  const history = useStore((store) => store.history);

  useEffect(() => {
    getHistory;
  }, []);
  return (
    <div className="container">
      <div className="d-flex align-items-center">
        <h3 className="m-0 me-3">Historique</h3>
      </div>
      <div className="loader_wrapper">
        {isLoading && (
          <div className="d-flex align-items-center justify-content-center ">
            <div className="loader"></div>
          </div>
        )}
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Fond</th>
              <th scope="col">Cbet</th>
              <th scope="col">Mbet</th>
            </tr>
          </thead>
          <tbody>
            {history.map((row) => (
              <tr key={row._id}>
                <td>
                  {new Date(row.date).toLocaleString("fr", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td>
                  {Number(row.accountFond).toLocaleString("fr", {
                    style: "currency",
                    currency: "TND",
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td>
                  {Number(row.accountBet).toLocaleString("fr", {
                    style: "currency",
                    currency: "TND",
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td>
                  {Number(row.accountMax).toLocaleString("fr", {
                    style: "currency",
                    currency: "TND",
                    minimumFractionDigits: 0,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
