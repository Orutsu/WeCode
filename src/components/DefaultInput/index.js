import React from 'react';
import './style.css'

const Input = ({placeholder, value, onChange, type, style}) => {
return (
    <div className="inputContainer" style={style}>
        <input 
            className="input" 
            placeholder={placeholder} 
            value={value}
            type={type}
            onChange={(event) => onChange(event.target.value)}
        />
    </div>
)
}

export default Input;