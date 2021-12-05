import React from "react";
import './style.css'

const HeaderText = ({children, fontSize, style}) => {
    return (
       <p style={{fontSize: fontSize, ...style}} className="text" >{children}</p>
    );  
}

export default HeaderText
  