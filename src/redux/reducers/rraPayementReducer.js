import {
    RRA_PAYMENT_REQUEST,
    RRA_PAYMENT_SUCCESS,
    RRA_PAYMENT_FAILURE,
  } from "../types/rraPaymentTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case RRA_PAYMENT_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case RRA_PAYMENT_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case RRA_PAYMENT_FAILURE:
        return {
          loading: false,
          details: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;