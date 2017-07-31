import vector from './vector.js';
const DEFAULT_SIZE = vector(0, 0);

export default function texture ({
  filename,
  size = DEFAULT_SIZE
}) {
  return {filename, size};
}
