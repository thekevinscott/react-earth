import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      renderer(this.node, this.props);
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

App.propTypes = {
  speed: PropTypes.number,
};

App.defaultProps = {
  speed: 1,
};

export default App;
