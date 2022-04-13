const equals = (a, b) => {
  const A = JSON.stringify(a);
  const B = JSON.stringify(b);
  return A === B;
};

module.exports = equals;
