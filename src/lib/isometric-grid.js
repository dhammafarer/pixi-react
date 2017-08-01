import graphic from './graphic.js';
import vector from './vector.js';

export default function isometricGrid ({width = 0, height = 0, gridSize = vector(0,0), ratio = 1.732, minPadding = 1}) {
  let {tile, padding} = graphic({width, height, gridSize, ratio, minPadding});

  const tileCoords = vector => {
    return {
      x: padding[0] + tile.width * (gridSize.x - vector.x + vector.y) / 2,
      y: padding[1] + tile.height * (vector.x + vector.y) / 2
    };
  };

  const pointCoords = vector =>  {
    return {
      x: padding[0] + tile.width * (gridSize.x - vector.x + vector.y + 1) / 2,
      y: padding[1] + tile.height * (vector.x + vector.y) / 2
    };
  };

  const proto =  {
    tile,
    gridSize,
    tileCoords,
    pointCoords
  };

  return Object.create(proto);
}
