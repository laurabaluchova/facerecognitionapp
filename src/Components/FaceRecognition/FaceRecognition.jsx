import React from 'react';
import './FaceRecognition.css';
import ColorSwatch from '../ColorSwatch/ColorSwatch';
import Rank from '../Rank/Rank';
import ImageLinkForm from '../ImageLInkForm/ImageLinkForm';

const  FaceRecognition = ({imageUrl, box, module, imageColors, user, onInputChange, onSubmit}) => {    
  return (
    <div>
    <Rank name={user.name} entries={user.entries}/> 
    <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} module={module} /> 
    <div className='center ma '>
    <div className='absolute mt4'>          

    {module.id === "color-recognition"
    ? <ColorSwatch imageColor={imageColors} module={module}/>   
    : console.log("kekeke")}  
    
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