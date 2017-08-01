module.exports = function vector (x, y, z = 0) {
  const proto = {
    x,
    y,
    z,
    toString: () => `(${x},${y},${z})`,
    plus: (v2) => vector(x + v2.x, y + v2.y, z + v2.z),
    minus: (v2) => vector(x - v2.x, y - v2.y, z - v2.z),
    greaterThan: v2 => (x > v2.x || y > v2.y),
    equals: v2 => (x === v2.x && y === v2.y && z === v2.z),
    surfacePoints: v2 => {
      let res = [];
      for (let i=0; i<=(v2.x-1); i++) {
        for (let j=0; j<=(v2.y-1); j++) {
          res.push(vector(x,y).plus(vector(i,j)));
        }
      }
      return res;
    }
  };

  return Object.create(proto);
};
