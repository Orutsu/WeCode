import React from "react";
import './style.css'

const HeaderText = ({children, fontSize, lineHeight}) => {
    return (
       <p style={{fontSize: fontSize}} className="text" >{children}</p>
    );  
}

export default HeaderText
  