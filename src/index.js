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
      this.renderGlobe();
    }
  }

  renderGlobe = () => {
    try {
      renderer(this.node, this.props);
    } catch(err) {
      console.log('err', err);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
        ref={this.setNode}
      />
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
