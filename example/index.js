import React, { Component } from 'react';
import ReactEarth from "../src/index";
import ReactDOM from 'react-dom';
import { parse } from 'loose-json';

const Controls = ({ controls, handleChange, output }) => {
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
        <pre id="output">{output}</pre>
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
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          {...props}
          onChange={handleChange}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          checked={type === "checkbox" && value}
          {...props}
          onChange={handleChange}
        />
      )}
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
      output: "",
      speed: 1,
      showClouds: true,
      bumpScale: 0.05,
      cloudOpacity: 0.2,
      citySize: 15,
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
    const cities = [{
      "lat": 42.3601,
      "lng": 71.0589,
    }, {
      "lat": 74.0721,
      "lng": 4.7110,
    }, {
      "lat": 45.31,
      "lng": 2.04,
    }, {
      "lat": 174.72,
      "lng": 36.8249,
    }, {
      "lat": 18.42,
      "lng": 33.9249,
    }];

    return (
      <div id="container">
        <Controls
          output={this.state.output}
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
          }, {
            name: "citySize",
            label: "CitySize",
            type: "range",
            min: 1,
            max: 50,
            step: 1,
            value: this.state.citySize,
          }]}
          handleChange={this.handleChange}
        />
        <div id="earth">
          <ReactEarth
            onCityMouseOut={this.setOutput("Hovering over")}
            onCityMouseOut={this.setOutput("Left")}
            speed={Number(this.state.speed)}
            showClouds={this.state.showClouds}
            bumpScale={Number(this.state.bumpScale)}
            cloudOpacity={Number(this.state.cloudOpacity)}
            cities={cities}
            citySize={Number(this.state.citySize)}
            x={this.state.x}
            y={this.state.y}
            z={this.state.z}
          />
        </div>
      </div>
    );
  }

  setOutput = msg => city => {
    const output = `${this.state.output}${msg} city index ${JSON.stringify(city)}\n`;

    this.setState({
      output,
    });
  }
};

ReactDOM.render(<Container />, document.getElementById('root'));
