import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Lights from "./Lights";
import Iphone from "./Iphone";
import Loader from "./Loader";

const ModelView = ({ index, groupRef, gsapType, controlRef, item, size, setRotationState }) => {
  const modelRef = useRef(); // Track the model
  const cameraRef = useRef(); // Track the camera
  const orbitControlsRef = useRef(); // Track controls

  const [currentSize, setCurrentSize] = useState(size);

  // Scale values for small and large models
  const scaleValue = size === "small" ? [10, 10, 10] : [17, 17, 17];

  // ✅ Debugging: Log size changes
  useEffect(() => {
    console.log("Size changed to:", size);
    setCurrentSize(size); // Update local state

    // ✅ Reset model position
    if (modelRef.current) {
      modelRef.current.position.set(0, 0, 0);
    }

    // ✅ Reset camera to keep model in view
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 5);
      cameraRef.current.lookAt(0, 0, 0);
    }

    // ✅ Reset OrbitControls target
    if (orbitControlsRef.current) {
      orbitControlsRef.current.target.set(0, 0, 0);
      orbitControlsRef.current.update();
    }
  }, [size]); // Runs whenever `size` changes

  return (
    <Canvas id={gsapType} className="w-full h-full absolute">
      <ambientLight intensity={0.3} />
      <Lights />
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} />

      <OrbitControls
        makeDefault
        ref={orbitControlsRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(orbitControlsRef.current.getAzimuthalAngle())}
      />

      <group ref={groupRef} position={[0, 0, 0]} name={currentSize === "small" ? "small" : "large"}>
        <Suspense fallback={<Loader />}>
          <Iphone ref={modelRef} scale={scaleValue} item={item} size={currentSize} />
        </Suspense>
      </group>
    </Canvas>
  );
};

export default ModelView;
