/* global beforeEach, jest, it, describe, expect */
import {case2d, flatmapToTilesArray} from '../lib/case-2d.js';
import vector from '../lib/vector.js';

describe('case2d', () => {
  let options = {};
  beforeEach(() => {
    let name = 'grid project';
    let gridSize = vector(2, 2);
    let terrainTiles = flatmapToTilesArray([
      [{}, {}],
      [{}, {}]
    ]);
    let system = {components: [{name: 'biomass'}]};
    let structureTiles = [
      {data: {name: 'biomass'}, texture: {size: vector(0,0)}, position: vector(0, 0)}
    ];
    options = {name, gridSize, terrainTiles, system, structureTiles};
  });

  it('given correct data, returns case data for rendering in 2d', () => {
    expect(() => case2d(options)).not.toThrow();
  });

  describe('throws an error when', () => {
    it('terrainMap does not fit gridSize', () => {
      options.gridSize = vector(2, 2);
      options.terrainTiles = flatmapToTilesArray([
        [{}, {}, {}],
        [{}, {}, {}],
        [{}, {}, {}],
        [{}, {}, {}]
      ]);
      expect(() => case2d(options)).toThrow(/larger than grid/);
    });

    it('structureTile is placed on a tile without terrain', () => {
      options.gridSize = vector(1, 0);
      options.terrainTiles = flatmapToTilesArray([[{}, null]]);
      options.structureTiles = [
        {data: {name: 'biomass'}, texture: {size: vector(2,0)}, position: vector(0, 0)}
      ];

      let missingTiles = [vector(1,0), vector(2,0)].forEach(el =>
        expect(() => case2d(options)).toThrow(new RegExp(el))
      );
    });

    it('structureTiles overlap each other', () => {
      options.structureTiles = [
        {data: {name: 'biomass'}, texture: {size: vector(1,0)}, position: vector(0, 0)},
        {data: {name: 'house'}, texture: {size: vector(0,0)}, position: vector(1, 0)}
      ];

      expect(() => case2d(options)).toThrow(/biomass/);
      expect(() => case2d(options)).toThrow(/house/);
      expect(() => case2d(options)).toThrow(/(1,0)/);
      expect(() => case2d(options)).not.toThrow(/(0,0)/);
    });

    it('there is no structureTile for every system component', () => {
      options.structureTiles = [
        {data: {name: 'factory'}, texture: {size: vector(1,0)}, position: vector(0, 0)}
      ];

      expect(() => case2d(options)).toThrow(/biomass/);
      expect(() => case2d(options)).not.toThrow(/factory/);
    });
  });
});

describe('flatmapToTilesArray', () => {
  it('flattens an array of tiles', () => {
    let tilesMap = [[{}, {}], [{}]];
    let result = flatmapToTilesArray(tilesMap);
    expect(result.length).toBe(3);
  });

  it('filters out tiles without a texture', () => {
    let tilesMap = [[{}, null]];
    let result = flatmapToTilesArray(tilesMap);

    expect(result.length).toBe(1);
  });
});
