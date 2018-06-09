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
import globe from './globe';

export default () => {
  const scene = new Scene();

  scene.add(globe);
  scene.add(light);

  return scene;
};
