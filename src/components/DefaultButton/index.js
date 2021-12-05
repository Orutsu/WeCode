import React from "react";

const DefaultButton = ({ 
    value,
    children,
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
// color="#AECAE4"
// height = "52px"
// onClick={() => console.log("You clicked on the pink circle!")}
// radius = "8px"
// width = "100%"
// children = "Login"
// style={{marginTop: 35}}

export default DefaultButton;