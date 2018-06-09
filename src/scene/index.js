import {
  Scene,
  // Color,
} from 'three';

import light from './light';
import getGlobe from './globe';

export default async (render, props) => {
  const scene = new Scene();

  const { globe, render: globeRender } = await getGlobe(props);
  render.add(globeRender);
  scene.add(globe);
  scene.add(light);

  return scene;
};
