import React, {useState, useContext, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Navbar from '../../components/Navbar/Navbar';

import axios from "axios";

import './Home.css';
import { OrganizationAside } from "../../components/OrganizationAside/OrganizationAside";
import OrganizationContext from "../../context/OrganizationContext";
import { ProjectsSection } from "../../components/ProjectsSection/ProjectsSection";

export default function Home () {
    
    const {userDetails, setIsLoggedIn, isLoggedIn} = useContext(UserContext);
    const {organizationIds, projectKeys, isAdminUser} = userDetails;
    console.log(userDetails);

    const [organizations, setOrganizations] = useState([]);
    const [selectedOrganizationId, setSelectedOrganizationId] = useState();
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails.accessToken}`

   

   
    
    // useEffect(() => {
    //     window.onbeforeunload = function() {
    //         setIsLoggedIn(true);

    //         return true;
    //     };

    //     return () => {
    //         setIsLoggedIn(true);
    //         window.onbeforeunload = null;
            
    //     };
    // }, [isLoggedIn]);
     
     return(
        <>
            <Navbar/>
            <main className='home-page'>
                <OrganizationContext.Provider value={{organizations, setOrganizations, selectedOrganizationId, setSelectedOrganizationId}}>
                    <OrganizationAside />
               
                
                    <ProjectsSection />
                </OrganizationContext.Provider>
                
                {/* <p>First Name: {userDetails.firstName}</p>
                <p>Last Name: {userDetails.lastName}</p>
                <p>Email: {userDetails.email}</p>
                <p>AccessToken: {userDetails.accessToken}</p> */}
            </main>
        </>
        
    );
}