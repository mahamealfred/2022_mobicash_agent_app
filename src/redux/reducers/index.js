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
import balanceReducer from "./getBalanceReducer";
import rraPaymentReducer from "./rraPayementReducer";
import getLtssIdentificationDetailsReducer from "./getLtssIdentificationDetailsReducer";
const allReducers = combineReducers({
    login:loginReducer,
    changePin: changePinReducer,
    forgotPassword:forgotPasswordReducer,

    //all 
    balance:balanceReducer,
    transactions:transactionsReducer,
    getYear:getYearReducer,

    //cbhi
    getNidDetails: getNidDetailsReducer,
    cbhiPayment:cbhiPayamentReducer,

    //rra
    getDocDetails: getDocDetailsReducer,
    rraPayment: rraPaymentReducer,

    //rnit
    getRnitDetails: getRnitDetailsReducer,

    //ltss
    getLtssIndDetails: getLtssIdentificationDetailsReducer,
});

export default allReducers;