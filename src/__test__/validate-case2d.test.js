/* global beforeEach, describe, it, expect */
import vector from '../lib/vector.js';
import { flatmapToTilesArray } from '../lib/case-2d.js';
import {
  validateStructuresOverlap,
  validateStructuresPlacement,
  validateSystemComponents,
  validateTerrainSize
} from '../lib/validate-case2d.js';

describe('validateCase2d', () => {
  let options = {};

  beforeEach(() => {
    let name = 'grid project';
    let gridSize = [2,2];
    let terrainTiles = flatmapToTilesArray([
      [{}, {}],
      [{}, {}]
    ]);
    let system = {components: [{name: 'biomass'}]};
    let structureTiles = [
      {data: {name: 'biomass'}, texture: {size: [1,1,1]}, position: vector(0,0)}
    ];
    options = {name, gridSize, terrainTiles, system, structureTiles};
  });

  describe('validateTerrainSize', () => {
    it('returns errors when terrain does not fit gridSize', () => {
      options.terrainTiles = flatmapToTilesArray([
        [{}, {}, {}],
        [{}, {}, {}],
        [{}, {}, {}]
      ]);
      let res = validateTerrainSize(options, []);

      expect(res.length).toEqual(1);
    });
  });

  describe('validateStructuresPlacement', () => {
    beforeEach(() => {
      options.structureTiles = [
        {data: {name: 'biomass'}, texture: {size: [2,2,1]}, position: vector(1, 1)}
      ];
    });

    it('return an error when structureTile is placed on a tile without terrain', () => {
      let res = validateStructuresPlacement(options, []);
      expect(res.length).toEqual(1);
    });

    it('detects correct missing tiles ', () => {
      let res = validateStructuresPlacement(options, []);
      let missingTiles = [vector(1,2), vector(2,1), vector(2,2)];

      expect(matchedTiles(res).length).toEqual(missingTiles.length);
    });
  });

  describe('validateStructuresOverlap', () => {
    beforeEach(() => {
      options.structureTiles = [
        {data: {name: 'biomass'}, texture: {size: [2,1,1]}, position: vector(0,0)},
        {data: {name: 'house'}, texture: {size: [1,1,1]}, position: vector(1,0)}
      ];
    });
    it('detects that structureTiles overlap each other', () => {
      let res = validateStructuresOverlap(options, []);
      expect(res.length).toEqual(1);
    });

    it('detects where structures overlap each other', () => {
      let res = validateStructuresOverlap(options, []);
      expect(matchedTiles(res).length).toEqual(1);
      expect(matchedTiles(res)[0]).toEqual(vector(1,0).toString());
    });
  });

  describe('validateSystemComponents', () => {
    beforeEach(() => {
      options.structureTiles = [
        {data: {name: 'factory'}, texture: {size: [1,1,1]}, position: vector(0, 0)}
      ];
    });

    it('detects if there is no structureTile any system component', () => {
      let res = validateSystemComponents(options, []);
      expect(res.length).toEqual(1);
    });
    it('detects system components have no tile', () => {
      let res = validateSystemComponents(options, []);
      expect(res[0]).toMatch(/biomass/);
    });
  });
});

function matchedTiles (res) {
  return res[0].match(/\([^)]+\)/g);
}
