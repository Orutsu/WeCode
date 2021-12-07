import React, {useState} from "react";
import './style.css';
import HeaderText from '../../components/HeaderText'
import DefaultInput from '../../components/DefaultInput'
import DefaultButton from '../../components/DefaultButton'
import {
    Link,
    useNavigate,
  } from "react-router-dom";
import DefaultText from "../../components/DefaultText"
import {useDispatch} from 'react-redux'
import { setIsAuth, setUser } from "../../redux/auth";
import { signIn } from "../../services/UserService";

const SignInScreen = () => {
   const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const onSignIn = async () => {
        try{
            const userInfo = await signIn(email, password);
            dispatch(setIsAuth(true))
            dispatch(setUser(userInfo))
            navigate('/moduleselection', { replace: true })

        }catch(ex)
        {
            dispatch(setIsAuth(false))
            alert('Authentification failed ', ex);
        }
    }

    return (
        <div className="SignInContainer">
            <div className="centerBox">
               <HeaderText fontSize={64} lineHeight={80}>WeCode</HeaderText>
               <DefaultInput value={email} placeholder="Email" onChange={(text) => setEmail(text)} style={{marginTop: 117}}/>
               <DefaultInput value={password} placeholder="Password" type="password" onChange={(text) => setPassword(text)} style={{marginTop: 35}}/>
               <DefaultButton border="none"    
                    onClick={onSignIn}
                    value="Login"
                    style={{marginTop: 35}}
                />
                <DefaultText fontSize={24} style={{marginTop: 25}}>
                    <Link style={{color: '#c4c4c4'}} to="/signup">Don't have an account? Create it!</Link>
                </DefaultText>
            </div>
        </div>
    );  
}

export default SignInScreen
  