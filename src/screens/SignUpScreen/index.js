import React, {useState} from "react";
import './style.css';
import HeaderText from '../../components/HeaderText'
import DefaultInput from '../../components/DefaultInput'
import DefaultButton from '../../components/DefaultButton'
import {
    Link,
  } from "react-router-dom";
import DefaultText from "../../components/DefaultText"
import { useTypedSelector } from "../../redux/store.ts";
import { signUp, getUsers} from "../../services/UserService";


const SignUpScreen = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isAuth, user } = useTypedSelector((store) => store.auth)
    console.log('isUser', user, isAuth)
    
    return (
        <div className="SignUpContainer">
            <div className="centerBox">
               <HeaderText fontSize={64}>WeCode</HeaderText>
               <DefaultInput value={name} placeholder="Name"  onChange={(text) => setName(text)} style={{marginTop: 19}}/>
               <DefaultInput value={surname} placeholder="Surname"  onChange={(text) => setSurname(text)} style={{marginTop: 16}}/>
               <DefaultInput value={email} placeholder="Email" onChange={(text) => setEmail(text)} style={{marginTop: 16}}/>
               <DefaultInput value={password} placeholder="Password" type="password" onChange={(text) => setPassword(text)} style={{marginTop: 16}}/>
               <DefaultButton border="none"    
                    onClick={() => {signUp(1, name, surname, email, "15.02.2001", password); console.log("Create Account!")}}
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
  