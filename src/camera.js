import {
  PerspectiveCamera,
} from 'three';

export default async (width, height) => {
  const camera = new PerspectiveCamera(70, width / height, 0.1, 10);
  camera.position.z = 1;
  return camera;
};
