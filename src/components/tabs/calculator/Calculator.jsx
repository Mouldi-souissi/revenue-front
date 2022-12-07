import React, { useState } from "react";
import { revenueCalculator } from "../../../helpers/revenueCalculator";

const Calculator = () => {
  const [total, setTotal] = useState(0);
  const [rate, setRate] = useState(1.1);
  const [data, setData] = useState({
    soldBet0: 0,
    soldMax0: 0,
    soldEli0: 0,
    soldForzza0: 0,
    soldBet: 0,
    soldMax: 0,
    soldEli: 0,
    soldForzza: 0,
    gain: 0,
    depenses: 0,
    caisse: 0,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: Number(e.target.value) });
  };

  const calculate = () => {
    const {
      soldBet0,
      soldMax0,
      soldEli0,
      soldForzza0,
      soldBet,
      soldMax,
      soldEli,
      soldForzza,
      gain,
      depenses,
      caisse,
    } = data;
    setTotal(
      revenueCalculator(
        soldBet0,
        soldMax0,
        soldEli0,
        soldForzza0,
        soldBet,
        soldMax,
        soldEli,
        soldForzza,
        gain,
        depenses,
        caisse,
        rate
      )
    );
  };
  return (
    <div className="">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="display-4 text-center my-5">Caisse </h1>
        <div>
          <div>Taux: {rate}</div>
          <i
            className="btn fa fa-cog"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          />
        </div>
      </div>
      <div
        className="card shadow-sm p-5 bg-light my-3"
        style={{ borderRadius: "20px" }}
      >
        <div className="row mb-3">
          <div className="col-lg-6 mb-3">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                debut bet
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="montant en TND"
                onChange={handleChange}
                name="soldBet0"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                fin bet
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="montant en TND"
                onChange={handleChange}
                name="soldBet"
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-6 mb-3">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                debut max
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="montant en TND"
                onChange={handleChange}
                name="soldMax0"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                fin max
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="montant en TND"
                onChange={handleChange}
                name="soldMax"
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-6 mb-3">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                debut pro777
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="montant en TND"
                onChange={handleChange}
                name="soldEli0"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                fin pro777
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="montant en TND"
                onChange={handleChange}
                name="soldEli"
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-6 mb-3">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                debut forzza
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="montant en TND"
                onChange={handleChange}
                name="soldForzza0"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                fin Forzza
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="montant en TND"
                onChange={handleChange}
                name="soldForzza"
              />
            </div>
          </div>
        </div>

        <div className="input-group mb-3 mt-5">
          <i className="fas fa-wallet input-group-text d-flex align-items-center" />
          <span className="input-group-text" id="basic-addon1">
            Fond caisse
          </span>

          <input
            type="number"
            className="form-control"
            placeholder="montant en TND"
            onChange={handleChange}
            name="caisse"
          />
        </div>
        <div className="input-group mb-3">
          <i className="fas fa-hand-holding-usd input-group-text d-flex align-items-center" />
          <span className="input-group-text" id="basic-addon1">
            Gain
          </span>
          <input
            type="number"
            className="form-control"
            placeholder="montant en TND"
            onChange={handleChange}
            name="gain"
          />
        </div>
        <div className="input-group mb-3">
          <i className="fas fa-external-link-alt input-group-text d-flex align-items-center" />
          <span className="input-group-text" id="basic-addon1">
            Depenses
          </span>
          <input
            type="number"
            className="form-control"
            placeholder="montant en TND"
            onChange={handleChange}
            name="depenses"
          />
        </div>
        <div className="mt-5 d-flex align-items-center justify-content-between">
          <button className="btn btn-primary btn-lg" onClick={calculate}>
            Calculate
          </button>
          <h4>{total} Total</h4>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
