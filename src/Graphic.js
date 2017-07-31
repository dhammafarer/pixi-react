/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import * as shapes from './lib/shapes.js';
import isometricGrid from './lib/isometric-grid.js';
import { Stage, Graphics } from 'react-pixi';

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
      .forEach(t => this.drawShape(graphics, t));
  }

  drawShape (tool, points) {
    tool.beginFill(0xFFFFFF);
    tool.lineStyle(2, 0x333333, 1);
    let head = points[0];
    let tail = points.slice(1);
    tool.moveTo(head.x, head.y);
    tail.forEach(p => tool.lineTo(p.x, p.y));
    tool.endFill();
    tool.closePath();
  }

  render () {
    let {width, height} = this.state;

    return (
      <div className="graphic" ref={c => this.graphic = c}>
        <Stage width={width} height={height} transparent={true}>
          <Graphics ref={c => this.graphics = c}/>
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
