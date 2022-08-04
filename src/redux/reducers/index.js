import { combineReducers } from "redux";
import getYearReducer from "./getYearReducer";
import getNidDetailsReducer from "./getNidDetailsRdeucer";
import loginReducer from "./loginReducer";
import getDocDetailsReducer from "./getDocDetailsReducer";
import changePinReducer from "./changePinReducer";
import forgotPasswordReducer from "./forgotPasswordReducer";
import getRnitDetailsReducer from "./getRnitDetailsReducer";
import cbhiPayamentReducer from "./cbhiPaymentReducer";
import transactionsReducer from "./transactionsReducer";

const allReducers = combineReducers({
    login:loginReducer,
    getYear:getYearReducer,
    getNidDetails: getNidDetailsReducer,
    //ra
    getDocDetails: getDocDetailsReducer,
    changePin: changePinReducer,
    forgotPassword:forgotPasswordReducer,
    getRnitDetails: getRnitDetailsReducer,
    cbhiPayment:cbhiPayamentReducer,
    transactions:transactionsReducer,
});

export default allReducers;