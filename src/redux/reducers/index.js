import { combineReducers } from "redux";
import getYearReducer from "./getYearReducer";
import getNidDetailsReducer from "./getNidDetailsReducer";
import loginReducer from "./loginReducer";
import getDocDetailsReducer from "./getDocDetailsReducer";

const allReducers = combineReducers({
    login:loginReducer,
    getYear:getYearReducer,
    getNidDetails: getNidDetailsReducer,

    //rra
    getDocDetails: getDocDetailsReducer,
});

export default allReducers;