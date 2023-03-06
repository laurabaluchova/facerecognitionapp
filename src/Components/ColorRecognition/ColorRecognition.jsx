import React from 'react';
import ColorSwatch from '../ColorSwatch/ColorSwatch';
import Rank from '../Rank/Rank';
import ImageLinkForm from '../ImageLInkForm/ImageLinkForm';
import './ColorRecognition.css';
import ParticlesBg from 'particles-bg';

const  ColorRecognition = ({imageUrl, module, imageColors, user, onInputChange, onSubmit}) => {    
  return (        
    <div>
    <ParticlesBg type="cobweb" bg={true} color="#5E2CA5" />      
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