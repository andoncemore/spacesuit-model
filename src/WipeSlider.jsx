import * as Slider from '@radix-ui/react-slider';


const WipeSlider = ({value, onValueChange, className, thumbStyles}) => {

    const rootStyle = {
        display: 'flex',
        alignItems: 'center',
        userSelect: 'none',
        touchAction: 'none',
        width: '100%'
    }

    const containerStyle = {
        width: '100%',
        height: '100%'
    }

    // const thumbStyle= {
    //     display: 'block',
    //     width: '20px',
    //     height: '20px',
    //     backgroundColor: 'black',
    //     borderRadius: '15px',
    //     top: '100px',
    //     '&:focus': { boxShadow: `0 0 0 5px hsla(0, 0%, 0%, 0.220)` },
    // }

    const thumbControl = {
        position: 'absolute',
        width: '3px',
        height: '100%',
        backgroundColor: 'black',
        borderRadius: '10px',
        top: '0',
        right: '10px',
        zIndex: -1
    }



    return(
        <Slider.Root style={rootStyle} max={100} step={1} value={[value]} onValueChange={(val) => onValueChange(val[0])} className={className}>
            <Slider.Track>
                <Slider.Range/>
            </Slider.Track>
            <Slider.Thumb  className={thumbStyles}>
                <div style={thumbControl}></div>
            </Slider.Thumb>
        </Slider.Root>
    )
}

export default WipeSlider;