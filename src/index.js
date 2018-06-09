import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import renderer from './renderer';

class App extends Component {
  constructor(props) {
    super(props);

    this.node = null;
  }

  setNode = node => {
    if (!this.node) {
      this.node = ReactDOM.findDOMNode(node);
      renderer(this.node);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div ref={this.setNode} />
    );
  }
}

export default App;
