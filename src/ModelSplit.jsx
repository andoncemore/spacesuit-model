import { useState, useRef } from 'react'
import WipeSlider from './WipeSlider';
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, View } from '@react-three/drei'
import * as THREE from 'three';

function ModelSplit({geometry, material, texture}) {
    const [position, setPosition] = useState(50);
    const view1 = useRef();
    const view2 = useRef();

    return (
    <div className="object" style={{display: 'flex'}}>
        <div className="control">
            <WipeSlider value={position} onValueChange={setPosition} />
        </div>
        <div className="side" style={{width: `calc(${position}% + ${(10-0.2*position)}px)`}} ref={view1}></div>
        <div className="side" style={{width: `calc(${100 - position}% - ${(10-0.2*position)}px)`}} ref={view2}></div>
        <Canvas camera={{ fov: 60, near: 0.1, far: 1000, position: [0, 0, 1] }} linear={true} className="canvas">
            <View track={view1}>
                <color attach="background" args={['lightpink']} />
                <Scene />
                <Model geometry={geometry} material={material} />
            </View>
            <View track={view2}>
                <Scene />
                <Model geometry={geometry} material={new THREE.MeshStandardMaterial({wireframe: true})} />
            </View>
        </Canvas>

    </div>
    )
}

function Scene(){
    return(
        <>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {/* <OrbitControls 
                autoRotate={true} 
                enablePan={false} 
                enableZoom={false}
                maxPolarAngle={Math.PI/2}
                minPolarAngle={Math.PI/2}
                autoRotateSpeed={0.5}
             /> */}
        </>

    )
}


function Model({geometry, material}){
    // useFrame((state, delta) => (ref.current.rotation.y += 0.003))
    const ref = useRef();
    // calculateScale();
    function calculateScale(){
        let bbox = geometry.boundingBox;
        let cent = bbox.getCenter(new THREE.Vector3());
        let size = bbox.getSize(new THREE.Vector3());
        let maxAxis = Math.max(size.x, size.y, size.z);
        cent.multiplyScalar(-0.95/maxAxis);
        
        return (
            <mesh 
                ref={ref} 
                scale={0.95/maxAxis}
                position={cent}
                geometry={geometry}
                material={material}
            />
        )
    }

    return(

        calculateScale()
    )
}

export default ModelSplit;
