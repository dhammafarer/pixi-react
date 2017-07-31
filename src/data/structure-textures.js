import texture from '../lib/texture.js';
import vector from '../lib/vector.js';

export const factory = texture({
  filename: 'factory.png',
  size: vector(1, 0)
});

export const house = texture({
  filename: 'house.png'
});

export const solar = texture({
  filename: 'solar.png',
  size: vector(1, 1)
});
