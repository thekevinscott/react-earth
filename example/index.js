import React, { Component } from 'react';
import ReactEarth from "../src/index";
import ReactDOM from 'react-dom';

const Controls = ({ controls, handleChange }) => {
  return (
    <div id="controls-container">
      <div id="controls">
        {controls.map((control, key) => (
          <Control
            key={key}
            control={control}
            handleChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
};

const Control = ({ control, handleChange }) => {
  const {
    name,
    type,
    label,
    value,
    ...props
  } = control;

  return (
    <div className="control">
      <label>{label}</label>
      <input
        name={name}
        type={type}
        onChange={handleChange}
        value={value}
        checked={type === "checkbox" && value}
        {...props}
      />
      {type === "range" && (
        <span>{value}</span>
      )}
    </div>
  );
}

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      speed: 1,
      showClouds: true,
      bumpScale: 0.05,
      cloudOpacity: 0.2,
    };
  }

  handleChange = (e) => {
    if (e.target.type === "checkbox") {
      return this.setState({
        [e.target.name]: e.target.checked,
      });
    }

    return this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div id="container">
        <Controls
          controls={[{
            name: "speed",
            label: "Speed",
            type: "range",
            value: this.state.speed,
            min: -10,
            max: 10,
            step: 0.1,
          }, {
            name: "showClouds",
            label: "ShowClouds",
            type: "checkbox",
            value: this.state.showClouds,
          }, {
            name: "bumpScale",
            label: "BumpScale",
            type: "range",
            value: this.state.bumpScale,
            min: -0.3,
            step: 0.01,
            max: 0.3,
          }, {
            name: "cloudOpacity",
            label: "CloudOpacity",
            type: "range",
            min: 0,
            max: 1,
            step: 0.01,
            value: this.state.cloudOpacity,
          }]}
          handleChange={this.handleChange}
        />
        <div id="earth">
          <ReactEarth
            speed={Number(this.state.speed)}
            showClouds={this.state.showClouds}
            bumpScale={Number(this.state.bumpScale)}
            cloudOpacity={Number(this.state.cloudOpacity)}
          />
        </div>
      </div>
    );
  }
};

ReactDOM.render(<Container />, document.getElementById('root'));
