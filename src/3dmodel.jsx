import { useState, useRef, useLayoutEffect } from 'react'
import WipeSlider from './WipeSlider';
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three';

function ModelCanvas({geometry, material, texture}) {
    const [position, setPosition] = useState(50);
    if(texture){
        material = new THREE.MeshBasicMaterial({ map: texture });
    }
    // const canvasStyle = {
    //     width: '100%',
    //     height: '100%',
    //     position: 'absolute !important',
    //     top: 0,
    //     left: 0
    // }

    useLayoutEffect(() => {
        console.log("Yes");
    },[])


    return (
    <div style={{aspectRatio: '1 / 1'}}>
        <Canvas camera={{ fov: 60, near: 0.1, far: 1000, position: [0, 0, 1] }} linear={true}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} />
            <Model geometry={geometry} material={material} />
            <OrbitControls 
                autoRotate={true} 
                enablePan={false} 
                enableZoom={false}
                maxPolarAngle={Math.PI/2}
                minPolarAngle={Math.PI/2}
                autoRotateSpeed={0.5}
             />
            {/* <mesh>
                <boxGeometry args={[1,1,1]} />
                <meshStandardMaterial color={'hotpink'} />
            </mesh> */}
        </Canvas>
        {/* <div className="control">
            <WipeSlider value={position} onValueChange={setPosition} />
        </div> */}
    </div>
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

export default ModelCanvas;
