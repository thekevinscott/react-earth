import {
  WebGLRenderer,
  PerspectiveCamera,
  BoxGeometry,
  Mesh,
  MeshNormalMaterial,
  Scene,
  SphereGeometry,
  MeshPhongMaterial,
  ImageUtils,
  MeshBasicMaterial,
  TextureLoader,
  DoubleSide,
  Texture,
  NearestFilter,
  LinearFilter,
  LinearMipMapLinearFilter,
} from 'three';

import light from './light';
import getGlobe from './globe';

export default async (render, props) => {
  console.log('scene 1');
  const scene = new Scene();

  console.log('scene 2');
  const { globe, render: globeRender } = await getGlobe(props);
  console.log('scene 3');
  render.add(globeRender);
  scene.add(globe);
  scene.add(light);

  return scene;
};
