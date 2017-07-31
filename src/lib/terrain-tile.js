import terrain from './terrain.js';

// terrainTile :: (Object, Object) -> Object
const terrainTile = (name, type, texture) => {
  return Object.assign({}, terrain(name, type), {texture});
};

export default terrainTile;
