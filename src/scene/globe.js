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
    map: 'https://thekevinscott.github.io/react-earth/assets/map.jpg',
    bumpMap: 'https://thekevinscott.github.io/react-earth/assets/bump.jpg',
    specular: 'https://thekevinscott.github.io/react-earth/assets/spec.jpg',
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

let props;
let material;
let globe;
let cloudMesh;

export default async (_props) => {
  props = _props;
  const size = 50;
  const geometry = new SphereGeometry(0.5, size, size);
  const {
    map,
    bumpMap,
    specular,
    cloud,
  } = await loadTextures(props);

  material = new MeshPhongMaterial({
    map,
    bumpMap,
    bumpScale: props.bumpScale,
    specular,
  });
  globe = new Mesh(geometry, material);

  if (props.showClouds) {
    const cloudGeometry = new SphereGeometry(0.51, size, size)
    const cloudMaterial = new MeshPhongMaterial({
      map: cloud,
      side: DoubleSide,
      transparent : true,
      depthWrite : false,
      opacity: props.cloudOpacity,
    })
    cloudMesh = new Mesh(cloudGeometry, cloudMaterial)
    globe.add(cloudMesh);
  }

  const render = () => {
    const speed = props.speed / 1000;
    globe.rotation.y -= speed;
  };
  return {
    globe,
    render,
  };
};

export const update = _props => {
  if (JSON.stringify(props) !== JSON.stringify(_props)) {
    globe.material.bumpScale = props.bumpScale;
    cloudMesh.material.opacity = props.cloudOpacity;
    globe.material.needsUpdate = true;
    cloudMesh.material.needsUpdate = true;
    if (props.showClouds === false && _props.showClouds === true) {
      globe.add(cloudMesh);
    } else if (props.showClouds === true && _props.showClouds === false) {
      globe.remove(cloudMesh);
    }
    props = _props;
  }
};
