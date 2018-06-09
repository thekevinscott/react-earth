import {
  WebGLRenderer,
} from 'three';
import scene from './scene';
import camera from './camera';

export default node => {
  const width = node.clientWidth;
  const height = node.clientHeight;
  const renderer = new WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(width, height);
  node.appendChild( renderer.domElement );

  renderer.render(scene(width, height), camera(width, height));
};
