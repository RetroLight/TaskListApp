import {combineReducers} from "redux";
import projectReducer from "./projects/project.reducer";

const rootReducer = combineReducers({
    projects: projectReducer
})

export default rootReducer;
