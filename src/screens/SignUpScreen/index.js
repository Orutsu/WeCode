import React, {useState} from "react";
import './style.css';
import HeaderText from '../../components/HeaderText'
import DefaultInput from '../../components/DefaultInput'
import DefaultButton from '../../components/DefaultButton'
import {
    Link,
    useNavigate
  } from "react-router-dom";
import DefaultText from "../../components/DefaultText"
import { useTypedSelector } from "../../redux/store.ts";
import { signUp, getUsers} from "../../services/UserService";
import {useDispatch} from 'react-redux'
import { setIsAdmin, setIsAuth, setUser } from "../../redux/auth";



const SignUpScreen = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isAuth, user } = useTypedSelector((store) => store.auth)
    const [isErrorMessageVisible, setisErrorMessageVisible] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };


    const onSignUp = async () => {
        if(!validateEmail(email)){
            setisErrorMessageVisible(true);
            return;
        }
        
        try{
            const userInfo = await signUp(1, name, surname, email, password);
            console.log('userInfo', userInfo);
            dispatch(setIsAuth(true))
            dispatch(setUser(userInfo))
            dispatch(setIsAdmin(userInfo.roleId !== 1))
            navigate('/moduleselection', { replace: true })

        }catch(ex)
        {
            dispatch(setIsAuth(false))
            alert('Sign up failed ', ex);
        }
    }
    
    return (
        <div className="SignUpContainer">
            <div className="centerBox">
                <HeaderText fontSize={64}>WeCode</HeaderText>
                <DefaultText fontSize={24} style={{marginTop: 10, color: 'red', height: 30}}>{isErrorMessageVisible ? 'Invalid email field': ''}</DefaultText>
                <DefaultInput value={name} placeholder="Name"  onChange={(text) => setName(text)} style={{marginTop: 19}}/>
                <DefaultInput value={surname} placeholder="Surname"  onChange={(text) => setSurname(text)} style={{marginTop: 16}}/>
                {
                    isErrorMessageVisible
                    ? <DefaultInput value={email} placeholder="Email" onChange={(text) => setEmail(text)} style={{marginTop: 16, border: '2px solid red'}}/>
                    : <DefaultInput value={email} placeholder="Email" onChange={(text) => setEmail(text)} style={{marginTop: 16}}/>
                }
                <DefaultInput value={password} placeholder="Password" type="password" onChange={(text) => setPassword(text)} style={{marginTop: 16}}/>
                <DefaultButton border="none"    
                    onClick={onSignUp}
                    value="Create Account"
                    style={{marginTop: 16}}
                />
                <DefaultText fontSize={24} style={{marginTop: 25}}>
                    <Link style={{color: '#c4c4c4'}} to="/signin">Have an account? Login!</Link>
                </DefaultText>
            </div>
        </div>
    );  
}

export default SignUpScreen
  