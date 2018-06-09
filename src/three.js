import React, { Component } from 'react';

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
  DirectionalLight,
  DoubleSide,
  Texture,
  NearestFilter,
  LinearFilter,
  LinearMipMapLinearFilter,
} from 'three';

import texture from '../assets/earthmap1k.jpg';
import bump from '../assets/earthbump1k.jpg';
import spec from '../assets/earthspec1k.jpg';
import canvasCloud from '../assets/earthcloudmap.jpg';

let mesh, renderer, scene, camera;

init();
animate();

function init() {
const getCloudMesh = () => {
  const geometry   = new SphereGeometry(0.51, 32, 32)
  const material  = new MeshPhongMaterial({
    map     : new Texture(canvasCloud),
    side        : DoubleSide,
    opacity     : 0.8,
    transparent : true,
    depthWrite  : false,
  })
  const cloudMesh = new Mesh(geometry, material)
  return cloudMesh;
};


  camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
  camera.position.z = 1;

  scene = new Scene();

renderer = new WebGLRenderer({
  antialias: true,
  canvas: document.querySelector("domE"),
});
  renderer.setSize( window.innerWidth, window.innerHeight );

  const geometry = new SphereGeometry(0.5, 50, 50);
  const map = new TextureLoader().load(texture);
  map.magFilter = NearestFilter;
  map.minFilter = LinearFilter;
  const bumpMap = new TextureLoader().load(bump);
  bumpMap.magFilter = NearestFilter;
  bumpMap.minFilter = LinearFilter;
  const specular = new TextureLoader().load(spec);

const material = new MeshPhongMaterial({
  map,
  // bumpMap,
  // specular,
});
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);
  mesh.add(getCloudMesh());

  const light = new DirectionalLight( 0xffffff );
  light.position.set( 0, 1, 1 ).normalize();
  scene.add(light);
  document.body.appendChild( renderer.domElement );
}

function animate() {

  requestAnimationFrame( animate );

  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.02;

  renderer.render( scene, camera );
}
