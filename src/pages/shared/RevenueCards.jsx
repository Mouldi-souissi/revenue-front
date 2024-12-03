import React from "react";
import { formatNumber } from "../../helpers/currency";

const RevenueCards = (props) => {
  const { revenue = 0, sales = 0, wins = 0, spending = 0 } = props;

  return (
    <div className="circles my-3">
      <div className="circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-shopping-bag"
          color="cyan"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>

        <div className="inner-circle">
          <div className="circle-title">Recette</div>
          <div className="d-flex align-items-baseline gap-2">
            <div className="circle-value">{formatNumber(revenue)}</div>
            <div className="small">TND</div>
          </div>
        </div>
      </div>
      <div className="circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
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
        <div className="inner-circle">
          <div className="circle-title">Ventes</div>
          <div className="d-flex align-items-baseline gap-2">
            <div className="circle-value">{formatNumber(sales)}</div>
            <div className="small">TND</div>
          </div>
        </div>
      </div>
      <div className="circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
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
        <div className="inner-circle">
          <div className="circle-title">Gain</div>
          <div className="d-flex align-items-baseline gap-2">
            <div className="circle-value">{formatNumber(wins)}</div>
            <div className="small">TND</div>
          </div>
        </div>
      </div>
      <div className="circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
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
        <div className="inner-circle">
          <div className="circle-title">Dépenses</div>
          <div className="d-flex align-items-baseline gap-2">
            <div className="circle-value">{formatNumber(spending)}</div>
            <div className="small">TND</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueCards;
