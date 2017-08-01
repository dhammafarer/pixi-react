module.exports = function isometricTile (grid, tile) {
  let tileCoords = grid.tileCoords(tile.position);

  const proto = {
    x: () => tileCoords.x,
    y: () => tileCoords.y - tile.texture.size.z * grid.tile.height,
    width: () => grid.tile.width * tile.texture.width,
    height: () => grid.tile.height * tile.texture.height
  };

  return Object.create(proto);
};
