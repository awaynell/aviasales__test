import React, { useEffect, useState } from "react";
import { useCallback } from "react/cjs/react.development";
import logo from "./assets/Logo.png";
import getDate from "./functions/getDate";
import { getDurationHours, getDurationMinutes } from "./functions/getDurationTime";
import { numTransf } from "./functions/numTranf";
import "./styles/App.css";

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

  const filtTick = (tickArr) => {
    let arr = [];
    tickArr.filter((current) => {
      if (filter.all) {
        arr.push(current);
        allSorter(arr);
        return true;
      }
      if (filter.without && current.segments[0].stops.length === 0 && current.segments[1].stops.length === 0) {
        arr.push(current);
        return true;
      }
      if (filter.one && current.segments[0].stops.length === 1 && current.segments[1].stops.length === 1) {
        arr.push(current);
        return true;
      }
      if (filter.two && current.segments[0].stops.length === 2 && current.segments[1].stops.length === 2) {
        arr.push(current);
        return true;
      }
      if (filter.three && current.segments[0].stops.length === 3 && current.segments[1].stops.length === 3) {
        arr.push(current);
        return true;
      }
      allSorter(arr);
    });
  };

  const allSorter = (ticketsArr) => {
    const myTick = [...ticketsArr];
    if (sortActive.lowPrice) {
      setSortTick(myTick.sort((a, b) => (a.price > b.price ? 1 : -1)));
    }
    if (sortActive.faster) {
      setSortTick(
        myTick.sort((a, b) => (a.segments[0].duration + a.segments[1].duration > b.segments[0].duration + b.segments[1].duration ? 1 : -1))
      );
    }
    return myTick;
  };

  // const sortTicketsByPrice = (tickets) => {
  //   return tickets
  //     .map((sorter) => sorter)
  //     .sort((a, b) => (a.price > b.price ? 1 : -1))
  //     .slice(0, 50);
  // };

  // const sortTicketsByFast = (tickets) => {
  //   return tickets
  //     .map((sorter) => sorter)
  //     .sort((a, b) => (a.segments[0].duration + a.segments[1].duration > b.segments[0].duration + b.segments[1].duration ? 1 : -1))
  //     .slice(0, 50);
  // };

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
      let ticket = tickets.slice(0, 50);
      filtTick(ticket);
    }
    if (!loading && sortActive.faster) {
      let ticket = tickets.slice(0, 50);
      filtTick(ticket);
    }
  }, [loading, sortActive, filter]);

  const getArriveDate = (dep, duration) => {
    let date = new Date(dep);
    date.setMinutes(date.getMinutes() + duration);
    return getDate(date);
  };

  const allHandler = () => {
    if (!filter.all) {
      setFilter({
        all: true,
        without: true,
        one: true,
        two: true,
        three: true,
      });
    } else {
      setFilter({
        all: false,
        without: false,
        one: false,
        two: false,
        three: false,
      });
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <img style={{ width: 80, height: 80 }} src={logo} alt="" className="logo" />
        <div className="app-inner">
          <div className="filter">
            <h3 className="filter-title">Количество пересадок</h3>
            <div className="filter-items">
              <div className="filter-item">
                <input className="filter-all" type="checkbox" id="filter-all" onChange={() => allHandler()} checked={filter.all} />
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
                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <div className="tickets">
                {sortTick.map((info) => {
                  return (
                    <div className="ticket">
                      <div className="ticket-info">
                        <div className="price">{info.price} р</div>
                        <img src={`https://pics.avs.io/99/36/${info.carrier}.png`} className="aviaLogo"></img>
                      </div>
                      <div className="ticket-wrapper">
                        <div className="ticket-deps">
                          <div className="ticket-dep">
                            <span>{info.segments[0].origin} - </span> <span>{info.segments[0].destination}</span>
                          </div>
                          <div className="ticket-depTime">
                            <span>{getDate(info.segments[0].date)}</span>
                            <span> - {getArriveDate(info.segments[0].date, info.segments[0].duration)}</span>
                          </div>
                        </div>
                        <div className="ticket-dur">
                          <div className="ticket-dur__title">В пути</div>
                          <div className="ticket-dur__time">
                            <span>{getDurationHours(info.segments[0].duration)}ч </span>
                            <span>{getDurationMinutes(info.segments[0].duration)}мин</span>
                          </div>
                        </div>
                        <div className="ticket-transf">
                          {info.segments[0].stops.length < 2 ? (
                            numTransf(info.segments[0].stops.length)
                          ) : (
                            <div className="ticket-transf__title">{info.segments[0].stops.length} пересадки</div>
                          )}
                          <div className="ticket-transf__info">{info.segments[0].stops.join(", ")}</div>
                        </div>
                      </div>
                      <div className="ticket-wrapper">
                        <div className="ticket-deps">
                          <div className="ticket-dep">
                            <span>{info.segments[1].origin} - </span> <span>{info.segments[1].destination}</span>
                          </div>
                          <div className="ticket-depTime">
                            <span>{getDate(info.segments[1].date)}</span>
                            <span> - {getArriveDate(info.segments[1].date, info.segments[1].duration)}</span>
                          </div>
                        </div>
                        <div className="ticket-dur">
                          <div className="ticket-dur__title">В пути</div>
                          <div className="ticket-dur__time">
                            <span>{getDurationHours(info.segments[1].duration)}ч </span>
                            <span>{getDurationMinutes(info.segments[1].duration)}мин</span>
                          </div>
                        </div>
                        <div className="ticket-transf">
                          {info.segments[1].stops.length < 2 ? (
                            numTransf(info.segments[1].stops.length)
                          ) : (
                            <div className="ticket-transf__title">{info.segments[1].stops.length} пересадки</div>
                          )}
                          <div className="ticket-transf__info">{info.segments[1].stops.join(", ")}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
