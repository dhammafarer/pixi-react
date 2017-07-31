import tile from './tile.js';
import vector from './vector.js';

// case2d :: Object -> Object
export const case2d = (options) => {
  validateCase(options);
  let {name, gridSize, terrainTiles, system, structureTiles} = options;

  return Object.assign({}, {
    name,
    gridSize,
    terrainTiles,
    system,
    structureTiles});
};

function  validateCase (options) {
  let errors = [];
  validateTerrainSize(errors, options);
  validateStructuresPlacement(errors, options);
  validateStructuresOverlap(errors, options);
  validateSystemComponents(errors, options);
  if (errors.length) throw `Validation Error: ${options.name} contains errors:\n ${errors.join('\n')}`;
}

// validateTerrainMapSize :: (Object, Array) -> undefined
function validateTerrainSize (errors, {terrainTiles, gridSize}) {
  if (terrainTiles.some(tile => tile.position.greaterThan(gridSize))) {
    errors.push('terrain map is larger than grid');
  }
}

function validateStructuresPlacement (errors, {terrainTiles, structureTiles}) {
  structureTiles.forEach(st => {
    let missingTiles = st.position.surfacePoints(st.texture.size).filter(v =>
      !terrainTiles.find(tt => tt.position.equals(v))
    );
    if (missingTiles.length) errors.push(`${st.data.name} has no terrain tile at positions: ${missingTiles.join(', ')}`);
  });
}

function validateStructuresOverlap (errors, {structureTiles}) {
  let overlap = [];
  checkOverlap(structureTiles[0], structureTiles.slice(1));

  function checkOverlap(tile, array) {
    if (!array.length) return;
    tile.position.surfacePoints(tile.texture.size)
      .forEach(p => array.forEach(t2 => {
        t2.position.surfacePoints(t2.texture.size).forEach(p2 => {
          if (p2.equals(p)) overlap.push([tile.data.name, t2.data.name, p]);
        });
      }));
    checkOverlap(array[0], array.slice(1));
  }
  if (overlap.length) overlap.forEach(err => errors.push(`${err[0]} and ${err[1]} overlap on position ${err[2]}`));
}

function validateSystemComponents (errors, {system, structureTiles}) {
  let missingTiles = system.components.filter(c => {
    return structureTiles.map(t => t.data.name).indexOf(c.name) == -1;
  });
  if (missingTiles.length) missingTiles.forEach(c => errors.push(`${c.name} component does not have a tile`));
}

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
