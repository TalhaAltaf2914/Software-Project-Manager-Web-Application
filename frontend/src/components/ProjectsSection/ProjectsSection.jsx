import React, { useContext, useEffect, useState } from 'react'
import OrganizationContext from '../../context/OrganizationContext'

import './ProjectsSection.css';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import { Project } from '../Project/Project';
import { CreateProject, CreateProjectForm } from '../CreateProjectForm/CreateProjectForm';

export const ProjectsSection = () => {
    let {selectedOrganizationId} = useContext(OrganizationContext);
    
    let {userDetails} = useContext(UserContext);
    
    const [projects, setProjects] = useState([]);
    axios.defaults.headers.common['Authorization'] = `Bearer ${userDetails.accessToken}`

    useEffect(()=>{
        
        
        axios.get("http://localhost:4000/api/v1/projects", {organizationId: selectedOrganizationId}).then(res=>{
            setProjects(res.data.projects);
        }).catch(err=>{
            console.log(err.message);
        });
        
        
    },[projects])

  return (
    <section className='projects-section'>
        {projects.length>0? projects.map(project => <Project project={project} />): <CreateProjectForm setProjects={setProjects}/>}
    </section>
  )
}
