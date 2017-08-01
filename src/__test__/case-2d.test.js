/* global beforeEach, jest, it, describe, expect */
import {case2d, flatmapToTilesArray} from '../lib/case-2d.js';
import vector from '../lib/vector.js';

describe('case2d', () => {
  let options = {};
  beforeEach(() => {
    let name = 'grid project';
    let gridSize = vector(2, 2, 1);
    let terrainTiles = flatmapToTilesArray([
      [{}, {}],
      [{}, {}]
    ]);
    let system = {components: [{name: 'biomass'}]};
    let structureTiles = [
      {data: {name: 'biomass'}, texture: {size: vector(1,1,1)}, position: vector(0,0,0)}
    ];
    options = {name, gridSize, terrainTiles, system, structureTiles};
  });

  it('given correct data, returns case data for rendering in 2d', () => {
    expect(() => case2d(options)).not.toThrow();
  });
});
