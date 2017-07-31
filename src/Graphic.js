/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import * as shapes from './lib/shapes.js';
import isometricGrid from './lib/isometric-grid.js';
import * as PIXI from 'pixi.js';

class Graphic extends React.Component {
  componentDidMount () {
    let width = this.graphic.offsetWidth;
    let height = this.graphic.offsetHeight;
    let grid = isometricGrid({width, height, gridSize: this.props.gridSize});

    const app = new PIXI.Application(width, height, {transparent: true});
    this.graphic.appendChild(app.view);

    let graphics = new PIXI.Graphics();
    shapes.grid(grid)
      .forEach(t => this.drawShape(graphics, t));


    app.stage.addChild(graphics);
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
    return (
      <div className="graphic" ref={c => this.graphic = c}/>
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
