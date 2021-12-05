import React, {useState} from "react";
import './style.css';
import HeaderText from '../../components/HeaderText'
import DefaultInput from '../../components/DefaultInput'
import DefaultButton from '../../components/DefaultButton'

const SignInScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="SignInContainer">
            <div className="centerBox">
               <HeaderText fontSize={64} lineHeight={80}>WeCode</HeaderText>
               <DefaultInput value={email} placeholder="Email" onChange={(text) => setEmail(text)}/>
               <DefaultInput value={password} placeholder="Password" onChange={(text) => setPassword(text)} style={{marginTop: 35}}/>
               <DefaultButton border="none"    
                    onClick={() => console.log("login!")}
                    value="Login"
                    style={{marginTop: 35}}
                />
            </div>
        </div>
    );  
}

export default SignInScreen
  