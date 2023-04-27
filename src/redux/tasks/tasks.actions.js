import {tasksTypes} from "./tasks.types";

export const createTaskStart = (projectId, taskTitle, taskDescription, priorityLevel) => ({
    type: tasksTypes.ADD_TASK_START,
    payload: {projectId, taskTitle, taskDescription, priorityLevel}
})
export const createTaskSuccess = (taskObj) => ({
    type: tasksTypes.ADD_TASK_SUCCESS,
    payload: taskObj
})
export const createTaskFailure = (error) => ({
    type: tasksTypes.ADD_TASK_FAILURE,
    error: error
})

export const changeTasksOrder = (tasksArr, projectId) => ({
    type: tasksTypes.CHANGE_TASKS_ORDER,
    payload: {tasksArr, projectId}
})

export const deleteTaskAC = (projectId, taskId) => ({
    type: tasksTypes.DELETE_TASK,
    payload: {projectId, taskId}
})

export const startTaskTimer = (item) => ({
    type: tasksTypes.START_TASK_TIMER,
    payload: item
})
