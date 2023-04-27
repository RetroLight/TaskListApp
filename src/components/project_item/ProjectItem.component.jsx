import React from 'react';
import './projectItem.styles.scss';

import {Link} from "react-router-dom";

import {ReactComponent as TrashIco} from "../../assets/trash_ico_default.svg";

const ProjectItem = ({projectId, projectTitle, projectImage, onDeleteProject}) => {

    return (
        <div className='project_item_container'>
            <Link to={{pathname: `/project/${projectId}`, state: {projectId: projectId}}}>
                <img src={projectImage} alt="project image" className='project_image'/>
                <div className='project_title'>
                    <h2>{projectTitle}</h2>
                </div>
            </Link>
            <div className='project_footer'>
                <div className='edit_btn_cont'>
                    <span className='edit_icon'/>
                </div>
                <div className='delete_btn_cont' onClick={() => onDeleteProject(projectId)}>
                    <TrashIco className='trash_icon'/>
                </div>
            </div>
        </div>
    )
};

export default ProjectItem;
