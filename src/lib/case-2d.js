import tile from './tile.js';
import compose from 'ramda/src/compose';
import tap from 'ramda/src/tap';
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
  return compose(
    handleErrors,
    validateStructuresOverlap,
    validateStructuresPlacement,
    validateSystemComponents,
    validateTerrainSize
  )([[], options]);
}

function handleErrors ([errors, options]) {
  if (errors.length) throw `Validation Error: ${options.name} contains errors:\n ${errors.join('\n')}`;
}

// validateTerrainMapSize :: Array -> Array
function validateTerrainSize ([_errors, options]) {
  let {terrainTiles, gridSize} = options;
  let errors = _errors;
  if (terrainTiles.some(tile => tile.position.greaterThan(gridSize))) {
    errors.push('terrain map is larger than grid');
  }
  return [errors, options];
}

function validateStructuresPlacement ([_errors, options]) {
  let {terrainTiles, structureTiles} = options;
  let errors = _errors;
  structureTiles.forEach(st => {
    let missingTiles = st.position.surfacePoints(st.texture.size).filter(v =>
      !terrainTiles.find(tt => tt.position.equals(v))
    );
    if (missingTiles.length) {
      errors.push(`${st.data.name} has no terrain tile at positions: ${missingTiles.join(', ')}`);
    }
  });
  return [errors, options];
}

function validateStructuresOverlap ([_errors, options]) {
  let {structureTiles} = options;
  let errors = _errors;
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
  if (overlap.length) {
    overlap.forEach(err => errors.push(`${err[0]} and ${err[1]} overlap on position ${err[2]}`));
  }
  return [errors, options];
}

function validateSystemComponents ([_errors, options]) {
  let errors = _errors;
  let {system, structureTiles} = options;
  let missingTiles = system.components.filter(c => {
    return structureTiles.map(t => t.data.name).indexOf(c.name) === -1;
  });
  if (missingTiles.length) {
    missingTiles.forEach(c => errors.push(`${c.name} component does not have a tile`));
  }
  return [errors, options];
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
