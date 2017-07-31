// tile :: (Object, Object, Object) -> Object
const tile = ({texture, position, data = {}}) => {
  return Object.assign({}, {texture, position, data});
};

export default tile;
