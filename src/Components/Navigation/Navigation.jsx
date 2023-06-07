import React, { useContext } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import "./navigation.css";
import LoadingContext from '../../store/loading-context';

export default function  Navigation ( {changeModule, setUser, setInput, setModule}) { 
    const ctx = useContext(LoadingContext);
    const location = useLocation();
    const performChangesForFaceDetection = () => {        
        changeModule("face-detection");   
        ctx.setIsLoading(false);     
    }

    const performChangesForColorRecognition = () => {        
        changeModule("color-recognition");
        ctx.setIsLoading(false);
    }

    const performChangesOnSignOut = () => {        
        localStorage.setItem("input", "");
        localStorage.setItem("id", "");
        setInput("")     
        setUser({
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined: ''
        });  
        setModule({
            id: 'color-recognition',
            name: 'colors'
          });             
    }
    
    if (location.pathname === "/colorrecognition" || location.pathname === "/facerecognition") {       
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end', backgroundColor: '#5E2CA5', alignItems: "flex-end"}}>
                <ul style={{marginRight: 'auto'}}>                    
                    <li><NavLink 
                        to="/colorrecognition" 
                        onClick={performChangesForColorRecognition} 
                        className='colorrecognition f3 link pa2 pointer pa2 b purple bg-gold'
                                             
                    >Color Recognition</NavLink></li>
                    <li><NavLink 
                        to="/facerecognition" 
                        onClick={performChangesForFaceDetection}                          
                        className='f3 link pa2 pr4 pointer pa2 b gold bg-purple'                        
                    >Face Recognition</NavLink></li>
                </ul>  
                <NavLink 
                    to="/" 
                    onClick={performChangesOnSignOut} 
                    className='f3 link pa2 pointer yellow mr4'                    
                >Sign Out</NavLink>
            </nav>
        );
    } else {
        return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>                      
            <NavLink to="/" className='f3 pa2 pointer white '>Sign In</NavLink>
            <NavLink to="/register" className='f3 pa2 pointer white'>Register </NavLink>                         
             </nav>        
        );    
    }} 

