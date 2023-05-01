import React, {useEffect, useState} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [stocks, setStocks] = useState([]);
  const [filterBy, setFilterBy] = useState("Tech");
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [portfolio, setPortfolio] = useState([])

  useEffect( () => {
    fetch("http://localhost:3001/stocks")
    .then(r => r.json())
    .then(json => setStocks(json))
  }, []);

  const sortedStocks = [...stocks].sort( (stock1, stock2) => {
    if (sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name);
    } else {
      return stock1.price - stock2.price;
    }
  })

  const visibleStocks = sortedStocks.filter(stock => stock.type === filterBy);

  function handleStockAdd (purchasedStock) {
    const portfolioStock = portfolio.find(stock => stock.id === purchasedStock.id);
    if (!portfolioStock) {
      setPortfolio([...portfolio, purchasedStock]);
    }
  }

  function handleRemoveStock (removedStock) {
    const portfolioStock = portfolio.filter(stock => stock.id !== removedStock.id);
    setPortfolio(portfolioStock);
  }

  


  return (
    <div>
      <SearchBar setFilterBy={setFilterBy} onChangeSort={setSortBy} sortBy={sortBy} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={visibleStocks} onStockClick={handleStockAdd}/>
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onRemoveStock={handleRemoveStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
