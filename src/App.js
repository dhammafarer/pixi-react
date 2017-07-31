/* eslint-disable no-console */
import React, { Component } from 'react';
import Graphic from './Graphic.js';
import { fushanMicrogrid } from './data/power-systems.js';
import { fushan } from './data/cases-2d.js';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      cases2d:[fushan],
      systems: [fushanMicrogrid],
      activeIdx: 0
    };
  }

  render() {
    return (
      <div className="App">
        <Graphic {...this.state.cases2d[this.state.activeIdx]} />
      </div>
    );
  }
}

export default App;
