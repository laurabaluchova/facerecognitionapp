import React from 'react';
import './FaceRecognition.css';

const  FaceRecognition = ({imageUrl, box}) => {
  return (
   <div className='flex-center'>
    <div className='absolute mt2'>
    <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'></img>

    {box.map((item) => (
            <div
              key={item.bottomRow}
              className='bounding_box'
              style={{
                top: item.topRow,
                right: item.rightCol,
                bottom: item.bottomRow,
                left: item.leftCol,
              }}
            ></div>))}  
   </div>
   </div>
  )
}

export default FaceRecognition;