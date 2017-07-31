import tile from './tile.js';
import validateCase2d from './validate-case2d.js';
import vector from './vector.js';

// case2d :: Object -> Object
export const case2d = (options) => {
  validateCase2d(options);
  let {name, gridSize, terrainTiles, system, structureTiles} = options;

  return Object.assign({}, {
    name,
    gridSize,
    terrainTiles,
    system,
    structureTiles});
};

// flatmapToTilesArray :: Array -> Array
export function flatmapToTilesArray (objectsMap) {
  return objectsMap
    .map((col, y) => col
      .map((texture, x) => {
        return tile({texture, position: vector(x, y)});
      })
    )
    .reduce((a, b) => a.concat(b))
    .filter(el => el.texture);
}
