export function numTransf(length) {
  if (length === 0) {
    return <div className="ticket-transf__title">0 пересадок</div>;
  } else if (length === 1) {
    return <div className="ticket-transf__title">1 пересадка</div>;
  }
}
