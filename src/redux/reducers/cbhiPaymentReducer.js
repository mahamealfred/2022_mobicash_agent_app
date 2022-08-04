import {
    CBHI_PAYMENT_REQUEST,
    CBHI_PAYMENT_SUCCESS,
    CBHI_PAYMENT_FAILURE,
  } from "../types/cbhiPaymentTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case CBHI_PAYMENT_REQUEST:
        return {
          ...state, //spredding
          loading: true,
        };
      case CBHI_PAYMENT_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case CBHI_PAYMENT_FAILURE:
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