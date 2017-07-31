const worldObject = (name, type) => {
  if (!name || !type) throw 'object name is required';

  return {name, type};
};

export default worldObject;
