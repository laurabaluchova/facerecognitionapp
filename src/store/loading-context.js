import React from "react";

const LoadingContext = React.createContext( {
    isLoading: false,
    setIsLoading: () => {},
    cursor: "default", 
    setCursor: () => {}
});

export default LoadingContext;