import worldObject from './world-object.js';

const structure = (name, type) => {
  return Object.assign({}, worldObject(name, type));
};

export default structure;
