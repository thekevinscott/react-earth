import {
  WebGLRenderer,
} from 'three';
import getScene from './scene';
import getCamera from './camera';

let camera, renderer;
export default async (node, props) => {
  if (!node) {
    return;
  }
  const width = node.clientWidth;
  const height = node.clientHeight;

  renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setClearColor( 0x000000, 0 ); // the default
  renderer.setSize(width, height);
  node.appendChild( renderer.domElement );

  const scene = await getScene(addRenderer, props);
  camera = await getCamera(width, height);
  render(() => {
    renderer.render(scene, camera);
  })();
};

const addRenderer = {
  add: fn => {
    renderers.push(fn);
  },
};

const renderers = [];

const render = (callback) => () => {
  requestAnimationFrame(render(callback));
  renderers.forEach(fn => fn());
  callback();
}
const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
export const resize = async (width, height) => {
  if (renderer && camera) {
    // console.log('resizing to', width, height);
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    return;
  }

  await timeout(50);
  return await resize(width, height);
};
