import { useState } from "react";
import Wrapper from "../../components/layout/Wrapper";
import {
  formatDateTimeLocal,
  getStartOfday,
  getEndOfday,
  toTunisTime,
  subtract30Days,
} from "../../helpers/timeAndDate";
import store_move from "../../stores/store_move";
import { formatNumber } from "../../helpers/currency";

const handleSubtypeIcon = (subtype) => {
  const icons = {
    vente: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-arrow-up"
        color="yellowgreen"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m16 12-4-4-4 4" />
        <path d="M12 16V8" />
      </svg>
    ),
    gain: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-coins"
        color="yellow"
      >
        <circle cx="8" cy="8" r="6" />
        <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
        <path d="M7 6h1v4" />
        <path d="m16.71 13.88.7.71-2.82 2.82" />
      </svg>
    ),
    dépense: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-arrow-down"
        color="red"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8" />
        <path d="m8 12 4 4 4-4" />
      </svg>
    ),
    versement: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-plus"
        color="green"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    ),
    retrait: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-minus"
        color="orange"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
      </svg>
    ),
  };

  const icon = icons[subtype];

  if (icon) {
    return icon;
  }

  return "";
};

const History = () => {
  const today = new Date();
  const startOfDay = formatDateTimeLocal(getStartOfday(today));
  const endOfDay = formatDateTimeLocal(getEndOfday(today));
  const thirtydays = formatDateTimeLocal(subtract30Days(today));

  const [isLoading, setLoading] = useState(false);
  const [isVisible, toggleVisibility] = useState(false);
  const [start, setStart] = useState(startOfDay);
  const [end, setEnd] = useState(endOfDay);

  const getHistory = store_move((store) => store.getHistory);
  const history = store_move((store) => store.history);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    getHistory(
      new Date(start).toISOString(),
      new Date(end).toISOString()
    ).finally(() => {
      toggleVisibility(true);
      setLoading(false);
    });
  };

  return (
    <Wrapper>
      <div className="d-flex align-items-start justify-content-between gap-2 p-3">
        <div className="d-flex gap-5 align-items-center">
          <div className="title">Historique</div>
          {isLoading && <div className="loader"></div>}
        </div>
      </div>
      <div className="card p-4">
        <form
          className="row align-items-center justify-content-center"
          onSubmit={handleSubmit}
        >
          <div className="col-lg-4 mb-3">
            <label className="">Date de début</label>
            <input
              type="datetime-local"
              className="form-control"
              name="start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
              max={end}
              min={thirtydays}
            />
          </div>

          <div className="col-lg-4 mb-3">
            <label className="">Date de fin</label>
            <input
              type="datetime-local"
              className="form-control"
              name="end"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
              min={start}
              max={end}
            />
          </div>

          <div className="col-lg-4">
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="button primary"
                disabled={isLoading}
              >
                Afficher
              </button>
            </div>
          </div>
        </form>
      </div>
      {isVisible && (
        <div className="my-3">
          {history.map((h) => (
            <div className="card p-4 mt-3" key={h._id}>
              <div className="row justify-content-center g-3">
                <div className="col-lg-4">
                  <div className={`${h.isUndo ? "red" : "green"}`}>
                    {h.isUndo ? "Opération supprimée" : "Opération ajoutée"}
                  </div>

                  <div className="d-flex align-items-center gap-2 mt-2">
                    <div>Categorie:</div>
                    <div>
                      <span>{h.moveSubType}</span>
                      <span className="ms-2">
                        {handleSubtypeIcon(h.moveSubType)}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div>Montant:</div>
                    <div>
                      {formatNumber(h.amount)}
                      <span className="small ms-1">TND</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div>Utilisateur:</div>
                    <div>{h.user}</div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <div>Date:</div>
                    <div>{toTunisTime(h.date)}</div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card p-2 bg-light">
                    <div className="mb-2">Etat des comptes (avant)</div>
                    {h.accountsBefore.map((account) => (
                      <div key={account._id}>
                        <div className="d-flex align-items-center gap-2">
                          <div>{account.name}</div>
                          <div>
                            {account.deposit}
                            <span className="small ms-1">TND</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card p-2 bg-light">
                    <div className="mb-2">Etat des comptes (après)</div>
                    {h.accountsAfter.map((account) => (
                      <div key={account._id}>
                        <div className="d-flex align-items-center gap-2">
                          <div>{account.name}</div>
                          <div>
                            {account.deposit}
                            <span className="small ms-1">TND</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default History;
