import {all, takeLatest, call, put} from 'redux-saga/effects';
import {projectTypes} from "./project.types";
import {
    createProjectFailure,
    createProjectSuccess,
    deleteProjectFailure,
    deleteProjectSuccess
} from "./project.actions";
import {ProjectItem} from "../../utils/projectCls";

export function* createProjectAsync({payload}) {
    const {projectTitle, projectImg} = payload;
    try {
        const projectItem = new ProjectItem(projectTitle, projectImg);
        yield put(createProjectSuccess(projectItem))
    } catch (error) {
        yield put(createProjectFailure(error.message))
    }
}

export function* deleteProjectStartAsync({payload}) {
    try {
        yield put(deleteProjectSuccess(payload))
    } catch (error) {
        yield put(deleteProjectFailure(error.message))
    }
}


export function* createProjectStart() {
    yield takeLatest(projectTypes.ADD_PROJECT_START, createProjectAsync);
}

export function* deleteProjectStart() {
    yield takeLatest(projectTypes.DELETE_PROJECT_START, deleteProjectStartAsync);
}


export function* projectsSaga() {
    yield all([call(createProjectStart), call(deleteProjectStart)]);
}

