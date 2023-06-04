import ParticlesBg from 'particles-bg';
import React from 'react';
import ColorSwatch from '../ColorSwatch/ColorSwatch';
import ImageLinkForm from '../ImageLInkForm/ImageLinkForm';
import Rank from '../Rank/Rank';
import './ColorRecognition.css';

const  ColorRecognition = ({imageUrl, module, imageColors, user, onInputChange, onSubmit, input, cursor,  validateUrl}) => {    
  return (        
    <div>
    <ParticlesBg type="cobweb" bg={true} color="#5E2CA5" />      
    <Rank name={user.name} module={module}/> 
    <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} module={module} input={input} cursor={cursor} /> 
    <div className='center ma '>
    <div className='absolute mt4'>
    
    {validateUrl(imageUrl) && <ColorSwatch imageColors={imageColors}/>}
    
    {validateUrl(imageUrl) && <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'></img>}       
    </div>       
        
        </div>
   </div>   
  )
}

export default ColorRecognition;