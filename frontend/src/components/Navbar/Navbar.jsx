import React, {useContext} from "react";
import {useNavigate} from 'react-router-dom';
import UserContext from '../../context/UserContext';

import './Navbar.css';

export default function Navbar(){
    const {userDetails, setIsLoggedIn, setUserDetails} = useContext(UserContext);
    return(
        <nav>
                <h3 className='logo'>SPM</h3>
                
                <input type='button' className='account-btn' value={`${userDetails.firstName} ${userDetails.lastName}`}/>
        </nav>
    );
}