import React from 'react';
import ColorSwatch from '../ColorSwatch/ColorSwatch';
import Rank from '../Rank/Rank';
import ImageLinkForm from '../ImageLInkForm/ImageLinkForm';

const  ColorRecognition = ({imageUrl, module, imageColors, user, onInputChange, onSubmit}) => {    
  return (    
    <div>
    <Rank name={user.name} entries={user.entries}/> 
    <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} module={module} /> 
    <div className='center ma '>
    <div className='absolute mt4'>
    
    {imageUrl != "" 
    ? <ColorSwatch imageColors={imageColors}/> 
    : console.log("kekeke")}
    
    <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'></img> 
    <p>{imageColors}</p>    
    </div>       
        
        </div>
   </div>   
  )
}

export default ColorRecognition;