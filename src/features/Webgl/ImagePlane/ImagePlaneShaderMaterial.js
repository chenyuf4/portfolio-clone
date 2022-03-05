import { ShaderMaterial } from "three";
import { extend } from "@react-three/fiber";

class ImagePlaneShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
      #define PI 3.1415926535897932384626433832795
      varying vec2 vUv;
      uniform float uStrength;
      uniform float boundary;
      uniform float posX;
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
        vec4 j=modelViewMatrix*vec4(position.xy,0.,1.);
        float z = 0.;
        float k=abs(distance(j.x,0.));
        if (k <= boundary) {
          z = (boundary - zIndexFn(k / boundary) * boundary) * uStrength;
        }
        gl_Position = projectionMatrix * vec4(j.xy,j.z+z,j.w);
        vUv = uv;
      }`,
      fragmentShader: `
      uniform sampler2D tex;
      varying vec2 vUv;
      void main() {
        float x = vUv.x;
        float y = vUv.y;
        gl_FragColor = texture2D(tex, vec2(x * 0.26 * 696./1219.0 + 0.5 - 0.13 * 696./1219.0, y));
      }`,
      uniforms: {
        tex: { value: null },
        uStrength: { value: 0 },
        boundary: { value: 0 },
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

  set boundary(value) {
    this.uniforms.boundary.value = value;
  }

  get boundary() {
    return this.uniforms.boundary.value;
  }
}

extend({ ImagePlaneShaderMaterial });
