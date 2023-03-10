import React from 'react';
import './FaceRecognition.css';
import ColorSwatch from '../ColorSwatch/ColorSwatch';
import Rank from '../Rank/Rank';
import ImageLinkForm from '../ImageLInkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg';

const  FaceRecognition = ({imageUrl, box, module, imageColors, user, onInputChange, onSubmit, input, isGoogleUser, 
  isLoading, setIsLoading, cursor, setCursor, changeCursor}) => {    
  return (
    <div>
    <ParticlesBg type="cobweb" bg={true} color="#FFB700" />
    <Rank name={user.name} entries={user.entries} isGoogleUser={isGoogleUser} module={module}/> 
    <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} module={module} input={input} isGoogleUser={isGoogleUser} 
    isLoading={isLoading} setIsLoading={setIsLoading} cursor={cursor} setCursor={setCursor} changeCursor={changeCursor}/> 
    <div className='center ma '>
    <div className='absolute mt4'>    
    
    <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'></img>
     {
        box.map(item => (
            <div
                key={`box${item.topRow}${item.rightCol}`}
                className='bounding_box'
                style={{
                    top: item.topRow,
                    right: item.rightCol,
                    bottom: item.bottomRow,
                    left: item.leftCol,
                }}
            ></div>
        
        )) } 
        </div>
   </div>
   </div>
  )
}

export default FaceRecognition;