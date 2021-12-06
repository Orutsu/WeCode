import React from 'react';
import './style.css'
import ProfileLogo from '../../assets/profileIcon.svg';
import HeaderText from '../HeaderText';
import DefaultText from '../DefaultText';
import {
    Link,
    Navigate,
} from "react-router-dom";

const Header = ({style}) => {
    return (
        <div className="header" style={style}>
            <div style={{display: 'flex' , flexDirection: 'row', paddingLeft: 20, alignItems: 'center'}}>
                <HeaderText fontSize={64}>WeCode</HeaderText>
                <DefaultText 
                    style={{paddingLeft: 40}}
                    fontSize={28}
                >
                   <Link className="headerLink" to="/moduleselection">Module selection</Link>
                </DefaultText>
            </div>
            <Link className="headerLink" to="/usercabinet" style={{paddingRight: 20, alignItems: 'center'}}>          
                <img className="profileLogo" src={ProfileLogo} alt={"Profile logo"}/>
            </Link>
        </div>
    )
}

export default Header;