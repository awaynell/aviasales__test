import React, { useEffect, useState } from "react";
import logo from "./assets/Logo.png";
import "./styles/App.css";
import TicketsList from "./components/TicketsList";
import { allHandler } from "./functions/allHandler";
import { filtTick } from "./functions/filtTick";

function App() {
  let [searchId, setSearchId] = useState("");
  let [tickets, setTickets] = useState([]);
  let [stop, setStop] = useState(false);
  let [loading, setLoading] = useState(true);
  let [sortTick, setSortTick] = useState([]);
  let [sortActive, setSortActive] = useState({ lowPrice: true, faster: false });
  let [filter, setFilter] = useState({
    all: true,
    without: true,
    one: true,
    two: true,
    three: true,
  });
  let [limit, setLimit] = useState(5);

  // fetch searchID and ticketsData
  useEffect(() => {
    fetch("https://front-test.beta.aviasales.ru/search")
      .then((result) => result.json())
      .then((data) => {
        setSearchId(data.searchId);
      });
  }, []);
  useEffect(() => {
    if (searchId && !stop) {
      function getTickets() {
        fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
          .then((result) => {
            if (result.status === 500) {
              getTickets();
            } else if (result.status === 404) {
              console.log(404);
            }
            return result.json();
          })
          .then((data) => {
            if (data.stop === true) {
              setStop(true);
              setLoading(false);
            }
            setTickets([...tickets, ...data.tickets]);
          });
      }
      getTickets();
    }
  }, [searchId, tickets, stop]);

  //sort tickets by sortButton
  useEffect(() => {
    if (!loading && sortActive.lowPrice) {
      let ticket = tickets.slice(0, limit === tickets.length ? tickets.length : limit);
      filtTick(ticket, filter, sortActive, setSortTick);
    }
    if (!loading && sortActive.faster) {
      let ticket = tickets.slice(0, limit === tickets.length ? tickets.length : limit);
      filtTick(ticket, filter, sortActive, setSortTick);
    }
  }, [loading, sortActive, filter, limit]);

  let ticket = tickets.slice(0, limit === tickets.length ? tickets.length : limit);

  return (
    <div className="App">
      <div className="app-wrapper">
        <img style={{ width: 80, height: 80 }} src={logo} alt="" className="logo" />
        <div className="app-inner">
          <div className="filter">
            <h3 className="filter-title">Количество пересадок</h3>
            <div className="filter-items">
              <div className="filter-item">
                <input className="filter-all" type="checkbox" id="filter-all" onChange={() => allHandler(filter, setFilter)} checked={filter.all} />
                <label className="filter-label" htmlFor="filter-all">
                  Все
                </label>
              </div>
              <div className="filter-item">
                <input
                  className="filter-without"
                  type="checkbox"
                  id="filter-without"
                  onChange={() => setFilter({ ...filter, without: !filter.without })}
                  checked={filter.without}
                />
                <label className="filter-label" htmlFor="filter-without">
                  Без пересадок
                </label>
              </div>
              <div className="filter-item">
                <input
                  className="filter-one"
                  type="checkbox"
                  id="filter-one"
                  onChange={() => setFilter({ ...filter, one: !filter.one })}
                  checked={filter.one}
                />
                <label className="filter-label" htmlFor="filter-one">
                  1 пересадка
                </label>
              </div>
              <div className="filter-item">
                <input
                  className="filter-two"
                  type="checkbox"
                  id="filter-two"
                  onChange={() => setFilter({ ...filter, two: !filter.two })}
                  checked={filter.two}
                />
                <label className="filter-label" htmlFor="filter-two">
                  2 пересадки
                </label>
              </div>
              <div className="filter-item">
                <input
                  className="filter-three"
                  type="checkbox"
                  id="filter-three"
                  onChange={() => setFilter({ ...filter, three: !filter.three })}
                  checked={filter.three}
                />
                <label className="filter-label" htmlFor="filter-three">
                  3 пересадки
                </label>
              </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="sort">
              <div onClick={() => setSortActive({ lowPrice: true, faster: false })} className={`sortByLow ${sortActive.lowPrice ? "activeL" : ""}`}>
                Самый дешевый
              </div>
              <div onClick={() => setSortActive({ lowPrice: false, faster: true })} className={`sortByFast ${sortActive.faster ? "activeR" : ""}`}>
                Самый быстрый
              </div>
            </div>
            {loading === true ? (
              <div className="loader">
                <div class="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <TicketsList obj={sortTick} filter={filter} limit={limit} setLimit={setLimit}></TicketsList>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
