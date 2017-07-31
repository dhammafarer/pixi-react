import case2d from '../lib/case-2d.js';
import vector from '../lib/vector.js';
import structureTile from '../lib/structure-tile.js';

const grass = {};

export const fushan = case2d({
  grid: vector(3,3),
  terrainMap: [
    [grass, grass, grass],
    [grass, grass, grass],
    [grass, grass, grass]
  ],
  system: [],
  structureTiles: [
    {name: 'factory', position: vector(1, 1), texture: {}}
  ]
});
