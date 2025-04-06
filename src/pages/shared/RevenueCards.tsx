import React from "react";
import { formatNumber } from "../../helpers/currency";
import IconSVG from "../../components/UI/IconSVG";
import { getIconColor } from "../../helpers/getIconColor";

type props = {
  revenue: number;
  sales: number;
  wins: number;
  spending: number;
};

const RevenueCards = ({ revenue, sales, wins, spending }: props) => {
  return (
    <div className="circles my-3">
      <div className="circle">
        <IconSVG name={"revenue"} size={28} color={getIconColor("revenue")} />
        <div className="inner-circle">
          <div className="circle-title">Recette</div>
          <div className="d-flex align-items-baseline gap-2">
            <div className="circle-value">{formatNumber(revenue)}</div>
            <div className="small">TND</div>
          </div>
        </div>
      </div>
      <div className="circle">
        <IconSVG name={"vente"} size={28} color={getIconColor("vente")} />
        <div className="inner-circle">
          <div className="circle-title">Ventes</div>
          <div className="d-flex align-items-baseline gap-2">
            <div className="circle-value">{formatNumber(sales)}</div>
            <div className="small">TND</div>
          </div>
        </div>
      </div>
      <div className="circle">
        <IconSVG name={"gain"} size={28} color={getIconColor("gain")} />
        <div className="inner-circle">
          <div className="circle-title">Gain</div>
          <div className="d-flex align-items-baseline gap-2">
            <div className="circle-value">{formatNumber(wins)}</div>
            <div className="small">TND</div>
          </div>
        </div>
      </div>
      <div className="circle">
        <IconSVG name={"dépense"} size={28} color={getIconColor("dépense")} />
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
