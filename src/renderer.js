import {
  WebGLRenderer,
} from 'three';
import getScene from './scene';
import getCamera from './camera';

export default async (node, props) => {
  const width = node.clientWidth;
  const height = node.clientHeight;
  const renderer = new WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(width, height);
  node.appendChild( renderer.domElement );

  const scene = await getScene(addRenderer, props);
  const camera = await getCamera(width, height);
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

// import {
//   WebGLRenderer,
// } from 'three';
// import getScene from './scene';
// import getCamera from './camera';

// export default async node => {
//   const width = node.clientWidth;
//   const height = node.clientHeight;
//   const renderer = new WebGLRenderer({
//     antialias: true,
//   });
//   renderer.setSize(width, height);
//   node.appendChild( renderer.domElement );

//   const scene = await getScene();
//   const camera = await getCamera(width, height);
//   renderer.render(scene, camera);
// };
