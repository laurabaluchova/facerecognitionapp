import React from 'react';
import './FaceRecognition.css';
import ColorSwatch from '../ColorSwatch/ColorSwatch';

const  FaceRecognition = ({imageUrl, box, module, imageColors}) => {
  return (
    <div className='center ma '>
    <div className='absolute mt4'>          

    <ColorSwatch imageColor={imageColors}/> 
    
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
  )
}

export default FaceRecognition;