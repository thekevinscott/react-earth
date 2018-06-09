import {
  WebGLRenderer,
} from 'three';
import getScene from './scene';
import getCamera from './camera';

export default async (node, props) => {
  console.log('beginning render', node);
  if (!node) {
    console.log('hey, you must supply a node');
    return;
  }
  const width = node.clientWidth;
  const height = node.clientHeight;
  const renderer = new WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(width, height);
  node.appendChild( renderer.domElement );

  console.log('get ready');
  const scene = await getScene(addRenderer, props);
  console.log('get ready 2');
  const camera = await getCamera(width, height);
  console.log('get ready 3');
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
