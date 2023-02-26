import React from 'react'

const  Navigation = ( {onRouteChange, isSignedIn, changeModule}) => {
  
    if (isSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <div style={{marginRight: 'auto', display: "flex"}}>
                    <p onClick={() => changeModule('face-detection')} className='f3 link b dim pa2 pr4 pointer white pa2'>Face Recognition</p>
                    <p onClick={() => changeModule('color-recognition')} className='f3 link dim b pa2 pointer white pa2'>Color Recognition</p>
                </div>  
                <p onClick={() => onRouteChange('signout')} className='f3 link dim underline pa2 pointer white'>Sign Out</p>
            </nav>
        );
    } else {
        return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>                      
            <p onClick={() => onRouteChange('signin')} className='f3 link dim underline pa2 pointer white'>Sign In</p>
            <p onClick={() => onRouteChange('register')} className='f3 link dim underline pa2 pointer white'>Register </p>                         
             </nav>        
        );    
    }
}

export default Navigation;