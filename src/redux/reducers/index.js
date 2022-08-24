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
import getClientDetailsReducer from "./getClientDetailsReducer";
import rnitPaymentReducer from "./rnitPaymentReducer";
import chashinReducer from "./cashInReducer";
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
    rnitPayment:rnitPaymentReducer,

    //ltss
    getLtssIndDetails: getLtssIdentificationDetailsReducer,

    //client
    getClientDetails:getClientDetailsReducer,
    cashIn:chashinReducer,
});

export default allReducers;