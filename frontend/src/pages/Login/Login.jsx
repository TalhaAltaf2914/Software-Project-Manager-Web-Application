import React, {useState, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import axios from "axios";

import '../LoginSignupPage.css';

export default function Login () {
    
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const {setUserDetails, setIsLoggedIn} = useContext(UserContext);
    const nav = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault();
        
        axios.post('http://localhost:4000/api/v1/auth/login', {email, password}).then(res=>{
            console.log(`Backend Response: ${res.data.userDetails}`)
            setUserDetails(res.data.userDetails);
            setIsLoggedIn(true);
            // nav('/'); commented for now
            nav('/home')
        })
        
    }
    return (
        <div className='login-signup-page'>
            <h1>SPM</h1>
                
            <form onSubmit={handleSubmit} className='login-signup-form'>
                <h3>Welcome Back!</h3>
                
                <div className='form-section'>
                    <label htmlFor='email' className='form-section-label'>Email</label>
                    <input required id='email' type='email' className='form-section-text-control' placeholder='john123@email.com' 
                    value={email}
                    onChange={(e)=>{console.log(e.target.value); setEmail(e.target.value);}}/>
                </div>
                
                <div className='form-section'>
                    <label htmlFor='password' className='form-section-label'>Password</label>
                    <input required type='password' className='form-section-text-control' placeholder='Password' 
                    value={password}
                    onChange={(e)=>{console.log(e.target.value); setPassword(e.target.value);}}/>
                </div>
                <input className='form-submit-btn' type='submit' value='Login'/>

                <input className='form-submit-btn' type='button' value='Signup' onClick={()=>{nav('/signup')}}/>
            </form>
        </div>
    );
}