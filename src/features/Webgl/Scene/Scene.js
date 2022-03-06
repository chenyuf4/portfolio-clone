import { imagesArr, IMAGE_BLOCK_WIDTH, IMAGE_GAP } from "utils/format";
import ImagePlane from "../ImagePlane/ImagePlane";
import { useCallback, useEffect, useRef } from "react";
import useRefMounted from "hooks/useRefMounted";
import { POS_LERP_FACTOR } from "utils/format";
import * as THREE from "three";
import { rotationAngleFn } from "utils/utilFn";
const { damp, lerp, clamp } = THREE.MathUtils;
const Scene = ({ scrollPosRef, isScrolling, setIsScrolling, zPosRef }) => {
  const imageGroupRef = useRef();
  const mounted = useRefMounted();

  const animationRef = useRef();
  const latencyValue = useRef({
    x: 0,
    rotate: 0,
  });
  const boundary = 5.5 * IMAGE_BLOCK_WIDTH + 4.5 * IMAGE_GAP;
  const updatePlanes = useCallback(() => {
    const { current, target, latency } = scrollPosRef.current;
    let newCurrentPos = current + (target - current) * POS_LERP_FACTOR.SCROLL;
    if (Math.abs(newCurrentPos - target) <= 0.01) {
      newCurrentPos = target;
    }
    const speed = newCurrentPos - current;
    const imagesGroup = imageGroupRef.current.children;

    let latencyDiff = target - latency;
    scrollPosRef.current.latency += latencyDiff * POS_LERP_FACTOR.LATENCY;
    latencyValue.current.x +=
      (latencyDiff - latencyValue.current.x) * POS_LERP_FACTOR.LATENCY;
    latencyValue.current.rotate = clamp(
      scrollPosRef.current.latency / 10,
      -0.5,
      0.5
    );

    const uStrength = Math.min(Math.abs(latencyValue.current.x) / 10, 0.5);
    // update images position
    for (let index = 0; index < imagesGroup.length; index++) {
      const imageMesh = imagesGroup[index];
      const defaultPos = index * (IMAGE_BLOCK_WIDTH + IMAGE_GAP);
      imageMesh.position.x = defaultPos + newCurrentPos;
      const targetRotateDegree = rotationAngleFn(
        Math.abs(imageMesh.position.x) <= boundary
          ? 1 + imageMesh.position.x / boundary
          : 0,
        speed < 0 ? "L" : "R",
        1
      );
      imageMesh.material.uniforms.rotateDegree.value = targetRotateDegree;
      imageMesh.material.uniforms.uStrength.value = uStrength;
      imageMesh.material.uniforms.rStrength.value = latencyValue.current.rotate;
      imageMesh.material.uniforms.posX.value = imageMesh.position.x;
    }
    scrollPosRef.current.current = newCurrentPos;
    if (newCurrentPos === target) {
      setIsScrolling(false);
    } else {
      animationRef.current = window.requestAnimationFrame(updatePlanes);
    }
  }, [boundary, scrollPosRef, setIsScrolling]);

  useEffect(() => {
    if (!mounted.current) return;
    if (!isScrolling) {
      console.log("remove");
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    } else {
      if (!animationRef.current) {
        console.log("add");
        animationRef.current = window.requestAnimationFrame(updatePlanes);
      }
    }
    return () => {
      animationRef.current && window.cancelAnimationFrame(animationRef.current);
    };
  }, [isScrolling, mounted, updatePlanes]);
  return (
    <group ref={imageGroupRef}>
      {imagesArr.map((imgUrl, index) => {
        return <ImagePlane imageUrl={imgUrl} index={index} key={index} />;
      })}
    </group>
  );
};
export default Scene;

// precision highp float;
// attribute vec2 a;
// attribute vec2 b;//vUv
// varying vec2 c;  //vUv
// varying float d;
// uniform mat4 e; projectionMatrix
// uniform mat4 f; modelViewMatrix
// uniform float g;
// uniform float h;
// float i(float m){
//   return m<.5?2.*m*m:-1.+(4.-2.*m)*m;
// }
// void main(){
//   vec4 j=f*vec4(a,0.,1.);
//   float z=0.;
//   float k=abs(distance(j.x,0.));
//   if(k<h){
//     z=(h-i(k/h)*h)*g;
//   }
//   gl_Position=e*vec4(j.xy,j.z+z,j.w);
//   c=b;
//   d=min(z*.005,0.7);
// }

//  "precision highp float;
//  varying float d;
//  varying vec2 c;
//  uniform sampler2D tex;
//  uniform vec2 m;
//  uniform int n;
//  uniform float o;
//  uniform vec3 p;
//  uniform float q;
//  uniform float r;
//  uniform float y;
//  void main(){
//    vec4 s=vec4(p.r,p.g,p.b,1);
//    vec4 t=s;
//    if(n==1){
//      vec4 u=texture2D(tex,vec2((c.x-.5)*m.x+.5,(c.y-.5)*m.y+.5+y));
//      float v=(u.r+u.g+u.b)/3.;
//      t=mix(vec4(v,v,v,.4),u,d+o);
//      t=mix(t,t*s,q);
//      t=vec4(t.rgb,t.a*r);
//     }
//     gl_FragColor = t
//     ;}"
