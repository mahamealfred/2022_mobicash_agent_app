import {
    RNIT_PAYMENT_REQUEST,
    RNIT_PAYMENT_SUCCESS,
    RNIT_PAYMENT_FAILURE,
  } from "../types/rnitPaymentTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case RNIT_PAYMENT_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case RNIT_PAYMENT_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case RNIT_PAYMENT_FAILURE:
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