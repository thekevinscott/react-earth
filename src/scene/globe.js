import fs from 'fs';
import {
  Mesh,
  SphereGeometry,
  MeshPhongMaterial,
  Texture,
  DoubleSide,
  MeshBasicMaterial,
  MeshNormalMaterial,
} from 'three';
import {
  // loadTextureFromBuffer,
  loadTextureFromUrl,
} from '../utils/texture';

// const textureBuffers = {
//   texture: fs.readFileSync(__dirname + '/../../assets/earthmap1k.jpg').buffer,
//   bump: fs.readFileSync(__dirname + '/../../assets/earthbump1k.jpg').buffer,
//   spec: fs.readFileSync(__dirname + '/../../assets/earthspec1k.jpg').buffer,
//   cloud: fs.readFileSync(__dirname + '/../../assets/earthcloudmap.jpg').buffer,
// };

const getDefaultTextures = ({ showClouds }) => {
  const defaultTextures = {
    map: 'https://thekevinscott.github.io/react-earth/assets/earthmap1k.jpg',
    bumpMap: 'https://thekevinscott.github.io/react-earth/assets/earthbump1k.jpg',
    specular: 'https://thekevinscott.github.io/react-earth/assets/earthspec1k.jpg',
  };

  if (showClouds) {
    return {
      ...defaultTextures,
      cloud: 'https://thekevinscott.github.io/react-earth/assets/earthcloudmap.jpg',
    };
  }

  return defaultTextures;
};

const loadTextures = (props) => Object.entries({
  ...getDefaultTextures(props),
  ...props.textures,
}).reduce((promise, [key, val]) => promise.then(textures => {
  return loadTextureFromUrl(val).then(texture => ({
    ...textures,
    [key]: texture,
  }));
}), Promise.resolve());

export default async (props) => {
  const size = 50;
  const geometry = new SphereGeometry(0.5, size, size);
  const {
    map,
    bumpMap,
    specular,
    cloud,
  } = await loadTextures(props);

  const material = new MeshPhongMaterial({
    map,
    bumpMap,
    bumpScale: props.bumpScale,
    specular,
  });
  const globe = new Mesh(geometry, material);
  const cloudGeometry = new SphereGeometry(0.51, size, size)
  const cloudMaterial = new MeshPhongMaterial({
    map: cloud,
    side: DoubleSide,
    transparent : true,
    depthWrite : false,
    opacity: props.cloudOpacity,
  })
  var cloudMesh = new Mesh(cloudGeometry, cloudMaterial)
  globe.add(cloudMesh);

  const speed = props.speed / 1000;

  const render = () => {
    globe.rotation.y -= speed;
  };
  return {
    globe,
    render,
  };
};
