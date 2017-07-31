/* global jest, it, describe, expect */
import structureTile from '../lib/structure-tile.js';
const vector = jest.fn().mockReturnValue({});

describe('structure-tile', () => {
  describe('given structure, texture and position as required arguments', () => {
    it('returns an object with structure, texture and position', () => {
      let texture = {filename: 'house.png', size: vector(1, 2)};
      let structure = {name: 'house'};
      let position = vector(0, 0);
      let result = structureTile({structure, position, texture});

      expect(result.structure.name).toEqual(structure.name);
      expect(result.position).toEqual(position);
      expect(result.texture.filename).toEqual(texture.filename);
      expect(result.texture.size).toEqual(texture.size);
    });
  });
});
