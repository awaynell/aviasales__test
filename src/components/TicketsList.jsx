import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Ticket from "./Ticket";

const TicketsList = ({ obj, filter, limit, setLimit }) => {
  return (
    <TransitionGroup className="tickets">
      {obj.map((info) => {
        return (
          <CSSTransition key={info.segments[0].date} timeout={500} classNames="ticket">
            <Ticket info={info}></Ticket>
          </CSSTransition>
        );
      })}
      {filter.all ? (
        <div class="showMore" onClick={() => setLimit(limit + 5)}>
          Показать еще 5 билетов!
        </div>
      ) : (
        <></>
      )}
    </TransitionGroup>
  );
};

export default TicketsList;
