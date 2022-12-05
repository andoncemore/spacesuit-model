import { useState } from 'react'
import WipeSlider from './WipeSlider';
import styles from './ImageSplit.module.css';


function ImageSplit({image1, image2}) {
    const [position, setPosition] = useState(50);


    return (
    <div className={styles.object} style={{display: 'flex'}}>
        <div className={styles.side} style={{width: `calc(${position}% + ${(10-0.2*position)}px)`}}>
            <img src={image1} style={{objectPosition: '0 0'}} />
        </div>
        <div className={styles.side} style={{width: `calc(${100 - position}% - ${(10-0.2*position)}px)`}}>
            <img src={image2} style={{objectPosition: '100% 0'}} />
        </div>
        <div className={styles.control}>
            <WipeSlider value={position} onValueChange={setPosition} className={styles.wipeSlider} thumbStyles={styles.thumb} />
        </div>
    </div>
    )
}

export default ImageSplit;
