import {case2d, flatmapToTilesArray} from '../lib/case-2d.js';
import vector from '../lib/vector.js';
import tile from '../lib/tile.js';
import { fushanMicrogrid } from './power-systems.js';
import { grass, water } from './terrain-textures.js';
import { factory, house } from './structure-textures.js';

export const fushan = case2d({
  name: 'Fushan Microgrid',
  gridSize: vector(2, 2),
  terrainTiles: flatmapToTilesArray([
    [grass, grass, grass],
    [grass, grass, grass],
    [water, water, water]
  ]),
  system: fushanMicrogrid,
  structureTiles: [
    tile({data: {name: 'House'}, position: vector(1, 1), texture: house}),
    tile({data: {name: 'Diesel Generator'}, position: vector(1, 2), texture: factory}),
    tile({data: {name: 'PV Solar'}, position: vector(0, 0), texture: factory})
  ]
});
