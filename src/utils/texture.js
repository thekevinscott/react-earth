import {
  TextureLoader,
  NearestFilter,
  LinearFilter,
} from 'three';

const progress = (e) => {
  // TODO: Do something with this
};

const texture = async (path, options = {}) => new Promise((resolve, reject) => new TextureLoader().load(path, resolve, progress, reject)).then(map => {
  map.magFilter = NearestFilter;
  map.minFilter = LinearFilter;
  return map;
}).then(map => Object.entries(options).reduce((obj, [key, value]) => {
  obj[key] = value;
  return obj;
}, map));

export default texture;
