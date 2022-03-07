import { ShaderMaterial } from "three";
import { extend } from "@react-three/fiber";
import {
  IMAGE_BLOCK_HEIGHT,
  IMAGE_BLOCK_WIDTH,
  IMAGE_DIMENSION,
} from "utils/format";

class ImagePlaneShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
      #define PI 3.1415926535897932384626433832795
      varying vec2 vUv;
      uniform float uStrength;
      uniform float rStrength;
      uniform float boundary;
      uniform float posX;
      uniform float rotateDegree;
      varying float zOffset;
      float zIndexFn(float inputVal) {
        if (inputVal < 0.5) {
          return 2.0 * inputVal * inputVal;
        }
        if (inputVal > 1.5) {
          return 2.0 * (inputVal - 2.0) * (inputVal - 2.0);
        }
        return -1. + (4.0 - 2.0 * inputVal ) * inputVal;
      }
      void main() {
        float z = 0.;
        if (abs(posX) <= boundary) {
          z = (boundary - zIndexFn(abs(posX) / boundary) * boundary) * uStrength;
        }
        mat4 translationMatrix = mat4(vec4(1., 0., 0., 0.),
        vec4(0., 1., 0., 0.),
        vec4(0., 0., 1., 0.),
        vec4(0., 0., z, 1.));

        float rotateDegreeValue = rotateDegree * uStrength;
        mat4 rotateMatrix =  mat4(vec4(cos(rotateDegreeValue), 0., sin(rotateDegreeValue), 0.),
        vec4(0., 1., 0., 0.),
        vec4(-sin(rotateDegreeValue), 0., cos(rotateDegreeValue), 0.0),
        vec4(0., 0., 0., 1.));

        gl_Position = projectionMatrix *  modelViewMatrix * translationMatrix * rotateMatrix * vec4(position.xy, 0.0, 1.0);
        vUv = uv;
        zOffset = min(z * 0.5, 0.7);
      }`,
      fragmentShader: `
      uniform sampler2D tex;
      varying vec2 vUv;
      uniform vec2 planeDimension;
      varying float zOffset;
      void main() {
        vec4 s = vec4(0.07843, 0.07843, 0.07843, 1.);
        float x = vUv.x;
        float y = vUv.y;
        vec4 imageTexture = texture2D(tex, vec2((x - 0.5) * planeDimension.x + 0.5, (y - 0.5) * planeDimension.y + 0.5));
        float greyColor = (imageTexture.r + imageTexture.g + imageTexture.b) / 5.0;
        vec4 res = mix(vec4(greyColor,greyColor,greyColor,1.), imageTexture, zOffset + 0.1);
        res = mix(res, res * s, 0.);
        gl_FragColor = res;
      }`,
      uniforms: {
        tex: { value: null },
        uStrength: { value: 0 },
        boundary: { value: 0 },
        rotateDegree: { value: 0 },
        rStrength: { value: 0 },
        posX: { value: 0 },
        planeDimension: {
          value: [
            ((IMAGE_BLOCK_WIDTH / IMAGE_BLOCK_HEIGHT) *
              IMAGE_DIMENSION.height) /
              IMAGE_DIMENSION.width,
            1,
          ],
        },
      },
    });
  }

  set tex(value) {
    this.uniforms.tex.value = value;
  }

  get tex() {
    return this.uniforms.tex.value;
  }

  set uStrength(value) {
    this.uniforms.uStrength.value = value;
  }

  get uStrength() {
    return this.uniforms.uStrength.value;
  }

  set rStrength(value) {
    this.uniforms.rStrength.value = value;
  }

  get rStrength() {
    return this.uniforms.rStrength.value;
  }

  set boundary(value) {
    this.uniforms.boundary.value = value;
  }

  get boundary() {
    return this.uniforms.boundary.value;
  }

  get rotateDegree() {
    return this.uniforms.rotateDegree.value;
  }
  set rotateDegree(value) {
    this.uniforms.rotateDegree.value = value;
  }

  get posX() {
    return this.uniforms.posX.value;
  }

  set posX(value) {
    this.uniforms.posX.value = value;
  }

  get planeDimension() {
    return this.uniforms.planeDimension.value;
  }

  set planeDimension(value) {
    this.uniforms.planeDimension.value = value;
  }
}

extend({ ImagePlaneShaderMaterial });
