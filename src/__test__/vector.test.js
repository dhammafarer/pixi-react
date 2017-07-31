/* globals describe, it, expect */
import vector from '../lib/vector.js';

describe('vector', () => {
  describe('returns a vector', () => {
    it('with an x and y coordinate', () => {
      let v = vector(1,2);
      expect(v.x).toEqual(1);
      expect(v.y).toEqual(2);
    });
    it('with a toString() method', () => {
      let v = vector(1, 2);
      expect(String(v)).toBe('(1,2)');
    });
  });

  describe('can compare vectors', () => {
    it('with a greaterThan method', () => {
      let v = vector(2,2);
      let v2 = vector(1,1);

      expect(v.greaterThan(v2)).toBe(true);
    });

    it('with an equals method', () => {
      let v = vector(2,2);
      let v2 = vector(2,2);

      expect(v.equals(v2)).toBe(true);
    });
  });

  it('given size, can return vector surface points', () => {
    let pos = vector(0, 0);
    let size = vector(1, 1);
    let expected = [vector(0, 0), vector(0, 1), vector(1, 0), vector(1, 1)];
    let result = pos.surfacePoints(size);

    result.forEach((_, i) => {
      expect(result[i].x).toEqual(expected[i].x);
      expect(result[i].y).toEqual(expected[i].y);
    });
  });
});
