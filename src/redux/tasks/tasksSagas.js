import {TaskItem} from "../../utils/taskCls";
import {all, call, put, takeLatest} from "redux-saga/effects";
import {tasksTypes} from "./tasks.types";
import {projectTypes} from "../projects/project.types";
import {createTaskSuccess, createTaskFailure} from "./tasks.actions";

export function* createTaskStartAsync({payload}) {
    const {projectId, taskTitle, taskDescription, priorityLevel} = payload;
    try {
        const taskItem = new TaskItem(projectId, taskTitle, taskDescription, priorityLevel);
        yield put(createTaskSuccess(taskItem))
    } catch (error) {
        yield put(createTaskFailure(error.message))
    }
}

export function* createTaskStart() {
    yield takeLatest(tasksTypes.ADD_TASK_START, createTaskStartAsync);
}


export function* tasksSaga() {
    yield all([call(createTaskStart)])
}
