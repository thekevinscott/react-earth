import {
  DirectionalLight,
} from 'three';

const light = new DirectionalLight( 0xffffff );
light.position.set( 0, 1, 1 ).normalize();

export default light;
