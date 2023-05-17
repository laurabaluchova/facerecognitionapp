import React from 'react';
import ColorSwatch from '../ColorSwatch/ColorSwatch';
import Rank from '../Rank/Rank';
import ImageLinkForm from '../ImageLInkForm/ImageLinkForm';
import './ColorRecognition.css';
import ParticlesBg from 'particles-bg';

const  ColorRecognition = ({imageUrl, module, imageColors, user, onInputChange, onSubmit, input, isGoogleUser,
  isLoading, setIsLoading, cursor, setCursor, validateUrl}) => {    
  return (        
    <div>
    <ParticlesBg type="cobweb" bg={true} color="#5E2CA5" />      
    <Rank name={user.name} entries={user.entries} module={module} isGoogleUser={isGoogleUser}/> 
    <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} module={module} input={input} isGoogleUser={isGoogleUser}
    isLoading={isLoading} setIsLoading={setIsLoading} cursor={cursor} setCursor={setCursor} /> 
    <div className='center ma '>
    <div className='absolute mt4'>
    
    {validateUrl(imageUrl) && <ColorSwatch imageColors={imageColors}/>}
    
    <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'></img>         
    </div>       
        
        </div>
   </div>   
  )
}

export default ColorRecognition;