import React from 'react'
import { NavLink, useResolvedPath, useMatch } from "react-router-dom"
import "./navigation.css"

export default function  Navigation ( {onRouteChange, isSignedIn, changeModule}) { 
    
    if (isSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <ul style={{marginRight: 'auto', display: "flex"}}>
                    <NavLink to="/facerecognition" onClick={() => changeModule('face-detection')} className='f3 link b dim pa2 pr4 pointer white pa2'>Face Recognition</NavLink>
                    <NavLink to="/colorrecognition" onClick={() => changeModule('color-recognition')} className='f3 link dim b pa2 pointer white pa2'>Color Recognition</NavLink>
                </ul>  
                <p onClick={() => onRouteChange('signout')} className='f3 link dim underline pa2 pointer white'>Sign Out</p>
            </nav>
        );
    } else {
        return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>                      
            <NavLink to="/signin" onClick={() => onRouteChange('signin')} className='f3 dim underline pa2 pointer white'>Sign In</NavLink>
            <NavLink to="/register" onClick={() => onRouteChange('register')} className='f3 dim underline pa2 pointer white'>Register </NavLink>                         
             </nav>        
        );    
    }} 

    // function CustomLink({ to, children, ...props }) {
    //     const resolvedPath = useResolvedPath(to)
    //     const isActive = useMatch({ path: resolvedPath.pathname, end: true })
      
    //     return (
    //       <li className={isActive ? "active" : ""}>
    //         <Link to={to} {...props}>
    //           {children}
    //         </Link>
    //       </li>
    //     )
    //     }