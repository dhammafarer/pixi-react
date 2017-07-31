// structureTile :: (Object, Object) -> Object
const structureTile = ({structure, texture, position}) => {
  return Object.assign({}, {structure, texture, position});
};

export default structureTile;
