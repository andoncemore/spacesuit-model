import styles from './SuitDocumentation.module.css';
import { useState } from 'react'
import ImageSplit from './ImageSplit'

import ModelCanvas from './3dmodel'
import { useGLTF, useTexture } from "@react-three/drei";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader } from '@react-three/fiber'

import suitPhoto from './assets/suit_photo.png'
import suitRaw from './assets/suit_raw.png'
import suitOptimizedMesh from './assets/suit_optimized-mesh.png'
import suitOptimizedMesh2 from './assets/suit_optimized-mesh-2.png'
import suitRigged from './assets/suit_rigged.png'

import { DoubleArrowRightIcon, DoubleArrowLeftIcon } from '@radix-ui/react-icons';



function SuitDocumentation(){

    const [slidePos, setSlidePos] = useState(0);

    const { nodes, materials} = useGLTF('/model.gltf');
    // const [colorMap] = useTexture(['xd5bt7lc5esx.png']); 
    const colorMap = useLoader(TextureLoader, 'xd5bt7lc5esx.png');

    let slides = [
        {
            content: <img src={suitPhoto} alt="Model posing in the Beyond Spacesuit, in real life." />,
            title: 'Suit Photography',
            description: "Taking pictures of the suit from all angles."
        },
        {
            content: <img src={suitRaw} alt="Raw mesh output from the photogrametry process." />,
            title: 'Initial Photogrametry',
            description: "Converting images into a high-polygon mesh to use as a base for modeling."
        },
        {
            content: <ImageSplit image1={suitOptimizedMesh} image2={suitOptimizedMesh2} />,
            title: 'Mesh Optimization',
            description: "Making the modeled asset easier to download by simplifying the mesh and transferring deails to a normal map."
        },
        {
            content: <img src={suitRigged} alt="Raw mesh output from the photogrametry process." />,
            title: 'Rigging',
            description: "Creating a bone structure and painting vertex weights to allow the mesh to deform correctly with animation."
        },
        {
            content: <ModelCanvas geometry={nodes['SUIT-lowpoly005_1'].geometry} texture={colorMap} material={materials.Mat} />,
            title: 'Re-UV Mapping',
            description: "Re-projecting UVs and baking textures to make indexing artworks using the UV map easier."
        },
        {
            content: <ModelCanvas geometry={nodes['SUIT-lowpoly005_1'].geometry} material={materials.Mat} />,
            title: 'Final Suit Model',
            description: "Final model, texture, and rigging ready for use within an Interactive Experience."
        }
    ]

    return(
        <div className={styles.container}>
            <div className={styles.carousel} style={{transform: `translateX(calc(50vw - ${100/(slides.length*2)*(slidePos*2+1)}%))`}} >
                {slides.map((slide, index) => 
                    <div className={`${styles.slide} ${index==slidePos ?  styles.visible: ''}`} key={index}>
                        <div className={styles.content}>{slide.content}</div>
                        <div className={styles.description} >
                            <h2>{slide.title}</h2>
                            <p>{slide.description}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.controls}>
                <button className={styles.button} disabled={slidePos == 0} onClick={() => setSlidePos(Math.max(0, slidePos-1)) }><DoubleArrowLeftIcon /></button>
                <button className={styles.button} disabled={slidePos == slides.length-1} onClick={() => setSlidePos(Math.min(slides.length-1, slidePos+1)) }><DoubleArrowRightIcon /></button>
            </div>
        </div>
    )
}

useGLTF.preload("/model.gltf");

export default SuitDocumentation;