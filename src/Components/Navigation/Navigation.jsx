import React from 'react'
import { NavLink, useLocation } from "react-router-dom"
import "./navigation.css"

export default function  Navigation ( {onRouteChange, setBackgroundColor, changeModule}) { 
    const location = useLocation();
    const performChangesForFaceDetection = () => {
        setBackgroundColor("#7c25cd")
        changeModule("face-detection");
    }

    const performChangesForColorRecognition = () => {
        setBackgroundColor("#ffa500")
        changeModule("color-recognition");
    }
    
    if (location.pathname === "/facerecognition" || "/colorrecognition") {
        console.log(location.pathname)
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end', backgroundColor: '#7c25cd', alignItems: "flex-end"}}>
                <ul style={{marginRight: 'auto'}}>                    
                    <li><NavLink 
                        to="/colorrecognition" 
                        onClick={performChangesForColorRecognition} 
                        className='colorrecognition f3 link pa2 pointer pa2 b'
                        // style={({ isActive }) => ({
                        //     color: isActive ? '#7c25cd' : '#ffa500',
                        //     background: isActive ? "#ffa500" : "#7c25cd", 
                        //     marginRight: 0                       
                        //   })}
                        style={{
                            color: "#7c25cd",
                            background: "#ffa500", 
                            marginRight: 0                       
                          }}
                    >Color Recognition</NavLink></li>
                    <li><NavLink 
                        to="/facerecognition" 
                        onClick={performChangesForFaceDetection}                          
                        className='f3 link pa2 pr4 pointer pa2 b'
                        style={{
                            color: '#ffa500',
                            background: "#7c25cd",
                            height: "100%"  
                          }}
                    >Face Recognition</NavLink></li>
                </ul>  
                <NavLink to="/signin" onClick={() => onRouteChange('signout')} className='f3 link dim pa2 pointer yellow'>Sign Out</NavLink>
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

