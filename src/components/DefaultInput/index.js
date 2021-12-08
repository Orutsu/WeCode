import React from 'react';
import './style.css'

const Input = ({placeholder, value, onChange, type, isMultiline, style,  ...restProps}) => {
return (
    <div className="inputContainer" style={style} {...restProps}>
       {isMultiline ? 
            <textarea 
                className="input" 
                placeholder={placeholder} 
                value={value}
                type={type}
                style={{marginTop: 10}}
                onChange={(event) => onChange(event.target.value)}
            /> 
       : 
            <input 
                className="input" 
                placeholder={placeholder} 
                value={value}
                type={type}
                onChange={(event) => onChange(event.target.value)}
            />
        }
    </div>
)
}

export default Input;