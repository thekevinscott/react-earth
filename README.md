# React Earth

This is a package to display an Earth via a React component.

![An image of the Earth rotating slowly](./assets/globe.gif)

[View a live demo here](https://thekevinscott.github.io/react-earth/)

## Installation

Install with npm:
```
npm install react-earth
```

Or yarn:
```
yarn add react-earth
```

## Usage

```
import ReactEarth from 'react-earth';

const App = () => {
  return (
    <ReactEarth />
  );
};
```

List of (all optional) props is as follows:
* `width` - the width of the canvas.
* `height` - the height of the canvas.
* `speed` - indicates the speed the globe should rotate at. 0 indicates no rotation. You can specify a negative rotation to rotate it backwards.
* `className` - a class name to pass to the containing div
* `showCloud` - whether to show clouds or not
* `textures` - an object of custom textures to pass to the globe
* `textures.map` - the main texture of the globe
* `textures.bumpMap` - a bump map to give the globe some texture
* `textures.specular` - a specular map to give the globe some reflectivity
* `textures.cloud` - a cloud map to overlay on the globe
* `bumpScale` - the amount of extrusion for the bump map
* `cloudOpacity` - the amount of opacity for the cloud layer
* `cities` - a list of objects containing `lat` and `lng` points to display
* `citySize` - the size of the city
* `onCityMouseOver` - a callback function when hovering over a city
* `onCityMouseOut` - a callback function when stopping hovering over a city

---

Inspired by [this great tutorial](http://learningthreejs.com/blog/2013/09/16/how-to-make-the-earth-in-webgl/).
