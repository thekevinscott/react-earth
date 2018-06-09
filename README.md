# React Earth

This is a package to display an Earth via a React component.

Image of it working.

You can see a live example here.

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

List of props is as follows:

* `speed` - indicates the speed the globe should rotate at. 0 indicates no rotation. You can specify a negative rotation to rotate it backwards.

Inspired by [this great tutorial](http://learningthreejs.com/blog/2013/09/16/how-to-make-the-earth-in-webgl/).
