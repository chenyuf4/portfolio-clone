import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "../Scene/Scene";
const CanvasBlock = ({
  scrollPosRef,
  isScrolling,
  setIsScrolling,
  zPosRef,
}) => {
  return (
    <Canvas
      colorManagement
      dpr={Math.max(window.devicePixelRatio, 2)}
      linear={true}
      flat={true}
      gl={{
        antialias: true,
        alpha: false,
        shadowMap: true,
      }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
          near={0.1}
          far={100}
          fov={75}
        />
        <color attach="background" args={["#151515"]} />
        <Scene
          scrollPosRef={scrollPosRef}
          zPosRef={zPosRef}
          isScrolling={isScrolling}
          setIsScrolling={setIsScrolling}
        />
      </Suspense>
    </Canvas>
  );
};

export default CanvasBlock;
