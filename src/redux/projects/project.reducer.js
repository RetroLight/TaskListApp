import {projectTypes} from "./project.types";
import {getLocalStorageData} from "../../utils/localStorage";
import {tasksTypes} from "../tasks/tasks.types";

const localProjects = getLocalStorageData('projectsArr');

const INITIAL_STATE = {
    projectsArr: localProjects ? JSON.parse(localProjects) : [{
        id: 1,
        projectTitle: 'Example',
        projectImg: 'https://media.istockphoto.com/photos/programming-source-code-abstract-background-picture-id1047259374?b=1&k=20&m=1047259374&s=612x612&w=0&h=7TMYTW-rccv_qf_O62FtlghaW8-XlOkMOh_Vh6xlQBg=',
        totalTasksNumber: 0,
        tasksArr: []
    }],
    error: ''
};

const projectReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case projectTypes.ADD_PROJECT_SUCCESS:
            return {
                ...state,
                projectsArr: [...state.projectsArr, action.payload]
            }
        case projectTypes.ADD_PROJECT_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case projectTypes.DELETE_PROJECT_SUCCESS:
            const projectsAfterDelete = state.projectsArr.filter(obj => obj.id !== action.payload);
            return {
                ...state,
                projectsArr: projectsAfterDelete
            }

        case projectTypes.DELETE_PROJECT_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case tasksTypes.ADD_TASK_SUCCESS:
            return {
                ...state,
                projectsArr: state.projectsArr.map(project => {
                    if (project.id === action.payload.projectId) {
                        const updatedProject = state.projectsArr.filter(obj => obj.id === action.payload.projectId);
                        updatedProject[0].tasksArr.push(action.payload)
                        return updatedProject[0]
                    }
                    return project
                })
            }
        case tasksTypes.CHANGE_TASKS_ORDER:
            return {
                ...state,
                projectsArr: state.projectsArr.map(project => {
                    if (project.id === action.payload.projectId) {
                        const updatedProject = state.projectsArr.filter(obj => obj.id === action.payload.projectId)
                        updatedProject[0].tasksArr = action.payload.tasksArr;
                        return updatedProject[0]
                    }
                    return project
                })
            }
        case tasksTypes.DELETE_TASK:
            return {
                ...state,
                projectsArr: state.projectsArr.map(project => {
                    if (project.id === action.payload.projectId) {
                        return {
                            ...project,
                            tasksArr: project.tasksArr.filter(task => task.taskId !== action.payload.taskId)
                        }
                    }
                    return project
                })
            }
        case tasksTypes.START_TASK_TIMER:

        default:
            return state
    }
};

export default projectReducer;
