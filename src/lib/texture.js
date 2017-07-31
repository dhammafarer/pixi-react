import vector from './vector.js';
const DEFAULT_SIZE = vector(0, 0);

export default function texture ({
  filename,
  size = DEFAULT_SIZE,
  height = 1,
  offsetHeight = vector(0,0)
}) {
  return {filename, size, height, offsetHeight};
}
