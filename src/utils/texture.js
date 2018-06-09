import {
  Texture,
  TextureLoader,
  NearestFilter,
  LinearFilter,
} from 'three';

const progress = (e) => {
  // TODO: Do something with this
};

const getTexture = async (path, options = {}) => {
  const blob = new Blob([path], {type: "image/png"});

  const texture = new Texture();
  // texture.repeat.x = - 1;
  // texture.magFilter = NearestFilter;
  // texture.minFilter = LinearFilter;

  createImageBitmap(blob).then(imageBitmap => {
    texture.image = imageBitmap;
    texture.needsUpdate = true;
    Object.entries(options).forEach(([key, value]) => {
      texture[key] = value;
    });
  });

  return texture;

  // return new Promise((resolve, reject) => {
  //   return new TextureLoader().load(path, resolve, progress, err => {
  //     return reject(new Error(`There was an error loading ${path}`));
  //   });
  // }).then(map => {
  //   map.magFilter = NearestFilter;
  //   map.minFilter = LinearFilter;
  //   return map;
  // }).then(map => Object.entries(options).reduce((obj, [key, value]) => {
  //   obj[key] = value;
  //   return obj;
  // }, map));
};

export default getTexture;
