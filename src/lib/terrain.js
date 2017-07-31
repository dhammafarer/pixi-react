import worldObject from './world-object.js';

const terrain = (name, type) => {
  return Object.assign({}, worldObject(name, type));
};

export default terrain;
