import compose from 'ramda/src/compose';
import head from 'ramda/src/head';
import tail from 'ramda/src/tail';

// validateCase :: Object -> Array
export default function  validateCase (options) {
  let errors = [];
  let pipeline = [
    handleErrors,
    validateStructuresOverlap,
    validateStructuresPlacement,
    validateSystemComponents,
    validateTerrainSize
  ].map(fn => fn.bind(null, options));

  return compose(...pipeline)(errors);
}

// handleErrors :: (Object, Array) -> Array
export function handleErrors (options, errors) {
  if (errors.length) {
    throw new Error(`Validation Error: ${options.name} contains errors:\n ${errors.join('\n')}`);
  }
  return errors;
}

// validateTerrainMapSize :: (Object, Array) -> Array
export function validateTerrainSize (options, _errors) {
  let {terrainTiles, gridSize} = options;
  let errors = _errors;
  if (terrainTiles.some(tile => !gridSize.greaterThan(tile.position))) {
    errors.push('terrain map is larger than grid');
  }
  return errors;
}

// validateStructuresPlacement :: (Object, Array) -> Array
export function validateStructuresPlacement (options, _errors) {
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
  return errors;
}

// validateStructuresOverlap :: (Object, Array) -> Array
export function validateStructuresOverlap (options, _errors) {
  let {structureTiles} = options;
  let errors = _errors;
  let overlap = [];
  checkOverlap(structureTiles);

  if (overlap.length) {
    overlap.forEach(err => errors.push(`${err[0]} and ${err[1]} overlap on position ${err[2]}`));
  }
  return errors;

  function checkOverlap(arr) {
    if (!arr.length) return;
    let tile = head(arr);
    let array = tail(arr);
    tile.position.surfacePoints(tile.texture.size)
      .forEach(p => array.forEach(t2 => {
        t2.position.surfacePoints(t2.texture.size).forEach(p2 => {
          if (p2.equals(p)) overlap.push([tile.data.name, t2.data.name, p]);
        });
      }));
    checkOverlap(array);
  }
}

// calidateSystemComponents :: (Object, Array) -> Array
export function validateSystemComponents (options, _errors) {
  let errors = _errors;
  let {system, structureTiles} = options;
  let missingTiles = system.components.filter(c => {
    return structureTiles.map(t => t.data.name).indexOf(c.name) === -1;
  });
  if (missingTiles.length) {
    missingTiles.forEach(c => errors.push(`${c.name} component does not have a tile`));
  }
  return errors;
}
