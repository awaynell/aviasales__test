export const allSorter = (ticketsArr, sortAct, setSort) => {
  const myTick = [...ticketsArr];
  if (sortAct.lowPrice) {
    setSort(myTick.sort((a, b) => (a.price > b.price ? 1 : -1)));
  }
  if (sortAct.faster) {
    setSort(myTick.sort((a, b) => (a.segments[0].duration + a.segments[1].duration > b.segments[0].duration + b.segments[1].duration ? 1 : -1)));
  }
  return myTick;
};
