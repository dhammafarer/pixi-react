import React from 'react';
import PropTypes from 'prop-types';
import { Sprite } from 'react-pixi';
import isometricTile from './lib/isometric-tile.js';

StructureTile.propTypes = {
  grid: PropTypes.object.isRequired,
  tile: PropTypes.object.isRequired
};

function StructureTile ({grid, tile}) {
  let data = isometricTile(grid, tile);
  return (
    <Sprite
      image={require('./assets/' + tile.texture.filename)}
      x={data.x()}
      y={data.y()}
      width={data.width()}
      height={data.height()}
    />
  );
}


export default StructureTile;
