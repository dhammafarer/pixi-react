export default function vector (x, y) {
  return {
    x,
    y,
    toString: () => `(${x},${y})`,
    plus: (v2) => vector(x + v2.x, y + v2.y),
    greaterThan: v2 => (x > v2.x || y > v2.y),
    equals: v2 => (x == v2.x && y == v2.y),
    surfacePoints: v2 => {
      let res = [];
      for (let i=0; i<=v2.x; i++) {
        for (let j=0; j<=v2.y; j++) {
          res.push(vector(x,y).plus(vector(i,j)));
        }
      }
      return res;
    }
  };
}
