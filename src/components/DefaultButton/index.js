import React from "react";
import './style.css'

const DefaultButton = ({ 
    value,
    onClick, 
    style,
  }) => { 
  return (
    <button
      className="button"
      onClick={onClick}
      style={{
         backgroundColor: "#AECAE4",
         borderRadius: '8px',
         border: 'none',
         height: '50px',
         width: '100%',
         fontFamily: 'Roboto',
         fontSize: 24,
         ...style
      }}
    >
    {value}
    </button>
  );
}

export default DefaultButton;