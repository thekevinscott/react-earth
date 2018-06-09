import {
  Texture,
  TextureLoader,
  // NearestFilter,
  // LinearFilter,
} from 'three';

const onProgress = (e) => {
  // TODO: Do something with this
};

const transformTexture = (texture, options) => Object.entries(options).reduce((obj, [key, value]) => {
  obj[key] = value;
  return obj;
}, texture);

export const loadTextureFromBuffer = async (buffer, options = {}) => {
  const blob = new Blob([buffer], {type: "image/png"});

  const texture = new Texture();

  createImageBitmap(blob).then(imageBitmap => {
    texture.image = imageBitmap;
    texture.needsUpdate = true;
    transformTexture(texture, options);
  });

  return texture;
};

export const loadTextureFromUrl = async (url, options = {}) => new Promise((resolve, reject) => {
  (new TextureLoader()).load(url, texture => {
    return resolve(texture);
  }, onProgress, err => {
    return reject(`There was an error loading the texture ${url}`);
  });
}).then(texture => transformTexture(texture, options));
