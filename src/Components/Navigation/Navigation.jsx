import React, { useEffect } from 'react'
import { NavLink, useLocation } from "react-router-dom"
import "./navigation.css"

export default function  Navigation ( {onRouteChange, setBackgroundColor, changeModule, setInput, setIsGoogleUser, setIsLoading}) { 
    const location = useLocation();
    const performChangesForFaceDetection = () => {        
        changeModule("face-detection");   
        setIsLoading(false);     
    }

    const performChangesForColorRecognition = () => {        
        changeModule("color-recognition");
        setIsLoading(false);
    }

    const performChangesOnSignOut = () => {
        onRouteChange('signout');
        setInput("");
        setIsGoogleUser(false);
    }
    
    if (location.pathname === "/colorrecognition" || location.pathname === "/facerecognition") {
        console.log(location.pathname)
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end', backgroundColor: '#5E2CA5', alignItems: "flex-end"}}>
                <ul style={{marginRight: 'auto'}}>                    
                    <li><NavLink 
                        to="/colorrecognition" 
                        onClick={performChangesForColorRecognition} 
                        className='colorrecognition f3 link pa2 pointer pa2 b purple bg-gold'
                        // style={({ isActive }) => ({
                        //     color: isActive ? '#7c25cd' : '#ffa500',
                        //     background: isActive ? "#ffa500" : "#7c25cd", 
                        //     marginRight: 0                       
                        //   })}                        
                    >Color Recognition</NavLink></li>
                    <li><NavLink 
                        to="/facerecognition" 
                        onClick={performChangesForFaceDetection}                          
                        className='f3 link pa2 pr4 pointer pa2 b gold bg-purple'                        
                    >Face Recognition</NavLink></li>
                </ul>  
                <NavLink 
                    to="/signin" 
                    onClick={performChangesOnSignOut} 
                    className='f3 link dim pa2 pointer yellow mr4'                    
                >Sign Out</NavLink>
            </nav>
        );
    } else {
        return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>                      
            <NavLink to="/signin" onClick={() => onRouteChange('signin')} className='f3 dim pa2 pointer white'>Sign In</NavLink>
            <NavLink to="/register" onClick={() => onRouteChange('register')} className='f3 dim pa2 pointer white'>Register </NavLink>                         
             </nav>        
        );    
    }} 

