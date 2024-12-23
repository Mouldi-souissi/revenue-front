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
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../../components/UI/Pagination";
import { getIconColor } from "../../helpers/getIconColor";
import IconSVG from "../../components/UI/IconSVG";

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

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    startIndex,
    endIndex,
    onPageChange,
  } = usePagination(10);

  let paginated = history.slice(startIndex, endIndex);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setLoading(true);
    getHistory(
      new Date(start).toISOString(),
      new Date(end).toISOString(),
    ).finally(() => {
      toggleVisibility(true);
      setLoading(false);
    });
  };

  return (
    <Wrapper>
      <div className="d-flex align-items-start justify-content-between gap-2 p-3">
        <div className="d-flex gap-2 align-items-center">
          <button
            className="button transparent"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <i className="fa-solid fa-rotate-right"></i>
          </button>
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
        <>
          <div className="my-3">
            {paginated.map((h) => (
              <div className="card p-4 mt-3" key={h._id}>
                <div className="row justify-content-center g-3">
                  <div className="col-lg-4">
                    <div className={`${h.isUndo ? "red" : "green"}`}>
                      {h.isUndo ? "Opération supprimée" : "Opération ajoutée"}
                    </div>

                    <div className="d-flex align-items-center gap-2 mt-2">
                      <div>Catégorie:</div>
                      <div>
                        <span>{h.moveSubType}</span>
                        <span className="ms-2">
                          <IconSVG
                            name={h.moveSubType}
                            size={20}
                            color={getIconColor(h.moveSubType)}
                          />
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
                      {h.accountsBefore.map((account, index) => (
                        <div key={index}>
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
                      {h.accountsAfter.map((account, index) => (
                        <div key={index}>
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
          <div className="d-flex align-items-center justify-content-center my-3">
            <Pagination
              totalItems={history.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default History;
