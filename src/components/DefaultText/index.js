import React from "react";
import './style.css'

const DefaultText = ({children, fontSize, style, ...restProps}) => {
    return (
       <p style={{fontSize: fontSize, ...style}} className="defaultText" {...restProps}>{children}</p>
    );  
}

export default DefaultText
  