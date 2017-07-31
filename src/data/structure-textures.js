import texture from '../lib/texture.js';
import vector from '../lib/vector.js';

export const factory = texture({
  filename: 'factory.png',
  size: vector(1, 0),
  height: 2,
  offsetHeight: vector(-1, -1)
});

export const house = texture({
  filename: 'house.png',
  height: 2,
  offsetHeight: vector(-1, -1)
});

export const solar = texture({
  filename: 'solar.png',
  size: vector(1, 1),
  height: 2,
  offsetHeight: vector(-1, -1)
});
