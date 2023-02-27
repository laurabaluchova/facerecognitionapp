import React from 'react';
import './ImageLinkForm.css';

const  ImageLinkForm = ({onInputChange, onSubmit, module}) => {    
  return (
    <div>
        <p className='f4'>          
            {`Detect ${module.name} in your pictures with this Magic Brain App`}
        </p>
        <p className='f5 i'>
            {`Insert image URL to detect ${module.name}`}
        </p>
        <div className='center '>
            <div className='form center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='text' placeholder="Insert image URL here" onChange={onInputChange}  />
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-black'
                onClick={onSubmit}
                >Detect</button>                
             </div>
        </div>
    </div>    
  )
}

export default ImageLinkForm;