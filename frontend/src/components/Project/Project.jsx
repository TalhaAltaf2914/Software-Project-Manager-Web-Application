import React from 'react'

export const Project = ({project}) => {
  return (
    <div id={project._id} className='project'>
        <div className='project-name'>{project.name}</div>
        <div className='project-date'>Created on {project.date}</div>
        {/* <div className='project-creator'>Created by {project.creatorName}</div> */}
    </div>
  )
}
