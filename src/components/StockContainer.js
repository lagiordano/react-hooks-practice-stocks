import React from "react";
import Stock from "./Stock";

function StockContainer({stocks, onStockClick}) {

  const renderedStocks = stocks.map( stock => <Stock stock={stock} key={stock.id} onStockClick={onStockClick} /> )


  return (
    <div>
      <h2>Stocks</h2>
      {renderedStocks}
    </div>
  );
}

export default StockContainer;
