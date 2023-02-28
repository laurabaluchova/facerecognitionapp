import React, {useEffect} from 'react';

const  ColorSwatch = (imageColors) => {   
    return (

<div className="flex flex-column">        
        <input className="color w-50 center" type="color" name="color2" value={imageColors.imageColor}/>   
        <h1 className="f5">Dominant color: {imageColors.imageColor}</h1>        
    </div> 
    )
} 

export default ColorSwatch;