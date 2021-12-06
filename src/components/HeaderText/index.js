import React from "react";
import './style.css'

const HeaderText = ({children, fontSize, style}) => {
    return (
       <p className="headerText" style={{fontSize: fontSize, ...style}} >{children}</p>
    );  
}

export default HeaderText
  