import {
  Scene,
  Geometry,
  Vector3,
  Math as Math3,
  PointsMaterial,
  Points,
  Color,
  BoxGeometry,
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  TextureLoader,
  MeshBasicMaterial,
} from 'three';

import light from './light';
import getGlobe, { update } from './globe';
export default async (render, camera, props, node) => {
  const scene = new Scene();

  const {
    globe,
    render: globeRender,
  } = await getGlobe(props, camera, node);
  render.add(globeRender);
  scene.add(globe);
  scene.add(light);
  return scene;
};

export { update } from './globe';
