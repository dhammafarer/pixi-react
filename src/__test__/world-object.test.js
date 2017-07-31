/* global describe, expect, it */
import worldObject from '../lib/world-object.js';

describe('worldObject', () => {
  it('throws an error when called without a name', () => {
    expect(
      () => worldObject({name: null})
    ).toThrow('object name is required');
  });
});
