import React from 'react';

const  ColorSwatch = () => {
    return (

<div className="flex flex-column">        
        <input className="color w-50 center" type="color" name="color2" value="#ff0000"/>        
        <h1 className="f5">Dominant color: hex code</h1>        
    </div> 
    )
}

export default ColorSwatch;