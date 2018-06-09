import {
  Mesh,
  SphereGeometry,
  MeshBasicMaterial,
} from 'three';
import texture from '../../assets/earthmap1k.jpg';
import bump from '../../assets/earthbump1k.jpg';
import spec from '../../assets/earthspec1k.jpg';
import canvasCloud from '../../assets/earthcloudmap.jpg';
import Texture from '../utils/texture';

export default async (props) => {
  const geometry = new SphereGeometry(0.5, 50, 50);
  const map = await Texture(texture);
  const bumpMap = await Texture(bump, {
    bumpScale: 1.15,
  });
  const specular = await Texture(spec);

  const material2 = new MeshBasicMaterial({
    map,
    // bumpMap,
    // specular,
  });
  const globe = new Mesh(geometry, material2);

  const speed = props.speed / 1000;

  const render = () => {
    globe.rotation.y += speed;
  };
  return {
    globe,
    render,
  };
};
