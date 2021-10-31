export const allHandler = (filt, setFilt) => {
  if (!filt.all) {
    setFilt({
      all: true,
      without: true,
      one: true,
      two: true,
      three: true,
    });
  } else {
    setFilt({
      all: false,
      without: false,
      one: false,
      two: false,
      three: false,
    });
  }
};
