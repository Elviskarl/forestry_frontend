const assets = {
  classification: {
    years: [2000, 2005, 2010, 2015, 2020, 2025],
  },
  landsat: {
    years: [1984, 2000, 2005, 2010, 2015, 2020, 2025],
  },
};

const bounds: L.LatLngBoundsExpression = [
  [-0.9995495358277411, 35.23259689084519], // southwest
  [0.23773428224974488, 36.50563766232956], // northeast
];

export { assets, bounds };
