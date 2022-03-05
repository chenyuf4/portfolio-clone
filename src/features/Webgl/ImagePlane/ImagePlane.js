import { IMAGE_BLOCK_HEIGHT, IMAGE_BLOCK_WIDTH, IMAGE_GAP } from "utils/format";
import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import "./ImagePlaneShaderMaterial";
const ImagePlane = ({ imageUrl, index }) => {
  const defaultPos = index * (IMAGE_BLOCK_WIDTH + IMAGE_GAP);
  const imgRef = useRef();
  const [imgTex] = useTexture([imageUrl]);

  return (
    <mesh
      ref={imgRef}
      position={[defaultPos, 0, 0]}
      scale={[IMAGE_BLOCK_WIDTH, IMAGE_BLOCK_HEIGHT, 1]}
    >
      <planeGeometry args={[1, 1, 64, 64]} />
      <imagePlaneShaderMaterial
        boundary={5.5 * IMAGE_BLOCK_WIDTH + 4.5 * IMAGE_GAP}
        tex={imgTex}
      />
    </mesh>
  );
};

export default ImagePlane;
