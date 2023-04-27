import {projectTypes} from "./project.types";

export const createProjectStart = (projectTitle, projectImg) => ({
    type: projectTypes.ADD_PROJECT_START,
    payload: {projectTitle, projectImg}
});
export const createProjectSuccess = (project) => ({
    type: projectTypes.ADD_PROJECT_SUCCESS,
    payload: project
});
export const createProjectFailure = (error) => ({
    type: projectTypes.ADD_PROJECT_FAILURE,
    error: error
});


export const deleteProjectStart = (projectId) => ({
    type: projectTypes.DELETE_PROJECT_START,
    payload: projectId
});
export const deleteProjectSuccess = (projectId) => ({
    type: projectTypes.DELETE_PROJECT_SUCCESS,
    payload: projectId
});
export const deleteProjectFailure = (error) => ({
    type: projectTypes.DELETE_PROJECT_FAILURE,
    error: error
});
