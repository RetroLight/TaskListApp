import {call, all} from 'redux-saga/effects';
import {projectsSaga} from "./projects/projectSagas";
import {tasksSaga} from "./tasks/tasksSagas";

export function* rootSaga() {
    yield all([call(projectsSaga), call(tasksSaga)]);
};
