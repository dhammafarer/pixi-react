import graphic from './graphic.js';

export default function isometricGrid ({width, height, gridSize, ratio = 1.732, minPadding = 1}) {
  let {tile, padding} = graphic({width, height, gridSize, ratio, minPadding});

  return {
    gridSize,
    tileCoords: vector => {
      return {
        x: padding[0] + tile.width * (gridSize.x - vector.x + vector.y) / 2,
        y: padding[1] + tile.height * (vector.x + vector.y) / 2
      };
    },
    pointCoords: vector =>  {
      return {
        x: padding[0] + tile.width * (gridSize.x - vector.x + vector.y + 1) / 2,
        y: padding[1] + tile.height * (vector.x + vector.y) / 2
      };
    }
  };
}
