import React from 'react';
import { Link } from "react-router-dom"
import './ImageLinkForm.css';

const  ImageLinkForm = ({onInputChange, onSubmit, module, input, isGoogleUser, 
  isLoading, setIsLoading, cursor, setCursor, }) => {   
    let isGoogleUserLocalStorage = window.localStorage.getItem('isGoogleUser') === "true"; 
  return (
    <div style={{ cursor: cursor }}>
      {isGoogleUserLocalStorage
      ?
        <p className='f4'>          
            To count your detected images&nbsp;
            <Link to="/register" className='white' >create account here</Link>
         </p>
      : <p className='f4'>          
            {`Detect ${module.name} in your pictures with this Magic Brain App`}
        </p>}
        <p className='f5 i'>
            {`Insert image URL to detect ${module.name}`}
        </p>
        <div className='center '>
            <div className='form center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='text' placeholder="Insert image URL here" value={input} onChange={onInputChange}  />
                <button className='button w-30 grow f4 link ph3 pv2 dib white bg-purple pointer'
                onClick={onSubmit} 
                // style={{ cursor: cursor }}               
                >{isLoading ? "Loading..." : "Detect" }
                </button>                
             </div>
        </div>
    </div>    
  )
}

export default ImageLinkForm;