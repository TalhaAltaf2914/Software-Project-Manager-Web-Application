import React, { useContext, useState } from 'react'

import './CreateProjectForm.css';
import axios from 'axios';
import OrganizationContext from '../../context/OrganizationContext';

export const CreateProjectForm = ({setProjects}) => {

  const [projectName, setProjectName] = useState('');

  let {selectedOrganizationId} = useContext(OrganizationContext);

  const handleProjectCreation = (e) =>{
    e.preventDefault();

    axios.post("http://localhost:4000/api/v1/projects", {creatorId: userDetails.id, name: projectName, createdDate: new Date().toLocaleDateString(), organizationId: selectedOrganizationId}).then(res=>{
            // console.log(res.data.projectIds);
            // delete userDetails.projectIds;
            // userDetails.projectKeys = res.data.projectIds;
            // setUserDetails({...userDetails});
            // organizationIds = res.data.organizationIds;
            // console.log(`Here=> ${JSON.stringify(userDetails)}`);
            set

        }).catch(err=>{console.log(err)});
  }
  return (
    <form className='create-project-form' onSubmit={handleProjectCreation}>
      <p>You have no projects yet.</p>
      <h2>Create one right now!</h2>
      <div className='form-section'>
        <label htmlFor='name'>Project Name</label>
        <input id='name' type='text' value={projectName} placeholder='Enter Project Name'
        onChange={(e) => setProjectName(e.target.value)} />
      </div>
      
      <input type='submit' value='Create Project' className='project-form-submit-btn'/>
    </form>
  )
}
