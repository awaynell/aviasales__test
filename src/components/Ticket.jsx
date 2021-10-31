import React from "react";
import getDate, { getArriveDate } from "../functions/getDate";
import { getDurationHours, getDurationMinutes } from "../functions/getDurationTime";
import { numTransf } from "../functions/numTranf";

const Ticket = ({ info }) => {
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
};

export default Ticket;
