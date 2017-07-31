/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import * as shapes from './lib/shapes.js';
import isometricGrid from './lib/isometric-grid.js';
import { Stage, Graphics, Sprite } from 'react-pixi';
import { drawShape } from './helpers/pixi-helpers.js';
import TerrainTiles from './TerrainTiles.js';

class Graphic extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      grid: isometricGrid({})
    };
  }
  componentDidMount () {
    let width = this.graphic.offsetWidth;
    let height = this.graphic.offsetHeight;
    let grid = isometricGrid({width, height, gridSize: this.props.gridSize});
    this.setState({width, height, grid});

    let graphics = this.graphics;
    shapes.grid(grid)
      .forEach(t => drawShape(graphics, t));
  }

  render () {
    let {width, height} = this.state;

    return (
      <div className="graphic" ref={c => this.graphic = c}>
        <Stage width={width} height={height} transparent={true}>
          <Graphics ref={c => this.graphics = c}/>
          <TerrainTiles grid={this.state.grid} terrainTiles={this.props.terrainTiles}/>
          {this.props.structureTiles.map(c =>
            <Sprite key={c.data.name}
              width={this.state.grid.tile.width}
              height={this.state.grid.tile.height * c.texture.height}
              x={this.state.grid.tileCoords(c.position).x}
              y={this.state.grid.tileCoords(c.position.plus(c.texture.offsetHeight)).y}
              image={require('./assets/' + c.texture.filename)}/>
          )}
        </Stage>
      </div>
    );
  }
}

Graphic.propTypes = {
  gridSize: PropTypes.object.isRequired,
  system: PropTypes.object.isRequired,
  terrainTiles: PropTypes.array.isRequired,
  structureTiles: PropTypes.array.isRequired,
};

export default Graphic;
