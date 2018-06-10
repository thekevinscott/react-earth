import fs from 'fs';
import {
  Mesh,
  SphereGeometry,
  MeshPhongMaterial,
  Texture,
  DoubleSide,
  MeshBasicMaterial,
  MeshNormalMaterial,
  Scene,
  Raycaster,
  Geometry,
  Vector3,
  Vector2,
  Math as Math3,
  PointsMaterial,
  Points,
  Color,
  BoxGeometry,
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  TextureLoader,
} from 'three';
import {
  // loadTextureFromBuffer,
  loadTextureFromUrl,
} from '../utils/texture';

// const textureBuffers = {
//   texture: fs.readFileSync(__dirname + '/../../assets/earthmap1k.jpg').buffer,
//   bump: fs.readFileSync(__dirname + '/../../assets/earthbump1k.jpg').buffer,
//   spec: fs.readFileSync(__dirname + '/../../assets/earthspec1k.jpg').buffer,
//   cloud: fs.readFileSync(__dirname + '/../../assets/earthcloudmap.jpg').buffer,
// };

const circle = require('../../assets/circle.png');
const getDefaultTextures = ({ showClouds }) => {
  const defaultTextures = {
    map: 'https://thekevinscott.github.io/react-earth/assets/map.jpg',
    bumpMap: 'https://thekevinscott.github.io/react-earth/assets/bump.jpg',
    specular: 'https://thekevinscott.github.io/react-earth/assets/spec.jpg',
  };

  if (showClouds) {
    return {
      ...defaultTextures,
      cloud: 'https://thekevinscott.github.io/react-earth/assets/earthcloudmap.jpg',
    };
  }

  return defaultTextures;
};

const loadTextures = (props) => Object.entries({
  ...getDefaultTextures(props),
  ...props.textures,
}).reduce((promise, [key, val]) => promise.then(textures => {
  return loadTextureFromUrl(val).then(texture => ({
    ...textures,
    [key]: texture,
  }));
}), Promise.resolve());

let props;
let material;
let globe;
let cloudMesh;
let dots;
let mouse;
let camera;
let GLOBE_INTERSECTED, CITY_INTERSECTED;
let node;
let raycaster, intersects;

const RADIUS = 0.4;

function onDocumentMouseMove( event ) {
  if (mouse) {
    event.preventDefault();
    const width = node.clientWidth;
    const height = node.clientHeight;
    mouse.x = ((event.clientX - node.offsetLeft) / width) * 2 - 1;
    mouse.y = -((event.clientY - node.offsetTop) / height) * 2 + 1;
  }
}

const getCitiesGeometry = (props) => {
  const dotGeometry = new Geometry();
  const sprite = new TextureLoader().load(circle);
  const dotMaterial = new PointsMaterial({
    size: props.citySize,
    sizeAttenuation: false,
    alphaTest: 0.5,
    transparent: true,
    map: sprite,
  });

  dotMaterial.color.setHSL(Math.random(), 0.5, 0.5);

  props.cities.map(({ lat, lng }) => {
    const cosLat = Math.cos(lat * Math.PI / 180.0);
    const sinLat = Math.sin(lat * Math.PI / 180.0);
    const cosLon = Math.cos(lng * Math.PI / 180.0);
    const sinLon = Math.sin(lng * Math.PI / 180.0);
    const x = (RADIUS * 1.025) * cosLat * cosLon;
    const y = (RADIUS * 1.025) * cosLat * sinLon;
    const z = (RADIUS * 1.025) * sinLat;
    dotGeometry.vertices.push(new Vector3(x, y, z));
  });

  const points = new Points( dotGeometry, dotMaterial );
  return points;
};

export default async (_props, _camera, _node) => {
  camera = _camera;
  node = _node;
  props = _props;
  const slices = 50;
  const geometry = new SphereGeometry(RADIUS, slices, slices);
  const {
    map,
    bumpMap,
    specular,
    cloud,
  } = await loadTextures(props);

  material = new MeshPhongMaterial({
    map,
    bumpMap,
    bumpScale: props.bumpScale,
    specular,
  });
  globe = new Mesh(geometry, material);

  if (props.showClouds) {
    const cloudGeometry = new SphereGeometry(RADIUS * 1.02, slices, slices)
    const cloudMaterial = new MeshPhongMaterial({
      map: cloud,
      side: DoubleSide,
      transparent : true,
      depthWrite : false,
      opacity: props.cloudOpacity,
    })
    cloudMesh = new Mesh(cloudGeometry, cloudMaterial)
    globe.add(cloudMesh);
  }

  if (props.cities) {
    dots = getCitiesGeometry(props);
    globe.add(dots);
  }

  const render = () => {
    const speed = props.speed / 1000;
    if (!GLOBE_INTERSECTED) {
      globe.rotation.y -= speed;
    }

    if (mouse.x > -1 && mouse.x < 1 && mouse.y > -1 && mouse.y < 1) {
      raycaster.setFromCamera( mouse, camera );

      GLOBE_INTERSECTED = raycaster.intersectObject(globe).length > 0;

      intersects = raycaster.intersectObject(dots);
      const intersecting = (intersects.filter(intersect => {
        return intersect.distanceToRay < 0.01;
      }).shift() || {}).index;


      if (CITY_INTERSECTED !== intersecting) {
        if (intersecting) {
          props.onCityMouseOver(props.cities[intersecting]);
        } else {
          props.onCityMouseOut(props.cities[CITY_INTERSECTED]);
        }
        CITY_INTERSECTED = intersecting;
      }
    }
  };

  document.removeEventListener( 'mousemove', onDocumentMouseMove);
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  raycaster = new Raycaster();
  mouse = new Vector2();
  const width = node.clientWidth;
  const height = node.clientHeight;
  mouse.x = ((event.clientX - node.offsetLeft) / width) * 2 - 1;
  mouse.y = -((event.clientY - node.offsetTop) / height) * 2 + 1;
  return {
    geometry,
    globe,
    render,
  };
};

export const update = _props => {
  if (JSON.stringify(props) !== JSON.stringify(_props)) {
    document.removeEventListener( 'mousemove', onDocumentMouseMove);
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    globe.material.bumpScale = props.bumpScale;
    cloudMesh.material.opacity = props.cloudOpacity;
    globe.material.needsUpdate = true;
    cloudMesh.material.needsUpdate = true;
    if (props.showClouds === false && _props.showClouds === true) {
      globe.add(cloudMesh);
    } else if (props.showClouds === true && _props.showClouds === false) {
      globe.remove(cloudMesh);
    }

    if (JSON.stringify({
      cities: props.cities,
      citySize: props.citySize,
    }) !== JSON.stringify({
      cities: _props.cities,
      citySize: _props.citySize,
    })) {
      globe.remove(dots);
      dots = getCitiesGeometry(props);
      globe.add(dots);
    }
    props = _props;
  }
};
