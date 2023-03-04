import React from 'react';

const  ColorSwatch = ({imageColors}) => {       
    return (
<div className="flex flex-column">        
        <input className="color w-50 center" type="color" name="color2" value={imageColors}/>   
        <h1 className="f5">Dominant color: {imageColors}</h1>               
    </div> 
    ) }

export default ColorSwatch;