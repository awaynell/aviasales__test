import { allSorter } from "./allSorter";

export const filtTick = (tickArr, filt, sortAct, setSort) => {
  let arr = [];
  tickArr.filter((current) => {
    if (filt.all) {
      arr.push(current);
      allSorter(arr, sortAct, setSort);
    }
    if (filt.without && current.segments[0].stops.length === 0 && current.segments[1].stops.length === 0) {
      arr.push(current);
    }
    if (filt.one && current.segments[0].stops.length === 1 && current.segments[1].stops.length === 1) {
      arr.push(current);
    }
    if (filt.two && current.segments[0].stops.length === 2 && current.segments[1].stops.length === 2) {
      arr.push(current);
    }
    if (filt.three && current.segments[0].stops.length === 3 && current.segments[1].stops.length === 3) {
      arr.push(current);
    }
    allSorter(arr, sortAct, setSort);
  });
};
