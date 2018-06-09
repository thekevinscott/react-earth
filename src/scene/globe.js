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
import texture from '../../assets/earthmap1k.jpg';
import bump from '../../assets/earthbump1k.jpg';
import spec from '../../assets/earthspec1k.jpg';
import canvasCloud from '../../assets/earthcloudmap.jpg';

const geometry = new SphereGeometry(0.5, 50, 50);
const material = new MeshNormalMaterial();
const map = new TextureLoader().load(texture);
map.magFilter = NearestFilter;
map.minFilter = LinearFilter;
const bumpMap = new TextureLoader().load(bump);
bumpMap.magFilter = NearestFilter;
bumpMap.minFilter = LinearFilter;
const specular = new TextureLoader().load(spec);

const material2 = new MeshBasicMaterial({
  map,
  // bumpMap,
  // specular,
});
console.log(texture);
const globe = new Mesh(geometry, material);

export default globe;
