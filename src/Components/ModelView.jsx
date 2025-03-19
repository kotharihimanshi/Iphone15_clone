import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Html, View, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Lights from "./Lights";
import Iphone from "./Iphone";
import * as THREE from 'three';
import Loader from "./Loader";
import Model from "./Model";

const ModelView = ({ index, groupRef,gsapType,  controlRef, item, size, setRotationState }) => {
  return (
    <Canvas
        index={index}
        id={gsapType}
        className={`w-full h-full absolute ${index === 2 ? 'right-[100%]' : ''}`}
    >
     
        <ambientLight intensity={0.3} />
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />
        <Lights />

        <OrbitControls
          makeDefault
          ref={controlRef}
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
          target={new THREE.Vector3(0, 0, 0)}
          onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
        />
        <group ref={groupRef} name={`${index === 1 ? 'small' : 'large'}`}>
          <Suspense fallback={<Loader />}>
            
            <Iphone
              scale = {index === 1 ? [15, 15, 15] : [17, 17, 17]}
              item={item}
              size={size}
            />
            

          </Suspense>
        </group>
      
    </Canvas>
  );
};

export default ModelView;



