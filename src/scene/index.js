import {
  Scene,
  // Color,
} from 'three';

import light from './light';
import getGlobe, { update } from './globe';

export default async (render, props) => {
  const scene = new Scene();

  const { globe, render: globeRender } = await getGlobe(props);
  render.add(globeRender);
  scene.add(globe);
  scene.add(light);

  return scene;
};

export { update } from './globe';
