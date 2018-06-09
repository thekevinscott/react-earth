import fs from 'fs';
import {
  Mesh,
  SphereGeometry,
  MeshBasicMaterial,
  MeshNormalMaterial,
} from 'three';
import loadTexture from '../utils/texture';
const textures = {
  texture: fs.readFileSync(__dirname + '/../../assets/earthmap1k.jpg').buffer,
  bump: fs.readFileSync(__dirname + '/../../assets/earthbump1k.jpg').buffer,
  spec: fs.readFileSync(__dirname + '/../../assets/earthspec1k.jpg').buffer,
  cloud: fs.readFileSync(__dirname + '/../../assets/earthcloudmap.jpg').buffer,
};

export default async (props) => {
  const size = 50;
  const geometry = new SphereGeometry(0.5, size, size);
  const map = await loadTexture(textures.texture);
  const bumpMap = await loadTexture(textures.bump, {
    bumpScale: 1.15,
  });
  // const specular = await Texture(spec);

  // const material = new MeshNormalMaterial({
  const material = new MeshBasicMaterial({
    map,
    bumpMap,
    // specular,
  });
  material.flipY = false;
  const globe = new Mesh(geometry, material);

  const speed = props.speed / 1000;

  globe.rotation.x = 3.2;

  const render = () => {
    globe.rotation.y += speed;
    // globe.rotation.x += speed;
    // console.log('x', globe.rotation.x);
  };
  return {
    globe,
    render,
  };
};
