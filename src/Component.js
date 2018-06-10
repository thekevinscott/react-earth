import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import renderer, { resize, update } from './renderer';

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
      console.error('err', err);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      width,
      height,
    } = nextProps;

    if (width !== this.props.width || height !== this.props.height) {
      resize(width, height);
    }

    update(nextProps);
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={{
          width: this.props.width || '100%',
          height: this.props.height || '100%',
        }}
        ref={this.setNode}
      />
    );
  }
}

App.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  speed: PropTypes.number,
  className: PropTypes.string,
  showClouds: PropTypes.bool,
  textures: PropTypes.shape({
    map: PropTypes.string,
    bumpMap: PropTypes.string,
    specular: PropTypes.string,
    cloud: PropTypes.string,
  }),
  bumpScale: PropTypes.number,
  cloudOpacity: PropTypes.number,
  onCityMouseOver: PropTypes.func,
  onCityMouseOut: PropTypes.func,
  citySize: PropTypes.number,
};

App.defaultProps = {
  className: "",
  width: null,
  height: null,
  showClouds: true,
  speed: 1,
  textures: {},
  bumpScale: 0.05,
  cloudOpacity: 0.2,
  onCityMouseOver: () => {},
  onCityMouseOut: () => {},
  citySize: 10,
};

export default App;
