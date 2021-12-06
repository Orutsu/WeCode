import React from "react";
import './style.css'

const HeaderText = ({children, fontSize, style}) => {
    return (
       <p style={{fontSize: fontSize, ...style}} className="headerText" >{children}</p>
    );  
}

export default HeaderText
  