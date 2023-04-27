import React, {useEffect} from "react";
import './mainPage.styles.scss';

import {connect} from "react-redux";
import {useState} from "react";

import {createProjectStart, deleteProjectStart} from "../../redux/projects/project.actions";

import ProjectItem from "../../components/project_item/ProjectItem.component";
import CustomInput from "../../components/input/CustomInput.component";
import CustomButton from "../../components/button/CustomButton.component";
import Popup from "../../components/popup/Popup.component";

import {setLocalStorageData} from "../../utils/localStorage";

const MainPage = ({projects, createProject, deleteProject}) => {
    const [isModalActive, setIsModalActive] = useState(false);
    const [projectTitle, setProjectTitle] = useState('');
    const [projectImg, setProjectImg] = useState('');

    const createProjectHandler = (projectTitle, projectImg) => {
        createProject(projectTitle, projectImg);
        setIsModalActive(false);
        setProjectTitle('');
        setProjectImg('');
    }

    useEffect(() => {
        setLocalStorageData('projectsArr', projects);
    }, [projects])

    return (
        <div className='main_page_container'>
            <h1 className='main_page_heading'>Список проектов</h1>
            <div className="add_project_input_container">
                <div className="button_container">
                    <CustomButton onBtnClick={() => setIsModalActive(true)}>
                        Создать проект
                    </CustomButton>
                </div>
            </div>
            <div className='main_page_projects'>
                {projects.map(item => <ProjectItem
                    key={item.id}
                    projectId={item.id}
                    projectTitle={item.projectTitle}
                    projectImage={item.projectImg}
                    onDeleteProject={deleteProject}
                    tasksArr={item.tasksArr}
                />)}
            </div>
            <Popup isActive={isModalActive} popup_title='Создайте новый проект' setIsActive={setIsModalActive}>
                <div className='popup_input_container'>
                    <CustomInput inputValue={projectTitle} onInput={setProjectTitle} type='text'
                                 placeholder='Название проекта'/>
                </div>
                <div className='popup_input_container'>
                    <CustomInput inputValue={projectImg} onInput={setProjectImg} type='text'
                                 placeholder='Обложка проекта (ссылка)'/>
                </div>
                <div className='popup_button_container'>
                    <CustomButton onBtnClick={() => createProjectHandler(projectTitle, projectImg)}>
                        Создать
                    </CustomButton>
                </div>
            </Popup>
        </div>
    )
};

const mapStateToProps = state => ({
    projects: state.projects.projectsArr,
    isActivePopup: state.projects.isActivePopup
});

const mapDispatchToProps = dispatch => ({
    createProject: (projectTitle, projectImg) => dispatch(createProjectStart(projectTitle, projectImg)),
    deleteProject: projectId => dispatch(deleteProjectStart(projectId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
