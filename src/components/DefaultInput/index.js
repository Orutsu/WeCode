import React from 'react';
import './style.css'

const Input = ({placeholder, value, onChange, style}) => {
return (
    <div className="inputContainer" style={style}>
        <input 
            className="input" 
            placeholder={placeholder} 
            value={value} 
            onChange={(event) => onChange(event.target.value)}
        />
    </div>
)
}

export default Input;